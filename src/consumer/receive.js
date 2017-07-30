const amqp = require("amqplib");

const config = require("../config/config");

async function receiveMessage() {
  try {
    const conn = await amqp.connect(config.AMQP_URL); // create connection
    const channel = await conn.createChannel(); // create channel
    await channel.assertExchange(config.EXCHANGE_NAME, "fanout", { durable: false }); // create fanout exchange
    const q = await channel.assertQueue("", { exclusive: true }); // create non-durable queue with a generated name
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    const boundQueue = await channel.bindQueue(q.queue, config.EXCHANGE_NAME, ""); // create relationship between exchange and queue
    await channel.consume(
      q.queue,
      msg => {
        let data = JSON.parse(msg.content);
        console.log("%s received", data.source);
      },
      { noAck: false }
    );
  } catch (e) {
    console.warn(e);
  }
}
receiveMessage();
