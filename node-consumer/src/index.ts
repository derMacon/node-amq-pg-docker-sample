import { AmqService } from './service/AmqService';
import { PersistenceService } from './service/PersistenceService';
import { WorkerService } from './service/WorkerService';
import { ElementExtractor } from './utils/ElementExtractor';
import { XsdChecker } from './utils/XsdChecker';
import { parseXmlString } from "libxmljs2";

require('dotenv').config();

let workerService: WorkerService = new WorkerService(
	new ElementExtractor(),
	new XsdChecker(),
	new PersistenceService()
);

new AmqService(workerService).connectBroker();


