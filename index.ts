import { InteractiveDemo } from "./InteractiveDemo";

async function main() {
  const demo = new InteractiveDemo();
  await demo.start();
}

main().catch(console.error);
