import { Guide } from "./Guide";

export class Tourist {
  constructor(private name: string) {}

  visit(guide: Guide, maxPlaces: number = 3): void {
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
  }

  getName(): string {
    return this.name;
  }
}
