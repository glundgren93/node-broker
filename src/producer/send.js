const amqp = require("amqplib/callback_api");

const config = require("../config/config");

let obj = {
  test: "lala",
  name: "gaga"
};

amqp.connect(config.AMPQ_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    let ex = config.EXCHANGE_NAME;

    // create fanout exchange
    ch.assertExchange(ex, "fanout", { durable: false });

    // publish messages to exchange
    ch.publish(ex, "", Buffer.from(JSON.stringify(obj)));
    console.log("%s sent", obj.name);
  });
});
