"use client";
import { useGnattData } from "./state";

const GnattChart = () => {
  const { data, setData } = useGnattData();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getDaysOfMonth = (year: number, month: number) => {
    const totalDays = daysInMonth(year, month);
    const daysArray = [];

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  };

  const rows = 1;
  const columns = 30;

  return (
    <div className="w-full h-full">
      <div
        style={{
          gridTemplateColumns: "repeat(30, minmax(0, 1fr))",
        }}
        className={`grid  grid-rows-${rows}`}
      >
        {Array.from({ length: rows * columns }).map((_, index) => (
          <div key={index} className="h-[49px] py-4 text-sm text-center border">
            {index}
          </div>
        ))}
      </div>

      {/* <div className="flex w-fit gap-2">
        {daysOfMonth.map((day) => {
          return <div className="p-1">{day.getDate()}</div>;
        })}
      </div> */}
      {/* <div className=" grid-cols-12 grid grid-rows-4 border mt-1"></div> */}
    </div>
  );
};

export default GnattChart;
