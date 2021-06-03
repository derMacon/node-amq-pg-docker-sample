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

	constructor(
		private xsdChecker: XsdChecker,
		private elemExtractor: ElementExtractor,
		private dbConnector: PersistenceService
	) {}

	work(msgBody: string): void {
		let payment: PaymentMessage = JSON.parse(msgBody);
		let result: ResultWrapper = new ResultWrapper(payment);

		console.log(`batch ${payment.batchId} - new payment`)

		if (this.xsdChecker.isValidXml(payment)) {
			console.log(" -> xsd checker: valid xml");

			let extractedElement: string = this.elemExtractor.extract(payment);

			result.appendProcessedTimestamp(new Date())
					.appendExtractedElem(extractedElement);

			this.dbConnector.saveResult(result);
		} else {
			console.log(" -> xsd checker: invalid xml");
		}
	}

}