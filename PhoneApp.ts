import { Guide } from "./Guide";
import { Place } from "./Place";

export class PhoneApp implements Guide {
  private places: Place[];
  private visited: number = 0;
  private sortedPlaces: Place[];

  constructor(places: Place[]) {
    this.places = places;
    this.sortedPlaces = this.sortByPopularity();
  }

  private sortByPopularity(): Place[] {
    return [...this.places].sort((a, b) => {
      // Phone app prioritizes most famous places first
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
    if (!this.hasNext()) return null;

    const place = this.sortedPlaces[this.visited];
    this.visited++;
    console.log(`📱 App suggests: ${place.name} (popular destination)`);
    return place;
  }

  hasNext(): boolean {
    return this.visited < this.sortedPlaces.length;
  }
}
