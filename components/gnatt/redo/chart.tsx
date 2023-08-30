"use client";
import { LocalGnattSection } from "../schema";
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

  const days = getDaysOfMonth(currentYear, currentMonth);

  const rows = 1;
  const columns = days.length;

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

  return (
    <div className="w-full h-full">
      <div
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className={`grid  grid-rows-${rows}`}
      >
        {Array.from({ length: rows * columns }).map((_, index) => (
          <div key={index} className="h-[49px] py-4 text-sm text-center border">
            {index + 1}
          </div>
        ))}
      </div>
      {data?.sections.map((section, index) => {
        return (
          <div key={section.id} className="w-full">
            <div
              className="min-h-[50px] border"
              onClick={() => toggleExpandSection(index)}
            >
              <p>{section.title}</p>
            </div>
            <div className="bg-slate-200">
              {section.expanded && (
                <div>
                  {section.tasks.map((task) => {
                    return (
                      <div className="h-[50px] w-full border">{task.title}</div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}

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
