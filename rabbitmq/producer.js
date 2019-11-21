var amqp = require('amqplib/callback_api');

//URL na variável de ambiente
//set AMQP_URL=amqp://usuario:senha@servidor/vhost

console.log(process.env.AMQP_URL);

amqp.connect(process.env.AMQP_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'queue01';
    var msg = 'Hello world';

    channel.assertQueue(queue, {
      durable: true
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });
});