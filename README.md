# Rome Tourism Iterator Pattern

A TypeScript implementation of the Iterator behavioral design pattern using Rome tourism as a practical example.

## Overview

This project demonstrates the Iterator pattern through an interactive console application where users can explore Rome's attractions using different traversal strategies. The same collection of places can be experienced in three distinct ways:

- **Random Walk**: Visits places in random order
- **Phone App**: Visits popular attractions first
- **Local Guide**: Provides insider knowledge and tips

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- TypeScript (v4 or higher)

### Installation

```bash
git clone https://github.com/yourusername/rome-iterator-pattern.git
cd rome-iterator-pattern
npm install
```

### Running the Application

```bash
npm start
```

## Usage

The application presents an interactive menu:

```
Welcome to Rome! Let's explore the city together!

Places you can visit in Rome:
   1. Colosseum (ancient)
   2. Vatican (religious)
   3. Trevi Fountain (fountain)
   4. Pantheon (ancient)
   5. Spanish Steps (stairs)

How would you like to explore Rome today?
1. Random Walk (get lost and discover accidentally)
2. Use Phone App (efficient, popular places first)
3. Hire Local Guide (insider knowledge & secrets)
4. Compare all three methods
5. Exit
```

Each option demonstrates different iterator behavior with the same underlying data collection.

## Project Structure

```
├── Place.ts              # Data model representing Rome attractions
├── Guide.ts              # Iterator interface defining traversal contract
├── Rome.ts               # Collection class containing places and iterator factories
├── RandomWalk.ts         # Random order traversal implementation
├── PhoneApp.ts           # Popularity-based traversal implementation
├── LocalGuide.ts         # Sequential traversal with additional information
├── Tourist.ts            # Client class that uses iterators
├── InteractiveDemo.ts    # Console interface controller
├── index.ts              # Application entry point
└── package.json          # Project dependencies and scripts
```

## Iterator Pattern Implementation

### Core Components

**Iterator Interface (Guide)**

```typescript
interface Guide {
  next(): Place | null;
  hasNext(): boolean;
}
```

**Collection (Rome)**

- Contains the data (places)
- Provides factory methods to create different iterator types
- Encapsulates internal data structure

**Concrete Iterators**

- `RandomWalk`: Implements random traversal
- `PhoneApp`: Implements popularity-based traversal
- `LocalGuide`: Implements sequential traversal with additional context

**Client (Tourist)**

- Uses iterator interface without knowing concrete implementation
- Same code works with any iterator type

### Benefits Demonstrated

1. **Separation of Concerns**: Traversal logic is separated from data storage
2. **Multiple Strategies**: Same collection can be traversed in different ways
3. **Client Independence**: Client code works with any iterator implementation
4. **Easy Extension**: New iterator types can be added without modifying existing code
5. **Concurrent Iteration**: Multiple iterators can operate on the same collection simultaneously

## Example Usage

```typescript
const rome = new Rome();
const tourist = new Tourist("Alice");

// Create different iterators for the same collection
const randomGuide = rome.randomWalk();
const phoneGuide = rome.phoneApp();
const localGuide = rome.localGuide();

// Tourist can use any guide without knowing the implementation
tourist.visit(randomGuide, 3);
tourist.visit(phoneGuide, 3);
tourist.visit(localGuide, 3);
```

## Development

### Build

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Manual Compilation

```bash
tsc *.ts
node index.js
```

## Extending the Project

To add a new iterator type:

1. Create a class implementing the `Guide` interface
2. Add factory method to `Rome` class
3. Update `InteractiveDemo` menu system

Example:

```typescript
export class HistoricalGuide implements Guide {
  next(): Place | null {
    // Implementation for historical sites focus
  }

  hasNext(): boolean {
    // Implementation
  }
}
```

## Design Pattern Context

The Iterator pattern is useful when:

- You need to traverse a collection without exposing its internal structure
- You want to support multiple traversal algorithms for the same collection
- You need to provide a uniform interface for traversing different collection types
- You want to support concurrent iterations over the same collection

## Built By

Ms Hamsini S

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Please ensure your code follows the existing style and includes appropriate documentation.
