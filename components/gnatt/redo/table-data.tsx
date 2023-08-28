"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { GnattData } from "../schema";

export const data = {
  extraTabs: ["Budget"],
  sections: [
    {
      title: "Strategy",
      dateToFinish: "2023-8-30",
      tasks: [
        {
          title: "Goals",
          status: 0.31,
          done: false,
          dateToFinish: "2023-8-27",
          budget: 423,
        },
        {
          title: "Target Audience",
          status: 0.43,
          done: false,
          dateToFinish: "2023-8-28",
          budget: 642,
        },
        {
          title: "Terms of Service",
          status: 0.09,
          done: false,
          dateToFinish: "2023-8-29",
          budget: 1125,
        },
      ],
    },
    {
      title: "Design",
      dateToFinish: "2023-8-30",
      tasks: [
        {
          title: "UX",
          status: 0.22,
          done: false,
          dateToFinish: "2023-8-27",
          budget: 954,
        },
        {
          title: "UI",
          status: 0.78,
          done: false,
          dateToFinish: "2023-8-28",
          budget: 5431,
        },
        {
          title: "Icons",
          status: 0.3,
          done: false,
          dateToFinish: "2023-8-29",
          budget: 853,
        },
      ],
    },
  ],
};

export const redoData: GnattData = {
  extraTabs: [],
  sections: [
    {
      title: "Strategy",
      startDate: "2023-8-30",
      endDate: "2023-8-30",
      id: "asidn",
      tasks: [
        {
          title: "Goals",
          id: "qndks1",
          status: 0.31,
          done: false,
          budget: 423,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
        {
          title: "Target Audience",
          id: "123bx",
          status: 0.43,
          done: false,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
          budget: 642,
        },
        {
          title: "Terms of Service",
          id: "x23en",
          status: 0.09,
          done: false,
          budget: 1125,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
      ],
    },
    {
      title: "Design",
      id: "aasdn1",
      startDate: "2023-8-30",
      endDate: "2023-8-30",
      tasks: [
        {
          title: "UX",
          id: "x12xx2",
          status: 0.22,
          done: false,
          budget: 954,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
        {
          title: "UI",
          id: "123nx",
          status: 0.78,
          done: false,
          budget: 5431,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
        {
          title: "Icons",
          id: "213j4n",
          status: 0.3,
          done: false,
          budget: 853,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
      ],
    },
    {
      title: "Software Development",
      id: "123n89d",
      startDate: "2023-8-30",
      endDate: "2023-9-30",
      tasks: [
        {
          title: "NextJS Installation",
          id: "nj1e3j",
          status: 1,
          done: false,
          budget: 0,
          startDate: "2023-8-30",
          endDate: "2023-8-30",
        },
        {
          title: "Create helper functions",
          id: "123njk",
          status: 0.82,
          done: false,
          budget: 120,
          startDate: "2023-8-31",
          endDate: "2023-9-1",
        },
        {
          title: "Deploy",
          id: "324nkjs",
          status: 0,
          done: false,
          budget: 20,
          startDate: "2023-8-30",
          endDate: "2023-9-28",
        },
      ],
    },
  ],
};

export const columns: ColumnDef<GnattTableSection>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "dateToFinish",
    header: "Duration",
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

export type GnattTableData = {
  extraTabs: string[];
  sections: GnattTableSection[];
};

export type GnattTableSection = {
  title: string;
  dateToFinish: string;
  tasks: GnattTableTask[];
};

export type GnattTableTask = {
  title: string;
  status: number;
  done: boolean;
  dateToFinish: string;
  budget: number;
};
