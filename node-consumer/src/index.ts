import { MessageWrapper } from './model/MessageWrapper';
import { AmqService } from './service/AmqService';
import { PersistenceService } from './service/PersistenceService';
import { WorkerService } from './service/WorkerService';
import { ElementExtractor } from './utils/ElementExtractor';
import { XsdChecker } from './utils/XsdChecker';

require('dotenv').config();

const messages: MessageWrapper[] = [];

let workerService: WorkerService = new WorkerService(
	new ElementExtractor(),
	new XsdChecker(),
	new PersistenceService()
);

new AmqService(workerService).connectBroker();
