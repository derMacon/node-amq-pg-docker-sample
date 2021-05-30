import { PaymentMessage } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";
import { Specification } from "../model/Specification";
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

	updateSpecification(specification: Specification) {
		this.xsdChecker.addSpecification(specification);
	}

	work(payment: PaymentMessage): void {
		if (this.xsdChecker.checkXml(payment)) {
			let result: ResultWrapper = this.elemExtractor.extract(payment);
			this.dbConnector.saveResult(result);
		} else {
			// todo
		}
	}
}