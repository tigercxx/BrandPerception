import { atom } from "jotai";
import { Polarities } from "../types/types";

const defaultPolarities: Polarities = {
    count: 0,
    positive: 0,
    negative: 0,
    neutral: 0,
};

export const polaritiesAtom = atom<Polarities>(defaultPolarities);
