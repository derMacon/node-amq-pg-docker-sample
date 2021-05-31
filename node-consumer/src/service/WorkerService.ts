// import { Payment } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";
import { Specification } from "../model/Specification";
import { ElementExtractor } from "../utils/ElementExtractor";
import { XsdChecker } from "../utils/XsdChecker";
import { PersistenceService } from './PersistenceService';
import { PaymentMessage } from '../model/PaymentMessage';

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
		this.dbConnector.saveSpecification(specification);
	}

	work(payment: PaymentMessage): void {
		if (this.xsdChecker.checkXml(payment)) {
			console.log("xsd checks out start to work");
			// let result: ResultWrapper = this.elemExtractor.extract(payment);
			// this.dbConnector.saveResult(result);
		} else {
			// todo
			console.log("xsd does not check out");
		}
	}
}