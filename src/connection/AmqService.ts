const Stomp = require('stomp-client');

export class AmqService {
	destination: string;
	stompClient: any;

	constructor(dbclient: any) {
		this.destination = process.env.AMQ_QUEUE_NAME!;
		console.log("env: ", process.env.JSON_TEST);
		this.stompClient = new Stomp(
			process.env.AMQ_BROKER_HOSTNAME,
			process.env.AMQ_BROKER_PORT
		);
	}


	connectBroker(messages: string[]) {
		const other: any = this;
		this.stompClient.connect(function(sessionId: number) {
			console.log("in connect.............");
			
			other.client.subscribe(other.destination, function(body: any, headers: any) {
			console.log('This is the body of a message on the subscribed queue:', body);
			console.log('header: ', headers);
			messages.push(body);
			console.log("mess arr: ", messages);
	
	
				const query = `
				INSERT INTO messages (message)
				VALUES ('${body}')
				`;
	
				console.log("query: ", query)
	
				// dbclient.query(query, (err, res) => {
				// 	if (err) {
				// 		console.error(err);
				// 		return;
				// 	}
				// 	console.log('Data insert successful');
				// });
	
	
			});
		});
	}
	

}