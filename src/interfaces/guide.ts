// File: src/interfaces/guide.ts
import { Place } from "../models/place";

export interface Guide {
  next(): Place | null;
  hasNext(): boolean;
}
