# node-broker

Node RabbitMQ Proof of Concept Project following https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html

## Usage


### To publish messages

```bash

npm run publish

```

### To receive messages

```bash

npm run subscribe

```


## Exchanges
"The core idea in the messaging model in RabbitMQ is that the producer never sends any messages directly to a queue. Actually, quite often the producer doesn't even know if a message will be delivered to any queue at all.

Instead, the producer can only send messages to an exchange. An exchange is a very simple thing. On one side it receives messages from producers and the other side it pushes them to queues. The exchange must know exactly what to do with a message it receives. Should it be appended to a particular queue? Should it be appended to many queues? Or should it get discarded. The rules for that are defined by the exchange type."

### Fanout Exchange
"The fanout exchange is very simple. As you can probably guess from the name, it just broadcasts all the messages it receives to all the queues it knows. And that's exactly what we need for our logger.""
