"use client";
import { useGnattData } from "./state";

const GnattChart = () => {
  const { data, setData } = useGnattData();

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-xl font-medium">Chart</h2>
      <div className=" grid-cols-12 grid grid-rows-4 border">asd</div>
    </div>
  );
};

export default GnattChart;
