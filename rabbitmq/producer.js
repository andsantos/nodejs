var amqp = require('amqplib/callback_api');

//URL na variável de ambiente
//set CLOUDAMQP_URL=amqp://usuario:senha@servidor/vhost

amqp.connect(process.env.CLOUDAMQP_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'queue01';
	var msg = process.argv.slice(2).join(" ");

	if (!msg) {
		msg = 'Hello world';
	}

    channel.assertQueue(queue, {
      durable: true
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

	setTimeout(function () { connection.close(); process.exit(0) }, 500);
});