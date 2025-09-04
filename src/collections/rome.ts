// File: src/collections/rome.ts
import { Place } from "../models/place";
import { Guide } from "../interfaces/guide";
import { RandomWalk } from "../iterators/randomWalk";
import { PhoneApp } from "../iterators/phoneApp";
import { LocalGuide } from "../iterators/localGuide";

export class Rome {
  private places: Place[] = [
    new Place("Colosseum", "ancient"),
    new Place("Vatican", "religious"),
    new Place("Trevi Fountain", "fountain"),
    new Place("Pantheon", "ancient"),
    new Place("Spanish Steps", "stairs"),
  ];

  randomWalk(): Guide {
    try {
      return new RandomWalk(this.places);
    } catch (error) {
      console.error("Error creating RandomWalk guide:", error);
      throw error;
    }
  }

  phoneApp(): Guide {
    try {
      return new PhoneApp(this.places);
    } catch (error) {
      console.error("Error creating PhoneApp guide:", error);
      throw error;
    }
  }

  localGuide(): Guide {
    try {
      return new LocalGuide(this.places);
    } catch (error) {
      console.error("Error creating LocalGuide guide:", error);
      throw error;
    }
  }

  getAllPlaces(): Place[] {
    return [...this.places];
  }
}
