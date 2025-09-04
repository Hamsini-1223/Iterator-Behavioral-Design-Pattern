// File: src/iterators/randomWalk.ts
import { Guide } from "../interfaces/guide";
import { Place } from "../models/place";

export class RandomWalk implements Guide {
  private places: Place[];
  private visited: number = 0;
  private order: number[];

  constructor(places: Place[]) {
    try {
      if (!places || places.length === 0) {
        throw new Error("Places array cannot be empty");
      }
      this.places = places;
      this.order = this.shuffleOrder();
    } catch (error) {
      console.error("Error initializing RandomWalk:", error);
      throw error;
    }
  }

  private shuffleOrder(): number[] {
    const order = [];
    for (let i = 0; i < this.places.length; i++) {
      order.push(i);
    }

    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    return order;
  }

  next(): Place | null {
    try {
      if (!this.hasNext()) return null;

      const place = this.places[this.order[this.visited]];
      this.visited++;
      console.log(`🚶 Randomly found: ${place.name}`);
      return place;
    } catch (error) {
      console.error("Error getting next place:", error);
      return null;
    }
  }

  hasNext(): boolean {
    return this.visited < this.places.length;
  }
}
