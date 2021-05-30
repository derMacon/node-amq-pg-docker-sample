import { MessageWrapper } from '../model/MessageWrapper';
import { WorkerService } from './WorkerService';

const Stomp = require('stomp-client');

export class AmqService {

	queueDestination: string;
	topicDestination: string;
	stompClient: any;
	workerService: WorkerService;

	constructor(workerService: WorkerService) {
		this.workerService = workerService;
		this.queueDestination = process.env.AMQ_QUEUE_NAME!;
		this.topicDestination = process.env.AMQ_TOPIC_NAME!;
		this.stompClient = new Stomp(
			process.env.AMQ_BROKER_HOSTNAME,
			process.env.AMQ_BROKER_PORT
		);
	}

	connectBroker() {
		const that = this;
		this.stompClient.connect(function(sessionId: number) {
			console.log("in connect.............");
			
			that.stompClient.subscribe(that.queueDestination, function(body: string, headers: string) {
				console.log('queue msg header: ', headers);
				// console.log('This is the body of a message on the subscribed queue:', body);
				let inputMsg: MessageWrapper = JSON.parse(body);
				that.workerService.work(inputMsg);
			});
			
			that.stompClient.subscribe(that.topicDestination, function(body: string, headers: string) {
				console.log('topic msg header: ', headers);
				console.log('This is the body of a message on the subscribed topic:', body);
				let inputMsg: MessageWrapper = JSON.parse(body);
				that.workerService.work(inputMsg);
			});

		});
	}
	

}