export const config = {
  app: {
    batchSize: 10,
  },
  elastisearch: {
    uri: "http://localhost:9200",
    apiKey: "bmRYbEI1TUJYZU9LWGZpY1ItZkU6cmVGMUlrMEFRQWllbDJSVzJmektmQQ==",
  },
  ethereum: {
    uri: "http://localhost:8545",
    smartContract: "-",
    privateKey: "-",
  },
  rabbitmq: {
    uri: "amqp://rabbit:changeme@localhost:5672",
    queue: "queue",
  },
};
