import { Place } from "./Place";
import { Guide } from "./Guide";
import { RandomWalk } from "./RandomWalk";
import { PhoneApp } from "./PhoneApp";
import { LocalGuide } from "./LocalGuide";

export class Rome {
  private places: Place[] = [
    new Place("Colosseum", "ancient"),
    new Place("Vatican", "religious"),
    new Place("Trevi Fountain", "fountain"),
    new Place("Pantheon", "ancient"),
    new Place("Spanish Steps", "stairs"),
  ];

  // Different ways to explore Rome
  randomWalk(): Guide {
    return new RandomWalk(this.places);
  }

  phoneApp(): Guide {
    return new PhoneApp(this.places);
  }

  localGuide(): Guide {
    return new LocalGuide(this.places);
  }

  getAllPlaces(): Place[] {
    return [...this.places]; // Return copy to protect original
  }
}
