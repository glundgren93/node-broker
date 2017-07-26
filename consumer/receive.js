const amqp = require("amqplib/callback_api");

const config = require("../config/config");

amqp.connect(config.AMPQ_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    let q = config.QUEUE_NAME;

    ch.assertQueue(q);
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", q);

    // Set up a consumer with a callback to be invoked with each message.
    ch.consume(
      q,
      msg => {
        console.log("[x] Message Received");
        let obj = JSON.parse(msg.content);
        ch.ack(msg); // acknowlodge message was received
        console.log("%s acknowlodged", obj.name);
      },
      { noAck: false } // assure messages won't be lost
    );
  });
});
