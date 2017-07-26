const amqp = require("amqplib/callback_api");

const config = require("../config/config");

let obj = {
  test: "lala",
  name: "gaga"
};

amqp.connect(config.AMPQ_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    let q = config.QUEUE_NAME;

    ch.assertQueue(q);
    // Send a single message with the content given as a buffer to the specific queue named
    ch.sendToQueue(q, Buffer.from(JSON.stringify(obj)));
    console.log("%s sent", obj.name);
  });
});
