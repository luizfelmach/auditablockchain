import amqp from "amqplib";
import { config } from "../main/config";

const { uri, queue } = config.rabbitmq;

export default {
  _channel: null as unknown as amqp.Channel,
  queue,

  async connect() {
    const connection = await amqp.connect(uri);
    this._channel = await connection.createChannel();
  },

  async channel() {
    if (!this._channel) await this.connect();
    return this._channel;
  },
};
