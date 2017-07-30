module.exports = {
  AMQP_URL: "amqp://localhost",
  EXCHANGE_NAME: "testExchange",
  API_REQUEST_URL: `https://newsapi.org/v1/articles?source=the-new-york-times&sortBy=top&apiKey=${process.env.API_KEY}`
};
