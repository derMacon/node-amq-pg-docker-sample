import * as PgDriver from 'pg';

const Stomp = require('stomp-client');

export class AmqService {
	destination: string;
	stompClient: any;
	dbClient: PgDriver.Client;

	constructor(dbClient: PgDriver.Client) {
		this.dbClient = dbClient;
		this.destination = process.env.AMQ_QUEUE_NAME!;
		this.stompClient = new Stomp(
			process.env.AMQ_BROKER_HOSTNAME,
			process.env.AMQ_BROKER_PORT
		);
	}


	connectBroker(messages: string[]) {
		const that = this;
		this.stompClient.connect(function(sessionId: number) {
			console.log("in connect.............");
			
			that.stompClient.subscribe(that.destination, function(body: any, headers: any) {
				console.log('header: ', headers);
				console.log('This is the body of a message on the subscribed queue:', body);
				messages.push(body);
				console.log("message array: ", messages);
		
					const query = `
					INSERT INTO messages (message)
					VALUES ('${body}')
					`;
		
					console.log("query: ", query)
		
					that.dbClient.query(query, (err, res) => {
						if (err) {
							console.error(err);
							return;
						}
						console.log('Data insert successful');
					});
				}
			);
		});
	}
	

}