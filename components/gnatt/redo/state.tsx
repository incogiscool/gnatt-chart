import { create } from "zustand";
import { GnattData, LocalGnattData } from "../schema";
import { data, redoData } from "./table-data";
import { processData } from "./utils";

interface GnattState {
  data: LocalGnattData | null;
  setData: (data: LocalGnattData) => void;
}

export const useGnattData = create<GnattState>()((set) => ({
  data: processData(redoData),
  setData: (data: LocalGnattData) => set({ data }),
}));
