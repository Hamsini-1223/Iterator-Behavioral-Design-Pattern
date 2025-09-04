// File: src/index.ts
import { InteractiveDemo } from "./controllers/interactiveDemo";

async function main(): Promise<void> {
  try {
    const demo = new InteractiveDemo();
    await demo.start();
  } catch (error) {
    console.error("Application error:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
