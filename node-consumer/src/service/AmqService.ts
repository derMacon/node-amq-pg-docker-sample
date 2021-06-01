import { Document, parseXmlString } from 'libxmljs2';
import { PaymentMessage } from '../model/PaymentMessage';
import { PaymentInput } from '../model/PaymentInput';
import { Specification } from '../model/Specification';
import { WorkerService } from './WorkerService';

const Stomp = require('stomp-client');

const stompit = require('stompit');
 

export class AmqService {
	private workerService: WorkerService;

	private queueDestination: string; 
	private topicDestination: string; 

	private connectOptions: any;

	constructor(workerService: WorkerService) {
		this.workerService = workerService;
		this.queueDestination = process.env.AMQ_QUEUE_NAME!;
		this.topicDestination = process.env.AMQ_TOPIC_NAME!;

		this.connectOptions = {
			'host': process.env.AMQ_BROKER_HOSTNAME!,
			'port': +process.env.AMQ_BROKER_PORT!,
			'connectHeaders':{
				'host': '/',
				'login': process.env.AMQ_USER_NAME,
				'passcode': process.env.AMQ_USER_PASS,
				'heart-beat': '5000:5000'
			}
		}
	}

	connectBroker() {
		const that = this;

		stompit.connect(this.connectOptions, function(error: any, client: any) {
			if (error) {
				console.log('connect error ' + error.message);
				return;
			}
	
			const subscribeHeaders = {
				'destination': that.queueDestination,
				'ack': 'client-individual'
			};
			
			client.subscribe(subscribeHeaders, function(error: any, message: any) {
				
				if (error) {
					console.log('subscribe error ' + error.message);
					return;
				}
				
				message.readString('utf-8', function(error: any, body: any) {
				if (error) {
					console.log('read message error ' + error.message);
					return;
				}
				
				// that.workerService.work(body);
				console.log('received message: ' + body);
				client.ack(message);
				// client.disconnect();
				});
			});
		});
	}
	
}