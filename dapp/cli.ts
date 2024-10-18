import { program } from "commander";
import { syncIndex } from "./cases/sync-index";
import { proofDoc } from "./cases/proof-doc";

program
  .name("audita")
  .description(
    "Audit blockchain transactions and interact with elastic search"
  );

program
  .command("sync")
  .argument("index", "Index on elastic search")
  .action(async (index) => {
    await syncIndex(index);
  });

program
  .command("proof")
  .argument("index", "Index on elastic search")
  .argument("document", "Document id on index")
  .action(async (index, id) => {
    await proofDoc(index, id);
  });

program.parse();
