// import { GnattTable } from "@/components/gnatt/table/table";
import GnattChart from "@/components/gnatt/redo/chart";
import GnattTable from "@/components/gnatt/redo/table";
import { columns, data } from "@/components/gnatt/redo/table-data";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-h-screen">
      <main className="px-12 py-8 h-full">
        <h1 className="text-4xl font-semibold">Gnatt Chart</h1>
        {/* <GnattTable columns={columns} /> */}
        <div className="flex w-full border mt-6">
          <GnattTable />
          <div className="border" />
          <GnattChart />
        </div>
      </main>
    </div>
  );
}
