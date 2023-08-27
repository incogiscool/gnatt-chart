import { GnattData, LocalGnattData } from "../schema";

export function calculateDaysFromNow(dateString: string): number {
  const currentDate = new Date();
  const targetDate = new Date(dateString);

  // Calculate the time difference in milliseconds
  const timeDifference = targetDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}

export function processData(gnattData: GnattData): LocalGnattData {
  let original = gnattData;

  gnattData.sections.forEach((section, index) => {
    //@ts-expect-error -- Typescript doesn't allow dynamic object changes
    original.sections[index].expanded = false;
  });

  return original as LocalGnattData;
}

export function parseDaysFromNow(days: number) {
  let daysFromNow = days;

  let suffix = "days";

  if (daysFromNow < 0) {
    daysFromNow *= -1;
    suffix = "days ago";
  }
  return `${daysFromNow} ${suffix}`;
}
