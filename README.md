# Iterator Pattern Demo

A TypeScript implementation of the Iterator design pattern using Rome tourism as a practical example.

## Overview

This console application demonstrates how the Iterator pattern allows different ways to traverse the same data collection. Users can explore Rome's attractions using three different strategies:

- **Random Walk**: Random order traversal
- **Phone App**: Popular attractions first
- **Local Guide**: Sequential with insider tips

## Project Structure

```

├── src/                        # Source code
│   ├── models/
│   │   └── place.ts            # Defines the "Place" data model (Rome attractions)
│   │
│   ├── interfaces/
│   │   └── guide.ts            # Iterator interface (defines traversal contract)
│   │
│   ├── iterators/
│   │   ├── randomWalk.ts       # Iterator: traverse places in random order
│   │   ├── phoneApp.ts         # Iterator: traverse based on popularity (like apps)
│   │   └── localGuide.ts       # Iterator: sequential traversal with extra info
│   │
│   ├── collections/
│   │   └── rome.ts             # Collection of places + iterator factory methods
│   │
│   ├── clients/
│   │   └── tourist.ts          # Client that uses iterators to explore Rome
│   │
│   ├── controllers/
│   │   └── interactiveDemo.ts  # Console controller for interactive demo
│   │
│   └── index.ts                # Application entry point
│
├── README.md                   # Project documentation
├── package.json                # Project metadata & dependencies
└── tsconfig.json               # TypeScript configuration

```

## Installation

```bash
npm install
npm start
```

## Code Example

```typescript
// Create collection and client
const rome = new Rome();
const tourist = new Tourist("Alice");

// Different iterators for same data
const randomGuide = rome.randomWalk();
const phoneGuide = rome.phoneApp();
const localGuide = rome.localGuide();

// Same interface, different behavior
tourist.visit(randomGuide, 3);
tourist.visit(phoneGuide, 3);
tourist.visit(localGuide, 3);
```

**Output Example:**

```
Alice starting tour...
🚶 Randomly found: Pantheon
  ✅ Visited: Pantheon (ancient)
🚶 Randomly found: Trevi Fountain
  ✅ Visited: Trevi Fountain (fountain)
🚶 Randomly found: Vatican
  ✅ Visited: Vatican (religious)
Alice tour finished! Saw 3 places.

Alice starting tour...
📱 App suggests: Colosseum (popular destination)
  ✅ Visited: Colosseum (ancient)
📱 App suggests: Vatican (popular destination)
  ✅ Visited: Vatican (religious)
📱 App suggests: Trevi Fountain (popular destination)
  ✅ Visited: Trevi Fountain (fountain)
Alice tour finished! Saw 3 places.

Alice starting tour...
🎭 Guide says: Visit Colosseum - Visit early morning to avoid crowds!
  ✅ Visited: Colosseum (ancient)
🎭 Guide says: Visit Vatican - The secret passage connects to Castel Sant'Angelo
  ✅ Visited: Vatican (religious)
🎭 Guide says: Visit Trevi Fountain - Throw coin with right hand over left shoulder
  ✅ Visited: Trevi Fountain (fountain)
Alice tour finished! Saw 3 places.
```

## Core Implementation

**Iterator Interface:**

```typescript
export interface Guide {
  next(): Place | null; // Get next item
  hasNext(): boolean; // Check if more items exist
}
```

**Concrete Iterator Example:**

```typescript
export class RandomWalk implements Guide {
  private places: Place[];
  private visited: number = 0;
  private order: number[];

  constructor(places: Place[]) {
    this.places = places;
    this.order = this.shuffleOrder(); // Randomize traversal order
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
```

**Collection with Factory Methods:**

```typescript
export class Rome {
  private places: Place[] = [
    new Place("Colosseum", "ancient"),
    new Place("Vatican", "religious"),
    // ...
  ];

  randomWalk(): Guide {
    return new RandomWalk(this.places);
  }
  phoneApp(): Guide {
    return new PhoneApp(this.places);
  }
  localGuide(): Guide {
    return new LocalGuide(this.places);
  }
}
```

## Interactive Demo Output

```
🏛️ Welcome to Rome! Let's explore the city together!
==================================================

🗺️ Places you can visit in Rome:
   1. Colosseum (ancient)
   2. Vatican (religious)
   3. Trevi Fountain (fountain)
   4. Pantheon (ancient)
   5. Spanish Steps (stairs)

🚶 How would you like to explore Rome today?
1. 🎲 Random Walk (get lost and discover accidentally)
2. 📱 Use Phone App (efficient, popular places first)
3. 🎭 Hire Local Guide (insider knowledge & secrets)
4. 📊 Compare all three methods
5. ❌ Exit

Enter your choice (1-5): 1
How many places would you like to visit? (1-5): 3

🎲 Starting random walk...
----------------------------------------

🚶 Randomly found: Spanish Steps
✅ Now visiting: Spanish Steps
   Type: stairs
   Press Enter to continue to next place...

🚶 Randomly found: Colosseum
✅ Now visiting: Colosseum
   Type: ancient
   Press Enter to continue to next place...

🚶 Randomly found: Pantheon
✅ Now visiting: Pantheon
   Type: ancient

🎉 Tour complete! You visited 3 amazing places in Rome.
```

## Pattern Comparison

**Same Data, Different Experiences:**

| Iterator Type | Traversal Order      | Output Style                                     | Use Case               |
| ------------- | -------------------- | ------------------------------------------------ | ---------------------- |
| RandomWalk    | Shuffled randomly    | `🚶 Randomly found: {place}`                     | Exploration, discovery |
| PhoneApp      | Popular places first | `📱 App suggests: {place} (popular destination)` | Efficiency, tourism    |
| LocalGuide    | Sequential with tips | `🎭 Guide says: Visit {place} - {insider tip}`   | Learning, culture      |

**Why This Demonstrates Iterator Pattern:**

- **Same Interface**: All guides implement `next()` and `hasNext()`
- **Different Behavior**: Each iterator has unique traversal logic
- **Client Independence**: Tourist class works with any guide type
- **Encapsulation**: Internal data structure of Rome is hidden

## Development

```bash
npm run build    # Compile TypeScript
npm run dev      # Build and run

```

## Requirements

- Node.js 14+
- TypeScript 5+

## Built By

Ms Hamsini S
