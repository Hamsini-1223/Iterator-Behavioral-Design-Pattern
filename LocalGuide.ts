import { Guide } from "./Guide";
import { Place } from "./Place";

export class LocalGuide implements Guide {
  private places: Place[];
  private visited: number = 0;
  private secrets: { [key: string]: string } = {
    Colosseum: "Visit early morning to avoid crowds!",
    Vatican: "The secret passage connects to Castel Sant'Angelo",
    "Trevi Fountain": "Throw coin with right hand over left shoulder",
    Pantheon: "The hole in the roof is exactly 9 meters wide",
    "Spanish Steps": "Best gelato shop is hidden nearby",
  };

  constructor(places: Place[]) {
    this.places = places;
  }

  next(): Place | null {
    if (!this.hasNext()) return null;

    const place = this.places[this.visited];
    const secret = this.secrets[place.name] || "Amazing place!";
    this.visited++;
    console.log(`🎭 Guide says: Visit ${place.name} - ${secret}`);
    return place;
  }

  hasNext(): boolean {
    return this.visited < this.places.length;
  }
}
