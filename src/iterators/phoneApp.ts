// File: src/iterators/phoneApp.ts
import { Guide } from "../interfaces/guide";
import { Place } from "../models/place";

export class PhoneApp implements Guide {
  private places: Place[];
  private visited: number = 0;
  private sortedPlaces: Place[];

  constructor(places: Place[]) {
    try {
      if (!places || places.length === 0) {
        throw new Error("Places array cannot be empty");
      }
      this.places = places;
      this.sortedPlaces = this.sortByPopularity();
    } catch (error) {
      console.error("Error initializing PhoneApp:", error);
      throw error;
    }
  }

  private sortByPopularity(): Place[] {
    return [...this.places].sort((a, b) => {
      if (a.name === "Colosseum") return -1;
      if (b.name === "Colosseum") return 1;
      if (a.name === "Vatican") return -1;
      if (b.name === "Vatican") return 1;
      if (a.name === "Trevi Fountain") return -1;
      if (b.name === "Trevi Fountain") return 1;
      return 0;
    });
  }

  next(): Place | null {
    try {
      if (!this.hasNext()) return null;

      const place = this.sortedPlaces[this.visited];
      this.visited++;
      console.log(`📱 App suggests: ${place.name} (popular destination)`);
      return place;
    } catch (error) {
      console.error("Error getting next place:", error);
      return null;
    }
  }

  hasNext(): boolean {
    return this.visited < this.sortedPlaces.length;
  }
}
