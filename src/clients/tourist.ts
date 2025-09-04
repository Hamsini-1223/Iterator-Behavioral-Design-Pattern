// File: src/clients/tourist.ts
import { Guide } from "../interfaces/guide";

export class Tourist {
  constructor(private name: string) {
    if (!name || name.trim() === "") {
      throw new Error("Tourist name cannot be empty");
    }
  }

  visit(guide: Guide, maxPlaces: number = 3): void {
    try {
      if (!guide) {
        throw new Error("Guide cannot be null");
      }
      if (maxPlaces <= 0) {
        throw new Error("Maximum places must be positive");
      }

      console.log(`${this.name} starting tour...`);
      let count = 0;

      while (guide.hasNext() && count < maxPlaces) {
        const place = guide.next();
        if (place) {
          console.log(`  ✅ Visited: ${place.name} (${place.type})`);
          count++;
        }
      }
      console.log(`${this.name} tour finished! Saw ${count} places.\n`);
    } catch (error) {
      console.error("Error during tourist visit:", error);
    }
  }

  getName(): string {
    return this.name;
  }
}
