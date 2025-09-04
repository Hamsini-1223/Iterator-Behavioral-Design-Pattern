// File: src/controllers/interactiveDemo.ts
import * as readline from "readline";
import { Rome } from "../collections/rome";
import { Tourist } from "../clients/tourist";
import { Guide } from "../interfaces/guide";

export class InteractiveDemo {
  private rl: readline.Interface;
  private rome: Rome;
  private tourist: Tourist;

  constructor() {
    try {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      this.rome = new Rome();
      this.tourist = new Tourist("You");
    } catch (error) {
      console.error("Error initializing InteractiveDemo:", error);
      throw error;
    }
  }

  async start(): Promise<void> {
    try {
      console.log("🏛️ Welcome to Rome! Let's explore the city together!");
      console.log("=".repeat(50));

      this.showAvailablePlaces();
      await this.mainMenu();
    } catch (error) {
      console.error("Error starting demo:", error);
      this.rl.close();
    }
  }

  private showAvailablePlaces(): void {
    try {
      console.log("\n🗺️ Places you can visit in Rome:");
      this.rome.getAllPlaces().forEach((place, index) => {
        console.log(`   ${index + 1}. ${place.name} (${place.type})`);
      });
      console.log();
    } catch (error) {
      console.error("Error showing places:", error);
    }
  }

  private async mainMenu(): Promise<void> {
    while (true) {
      try {
        console.log("🚶 How would you like to explore Rome today?");
        console.log("1. 🎲 Random Walk (get lost and discover accidentally)");
        console.log("2. 📱 Use Phone App (efficient, popular places first)");
        console.log("3. 🎭 Hire Local Guide (insider knowledge & secrets)");
        console.log("4. 📊 Compare all three methods");
        console.log("5. ❌ Exit");

        const choice = await this.askQuestion("\nEnter your choice (1-5): ");

        switch (choice.trim()) {
          case "1":
            await this.exploreWith("random");
            break;
          case "2":
            await this.exploreWith("phone");
            break;
          case "3":
            await this.exploreWith("guide");
            break;
          case "4":
            await this.compareAllMethods();
            break;
          case "5":
            console.log("\n👋 Arrivederci! Thanks for visiting Rome!");
            this.rl.close();
            return;
          default:
            console.log("❌ Invalid choice. Please try again.\n");
        }
      } catch (error) {
        console.error("Error in main menu:", error);
        console.log("An error occurred. Please try again.\n");
      }
    }
  }

  private async exploreWith(type: "random" | "phone" | "guide"): Promise<void> {
    try {
      const maxPlaces = await this.askForNumberOfPlaces();

      let guide: Guide;
      let description: string;

      switch (type) {
        case "random":
          guide = this.rome.randomWalk();
          description = "🎲 Starting random walk...";
          break;
        case "phone":
          guide = this.rome.phoneApp();
          description = "📱 Opening tourist app...";
          break;
        case "guide":
          guide = this.rome.localGuide();
          description = "🎭 Meeting your local guide...";
          break;
      }

      console.log(`\n${description}`);
      console.log("-".repeat(40));

      await this.simulateVisit(guide, maxPlaces);
      await this.continueOrReturn();
    } catch (error) {
      console.error("Error during exploration:", error);
      console.log(
        "An error occurred during exploration. Returning to main menu.\n"
      );
    }
  }

  private async askForNumberOfPlaces(): Promise<number> {
    while (true) {
      try {
        const answer = await this.askQuestion(
          "How many places would you like to visit? (1-5): "
        );
        const num = parseInt(answer.trim());

        if (isNaN(num)) {
          console.log("❌ Please enter a valid number.");
          continue;
        }

        if (num >= 1 && num <= 5) {
          return num;
        }
        console.log("❌ Please enter a number between 1 and 5.");
      } catch (error) {
        console.error("Error getting number of places:", error);
        console.log("❌ Invalid input. Please try again.");
      }
    }
  }

  private async simulateVisit(guide: Guide, maxPlaces: number): Promise<void> {
    try {
      if (!guide) {
        throw new Error("Guide is required");
      }

      let count = 0;

      while (guide.hasNext() && count < maxPlaces) {
        const place = guide.next();
        if (place) {
          console.log(`\n✅ Now visiting: ${place.name}`);
          console.log(`   Type: ${place.type}`);
          count++;

          if (count < maxPlaces && guide.hasNext()) {
            await this.askQuestion(
              "   Press Enter to continue to next place..."
            );
          }
        }
      }

      console.log(
        `\n🎉 Tour complete! You visited ${count} amazing places in Rome.`
      );
    } catch (error) {
      console.error("Error during visit simulation:", error);
      console.log("An error occurred during the visit.");
    }
  }

  private async compareAllMethods(): Promise<void> {
    try {
      console.log("\n📊 Comparing all three exploration methods...");
      console.log("=".repeat(50));

      const guides = [
        {
          guide: this.rome.randomWalk(),
          name: "🎲 Random Walk",
          description: "Chaotic but adventurous!",
        },
        {
          guide: this.rome.phoneApp(),
          name: "📱 Phone App",
          description: "Efficient and popular spots first",
        },
        {
          guide: this.rome.localGuide(),
          name: "🎭 Local Guide",
          description: "Insider knowledge and secrets",
        },
      ];

      for (const { guide, name, description } of guides) {
        console.log(`\n${name} (${description}):`);

        let count = 0;
        while (guide.hasNext() && count < 3) {
          guide.next();
          count++;
        }
        console.log(`   → Visited ${count} places`);
      }

      console.log("\n💡 Notice: Same Rome, completely different experiences!");
      console.log(
        "This demonstrates the Iterator Pattern - same collection, different traversal strategies!"
      );

      await this.continueOrReturn();
    } catch (error) {
      console.error("Error during comparison:", error);
      console.log(
        "An error occurred during comparison. Returning to main menu.\n"
      );
    }
  }

  private async continueOrReturn(): Promise<void> {
    try {
      console.log("\n" + "-".repeat(40));
      await this.askQuestion("Press Enter to return to main menu...");
      console.log();
    } catch (error) {
      console.error("Error in continue or return:", error);
    }
  }

  private askQuestion(question: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.rl.question(question, (answer) => {
          resolve(answer);
        });
      } catch (error) {
        console.error("Error asking question:", error);
        reject(error);
      }
    });
  }
}
