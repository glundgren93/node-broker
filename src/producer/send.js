const axios = require("axios");

const { connection } = require("../config/amqpConnection");
const config = require("../config/config");

connection
  .then(conn => {
    return conn
      .createChannel()
      .then(ch => {
        let ex = config.EXCHANGE_NAME;
        var ok = ch.assertExchange(ex, "fanout", { durable: false });
        return ok.then(() => {
          const request = axios.get(config.API_REQUEST_URL);

          return request.then(response => {
            if (response.data.status !== "ok") {
              throw new Error("There was an error making the request");
            }

            ch.publish(ex, "", Buffer.from(JSON.stringify(response.data)));
            console.log("Articles sent from %s", response.data.source);
            return ch.close();
          });
        });
      })
      .finally(function() {
        conn.close();
      });
  })
  .catch(console.warn);
