import { MessageWrapper } from "../model/MessageWrapper";
import { ResultWrapper } from "../model/ResultWrapper";
import { ElementExtractor } from "../utils/ElementExtractor";
import { XsdChecker } from "../utils/XsdChecker";
import { PersistenceService } from './PersistenceService';

export class WorkerService {

	private elemExtractor: ElementExtractor;
	private xsdChecker: XsdChecker;
	private dbConnector: PersistenceService;

	constructor(
		elemExtractor: ElementExtractor,
		xsdChecker: XsdChecker,
		dbConnector: PersistenceService
	) {
		this.elemExtractor = elemExtractor;
		this.xsdChecker = xsdChecker;
		this.dbConnector = dbConnector;
	}

	updateSpecification(xsdContent: string) {
		this.xsdChecker.setXsdSpecification(xsdContent);
	}

	work(wrapper: MessageWrapper): void {
		if (this.xsdChecker.checkXml(wrapper.message)) {
			let result: ResultWrapper = this.elemExtractor.extract(wrapper);
			this.dbConnector.saveResult(result);
		} else {
			// todo
		}
	}
}