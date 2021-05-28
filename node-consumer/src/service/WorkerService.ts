import { MessageWrapper } from "../model/MessageWrapper";
import { ElementExtractor } from "../utils/ElementExtractor";
import { XsdChecker } from "../utils/XsdChecker";
import { PersistenceService } from './PersistenceService';

export class WorkerService {

	elemExtractor: ElementExtractor;
	xsdChecker: XsdChecker;
	dbConnector: PersistenceService;

	constructor(
		elemExtractor: ElementExtractor,
		xsdChecker: XsdChecker,
		dbConnector: PersistenceService
	) {
		this.elemExtractor = elemExtractor;
		this.xsdChecker = xsdChecker;
		this.dbConnector = dbConnector;
	}

	work(wrapper: MessageWrapper): void {
		if (this.xsdChecker.checkXml(wrapper.message)) {
			let elemValue = this.elemExtractor.extract(wrapper.message);
			this.dbConnector
		} else {
			// todo
		}
	}
}