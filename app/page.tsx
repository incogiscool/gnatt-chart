// import { GnattTable } from "@/components/gnatt/table/table";
import GnattTable from "@/components/gnatt/redo/table";
import { columns, data } from "@/components/gnatt/redo/table-data";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-12 py-4">
      <h1 className="text-4xl font-semibold">Gnatt Chart</h1>
      <div className="flex">
        {/* <GnattTable columns={columns} /> */}
        <GnattTable />
        <div id="chart"></div>
      </div>
    </main>
  );
}
