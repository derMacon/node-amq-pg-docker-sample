const Stomp = require('stomp-client');

const client = new Stomp('127.0.0.1', 61613);
var destination = '/queue/samplequeue';

var dbclient;

function connectBroker(dbclient, messages) {
	client.connect(function(sessionId) {
		console.log("in connect.............");
		
		client.subscribe(destination, function(body, headers) {
		console.log('This is the body of a message on the subscribed queue:', body);
		console.log('header: ', headers);
		messages.push(body);
		console.log("mess arr: ", messages);


			const query = `
			INSERT INTO messages (message)
			VALUES ('${body}')
			`;

			console.log("query: ", query)

			dbclient.query(query, (err, res) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log('Data insert successful');
			});


		});
	});
}

function shutdownConnection() {
	dbclient.end();
}

module.exports.connectBroker = connectBroker;
module.exports.shutdownConnection = shutdownConnection;