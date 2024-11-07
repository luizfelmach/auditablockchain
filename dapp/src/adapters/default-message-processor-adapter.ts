import { Message, MessageProcessor } from "../domain/interface";
import { SyncData } from "../domain/sync-data";
import { v4 as uuidv4 } from "uuid";

export class DefaultMessageProcessor implements MessageProcessor {
  constructor(private readonly syncData: SyncData) {}

  async handle(messages: Message[]): Promise<void> {
    await this.syncData.perform(
      uuidv4(),
      messages.map((m) => m.data)
    );

    messages.forEach((m) => {
      m.ack();
    });
  }
}
