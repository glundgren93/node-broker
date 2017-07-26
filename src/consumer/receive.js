const amqp = require("amqplib/callback_api");

const config = require("../config/config");

amqp.connect(config.AMPQ_URL, (err, conn) => {
  conn.createChannel((err, ch) => {
    let ex = config.EXCHANGE_NAME;

    // create fanout exchange
    ch.assertExchange(ex, "fanout", { durable: false });

    // when we supply queue name as an empty string, we create a non-durable queue with a generated name
    // when the connection that declared it closes, the queue will be deleted because it is declared as exclusive.
    ch.assertQueue("", { exclusive: true }, (err, q) => {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

      // tell exchange to send messages to our queue
      // relationship between exchange and a queue is called BINDING
      // exchange will append messages to our queue
      ch.bindQueue(q.queue, ex, "");

      ch.consume(
        q.queue,
        msg => {
          let obj = JSON.parse(msg.content);
          console.log("%s received", obj.name);
        },
        { noAck: false }
      );
    });
  });
});
