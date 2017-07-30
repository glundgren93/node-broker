const amqp = require("amqplib");

const config = require("../config/config");
const { connection } = require("../config/amqpConnection");

connection
  .then(conn => {
    return conn.createChannel().then(ch => {
      let ex = config.EXCHANGE_NAME;
      // create fanout exchange
      const exchange = ch.assertExchange(ex, "fanout", { durable: false });

      return exchange.then(() => {
        // when we supply queue name as an empty string, we create a non-durable queue with a generated name
        // when the connection that declared it closes, the queue will be deleted because it is declared as exclusive.
        const queue = ch.assertQueue("", { exclusive: true });

        return queue.then(q => {
          console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

          // tell exchange to send messages to our queue
          // relationship between exchange and a queue is called BINDING
          // exchange will append messages to our queue
          const boundQueue = ch.bindQueue(q.queue, ex, ""); // #bindQueue(queue, source, pattern, [args])

          return boundQueue.then(() => {
            ch.consume(
              q.queue,
              msg => {
                let data = JSON.parse(msg.content);
                console.log("%s received", data.source);
              },
              { noAck: false }
            );
          });
        });
      });
    });
  })
  .catch(console.warn);
