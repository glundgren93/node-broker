const amqp = require("amqplib");
const config = require("../config/config");

module.exports = {
  connection: amqp.connect(config.AMQP_URL)
};
