const amqp = require("amqplib");
const axios = require("axios");

const config = require("../config/config");

async function sendMessage() {
  const conn = await amqp.connect(config.AMQP_URL);
  try {
    const channel = await conn.createChannel();
    await channel.assertExchange(config.EXCHANGE_NAME, "fanout", { durable: false });
    const request = await axios.get(config.API_REQUEST_URL);
    await channel.publish(config.EXCHANGE_NAME, "", Buffer.from(JSON.stringify(request.data)));
    await console.log("Articles sent from %s", request.data.source);
    await channel.close();
  } catch (e) {
    console.warn(e);
  } finally {
    await conn.close();
  }
}
sendMessage();
