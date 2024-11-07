import { BatchConsumerFactory } from "../factories/batch-consumer-factory";

async function main() {
  const batchConsumer = BatchConsumerFactory();
  batchConsumer.start();
}

main();
