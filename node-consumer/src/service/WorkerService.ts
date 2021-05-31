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
		private elemExtractor: ElementExtractor,
		private xsdChecker: XsdChecker,
		private dbConnector: PersistenceService
	) {}

	updateSpecification(specification: Specification) {
		this.xsdSpecification.push(specification);
		this.dbConnector.saveSpecification(specification);
	}

	work(payment: PaymentMessage): void {
		let specification: Specification | undefined = this.findSpecification(payment.specificationName);
		let xmlDoc = parseXmlString(payment.content);

		if (specification != undefined 
			&& xmlDoc.validate(parseXmlString(specification.xsdContent))
		) {
			console.log("xsd checks out start to work");
			let val: string = this.extractValue(payment);
			console.log('extracted: ', val);
		} else {
			console.log("xsd does not check out");
		}
	}

	findSpecification(specName: string): Specification | undefined {
		let out: Specification | undefined = undefined;
		let idx: number = 0;

		let entry: Specification;
		console.log("len: ", this.xsdSpecification.length);
		while(out === undefined && idx < this.xsdSpecification.length) {
			entry = this.xsdSpecification[idx++];
			console.log("entry: ", entry.specificationName);
			if (entry.specificationName === specName) {
				out = entry;
			}
		}

		if (out === undefined) {
			// todo
			console.log("no specification with that name: ", specName);
			// console.log("spec lst: ", this.xsdSpecification);
		}

		return out!;
	}

	extractValue(payment: PaymentMessage): string {
		let doc = new Dom().parseFromString(payment.content)
		let node = xpath.select("/*[local-name(.)='employee']/*[local-name(.)='firstname']", doc)[0]
		return node.textContent;
	}

}