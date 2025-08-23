import { Guide } from "./Guide";
import { Place } from "./Place";

export class RandomWalk implements Guide {
  private places: Place[];
  private visited: number = 0;
  private order: number[];

  constructor(places: Place[]) {
    this.places = places;
    this.order = this.shuffleOrder();
  }

  private shuffleOrder(): number[] {
    const order = [];
    for (let i = 0; i < this.places.length; i++) {
      order.push(i);
    }

    // Simple shuffle algorithm
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
  }

  next(): Place | null {
    if (!this.hasNext()) return null;

    const place = this.places[this.order[this.visited]];
    this.visited++;
    console.log(`🚶 Randomly found: ${place.name}`);
    return place;
  }

  hasNext(): boolean {
    return this.visited < this.places.length;
  }
}
