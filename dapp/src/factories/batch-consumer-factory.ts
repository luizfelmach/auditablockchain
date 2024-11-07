import { DefaultMessageProcessor } from "../adapters/default-message-processor-adapter";
import { RabbitmqAdapter } from "../adapters/rabbitmq-adapter";
import { BatchConsumer } from "../domain/batch-consumer";
import { config } from "../main/config";
import { SyncDataFactory } from "./sync-data-factory";

export const BatchConsumerFactory = () => {
  const queue = new RabbitmqAdapter();
  const syncData = SyncDataFactory();
  const messageProcessor = new DefaultMessageProcessor(syncData);
  return new BatchConsumer(queue, messageProcessor, config.app.batchSize);
};
