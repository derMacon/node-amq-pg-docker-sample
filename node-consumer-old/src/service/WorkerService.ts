// import { Payment } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";
import { Specification } from "../model/Specification";
import { ElementExtractor } from "../utils/ElementExtractor";
import { XsdChecker } from "../utils/XsdChecker";
import { PersistenceService } from './PersistenceService';
import { PaymentMessage } from '../model/PaymentMessage';
import { parseXmlString, Document } from "libxmljs2";

const xpath = require('xpath');
const Dom = require('xmldom').DOMParser;

export class WorkerService {

	private xsdSpecification: Specification[] = [];

	constructor(
		private xsdChecker: XsdChecker,
		private elemExtractor: ElementExtractor,
		private dbConnector: PersistenceService
	) {}

	updateSpecification(specification: Specification) {
		this.xsdSpecification.push(specification);
		this.dbConnector.saveSpecification(specification);
	}

	work(msgBody: string): void {
		let payment: PaymentMessage = JSON.parse(msgBody);
		let result: ResultWrapper = new ResultWrapper(payment);

		console.log("pay: ", msgBody);
		if (this.xsdChecker.isValidXml(payment)) {
			console.log("xsd checks out start to work");
			// let val: string = this.elemExtractor.extractValue(payment);
			let val: string = 'test';
			console.log('extracted: ', val);

			result.appendProcessedTimestamp(new Date())
					.appendExtractedElem(val);

			this.dbConnector.saveResult(result);
		} else {
			console.log("xsd does not check out");
		}
	}

}