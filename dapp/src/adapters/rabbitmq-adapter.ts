import { Callback, Queue } from "../domain/interface";
import rabbitmqHelper from "../helpers/rabbitmq-helper";

export class RabbitmqAdapter implements Queue {
  async consume(callback: Callback): Promise<void> {
    const channel = await rabbitmqHelper.channel();
    const queue = rabbitmqHelper.queue;

    channel.consume(queue, (msg) => {
      if (msg) {
        callback({
          data: JSON.parse(msg.content.toString()),
          ack: () => channel.ack(msg),
        });
      }
    });
  }
}
