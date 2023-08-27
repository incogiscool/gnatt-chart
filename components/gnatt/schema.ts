//Stored on DB
export type GnattData = {
  extraTabs: string[];
  sections: GnattSection[];
};

export type GnattSection = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  tasks: GnattTask[];
};

export type GnattTask = {
  id: string;
  title: string;
  done: boolean;
  startDate: string;
  endDate: string;
  budget: number;
  status: number;
};

//Local State
export type LocalGnattData = {
  extraTabs: string[];
  sections: LocalGnattSection[];
};

export type LocalGnattSection = GnattSection & {
  expanded: boolean;
};

// export type LocalGnattTask = GnattSection & {
//   expanded: boolean;
// };
