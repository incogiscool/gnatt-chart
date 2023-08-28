"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGnattData } from "./state";
import { GnattSection, LocalGnattSection } from "../schema";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { calculateDaysFromNow, parseDaysFromNow } from "./utils";

export const columns: ColumnDef<LocalGnattSection>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    // accessorKey: "endDate",
    header: "Duration",
    id: "duration",
    cell: ({ row }) => {
      let daysFromNow = calculateDaysFromNow(row.original.endDate);
      return parseDaysFromNow(daysFromNow);
    },
  },
  {
    id: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const section = row.original;

      const budget = section.tasks.reduce((accumulator, task) => {
        return accumulator + task.budget;
      }, 0);

      return `$${budget}`;
    },
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const section = row.original;

      const percentageDone = section.tasks.reduce((accumulator, task) => {
        return accumulator + task.status / section.tasks.length;
      }, 0);

      const roundedPercentage = Math.round(percentageDone * 100);

      return (
        <div className="flex items-center gap-2">
          <p>{roundedPercentage}%</p>
          <span className="w-[20px] h-[20px]">
            <CircularProgressbar
              value={roundedPercentage}
              strokeWidth={12}
              styles={buildStyles({
                pathColor: "#00a6fb",
              })}
            />
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const section = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText("test copy")}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const GnattTable = () => {
  const { data, setData } = useGnattData();

  function toggleExpandSection(index: number) {
    const section = data?.sections[index];

    if (!section) return;

    let updatedSections = data?.sections;
    updatedSections[index] = {
      ...section,
      expanded: !section?.expanded,
    };

    setData({
      ...data,
      sections: updatedSections,
    });
  }

  const table = useReactTable({
    data: data!.sections,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-h-full overflow-y-auto overflow-x-auto w-[750px]">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <>
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => toggleExpandSection(index)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>

                {data!.sections[index].expanded ? (
                  <>
                    {data!.sections[index].tasks.map((task) => (
                      <TableRow
                        className="bg-slate-100 hover:bg-slate-200"
                        key={task.id}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="flex justify-center items-center">
                              <Checkbox />
                            </span>
                            <span>{task.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {parseDaysFromNow(calculateDaysFromNow(task.endDate))}
                        </TableCell>
                        <TableCell>${task.budget}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <p>{task.status * 100}%</p>
                            <span className="w-[20px] h-[20px]">
                              <CircularProgressbar
                                value={task.status * 100}
                                strokeWidth={12}
                                styles={buildStyles({
                                  pathColor: "#8a8a8a",
                                })}
                              />
                            </span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  navigator.clipboard.writeText("test copy")
                                }
                              >
                                Copy payment ID
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View customer</DropdownMenuItem>
                              <DropdownMenuItem>
                                View payment details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GnattTable;
