import amqp from "amqplib";

const RABBITMQ_URL = "amqp://rabbit:changeme@localhost:5672";
const EXCHANGE_NAME = "log_exchange";
const EXCHANGE_TYPE = "direct";
const QUEUE_NAME = "log_queue";
const ROUTING_KEY = "logstash_key";
const BATCH_SIZE = 10;

async function rabbitChannel() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE, {
      durable: true,
    });
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
    return channel;
  } catch (err) {
    console.error("Cannot connect to rabbitmq:", err);
    process.exit(1);
  }
}

async function main() {
  try {
    const channel = await rabbitChannel();
    console.log(`Aguardando mensagens na fila: ${QUEUE_NAME}`);

    let messageBatch: amqp.ConsumeMessage[] = [];

    const processBatch = async (batch: amqp.ConsumeMessage[]) => {
      console.log(`Processando lote de ${batch.length} mensagens.`);

      batch.forEach((message) => {
        console.log(JSON.stringify(message.content.toString()));
        channel.ack(message);
      });
      messageBatch = [];
    };

    channel.consume(
      QUEUE_NAME,
      (message) => {
        if (message) {
          messageBatch.push(message);
          if (messageBatch.length >= BATCH_SIZE) {
            processBatch(messageBatch);
          }
        }
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Consumer error:", error);
  }
}

main();
main();
main();
main();
