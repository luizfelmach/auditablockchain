import { Message, Queue, MessageProcessor } from "./interface";

export class BatchConsumer {
  batch: Message[] = [];

  constructor(
    private readonly queue: Queue,
    private readonly messageProcessor: MessageProcessor,
    private readonly batchSize: number
  ) {}

  async start() {
    await this.queue.consume((message) => {
      this.batch.push(message);

      if (this.batch.length >= this.batchSize) {
        this.messageProcessor.handle(this.batch);
        this.batch = [];
      }
    });
  }
}
