import { Place } from "./Place";

export interface Guide {
  next(): Place | null;
  hasNext(): boolean;
}
