import "./config/setup";

import { program } from "commander";
import { syncIndex, proofDoc } from "./cases";
import { app } from "./server";

program
  .name("dapp")
  .description("Dapp blockchain transactions and interact with elastic search");

program
  .command("sync")
  .argument("index", "Index on elastic search")
  .action(async (index) => {
    await syncIndex(index);
  });

program
  .command("proof")
  .argument("index", "Index on elastic search")
  .action(async (index) => {
    await proofDoc(index);
  });

program.command("server").action(async (_) => {
  await app.listen(5612);
});

program.parse();
