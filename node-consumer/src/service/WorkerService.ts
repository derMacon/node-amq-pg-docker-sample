// import { Payment } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";
import { Specification } from "../model/Specification";
import { ElementExtractor } from "../utils/ElementExtractor";
import { XsdChecker } from "../utils/XsdChecker";
import { PersistenceService } from './PersistenceService';
import { PaymentMessage } from '../model/PaymentMessage';
import { parseXmlString, Document } from "libxmljs2";

const Dom = require('xmldom').DOMParser;
const select = require('xpath.js');

export class WorkerService {

	private xsdSpecification: Specification[] = [];

	constructor(
		private elemExtractor: ElementExtractor,
		private xsdChecker: XsdChecker,
		private dbConnector: PersistenceService
	) {}

	updateSpecification(specification: Specification) {
		// this.xsdChecker.addSpecification(specification);
		this.xsdSpecification.push(specification);
		this.dbConnector.saveSpecification(specification);
	}

	work(payment: PaymentMessage): void {
		let specification: Specification | undefined = this.findSpecification(payment.specificationName);
		let xmlDoc = parseXmlString(payment.content);

		// if (specification != undefined 
		// 	&& xmlDoc.validate(parseXmlString(specification.xsdContent))
		// ) {
		if (true
		) {
			console.log("xsd checks out start to work");

			var xml2 = '<?xml version="1.0" encoding="UTF-8" ?>' +
						'<metadata xmlns="http://musicbrainz.org/ns/mmd-2.0#" xmlns:ext="http://musicbrainz.org/ns/ext#-2.0">' +
						'   <recording-list offset="0" count="10">' +
						'      <recording ext:score="100" id="da99b6b1-9074-412a-b1a5-8ac94874802a">' +
						'         <title>Give Me All Your Luvin</title>' +
							'        <length>202760</length>' +
							'       <disambiguation>clean version</disambiguation>' +
							'      <artist-credit>' +
							'         <name-credit joinphrase=" feat. ">' +
								'            <artist id="79239441-bfd5-4981-a70c-55c3f15c1287">' +
								'               <name>Madonna</name>' +
								'              <sort-name>Madonna</sort-name>' +
								'         </artist>' +
									'    </name-credit>' +
									'    <name-credit joinphrase=" &amp; ">' +
									'        <artist id="1036b808-f58c-4a3e-b461-a2c4492ecf1b">' +
									'            <name>Nicki Minaj</name>' +
									'            <sort-name>Minaj, Nicki</sort-name>' +
									'        </artist>' +
									'    </name-credit>' +
									'    <name-credit joinphrase="">' +
									'        <artist id="7cf0ea9d-86b9-4dad-ba9e-2355a64899ea">' +
									'            <name>M.I.A.</name>' +
									'            <sort-name>M.I.A.</sort-name>' +
									'            <disambiguation>hip hop artist Maya Arulpragasam</disambiguation>' +
									'        </artist>' +
									'    </name-credit>' +
									'</artist-credit>' +
								'</recording>' +
							'</recording-list>' +
						'</metadata>';

						console.log("content: ", payment.content);
			
			// let xmlDoc: Document = parseXmlString(payment.content);
			// console.log("doc: ", xmlDoc.find('/employee'));

			const xml = '<ns2:OrderList> ' +
			'<order order_id="123" item_name="123"/>' +
			 '</ns2:OrderList>';
const doc = new Dom().parseFromString(payment.content);
const nodes = select(doc, '//order');

// const orderIds = nodes.map((node:any) => node.getAttribute('firstname'));
const orderIds = nodes.map((node:any) => node.getAttribute('order_id'));
console.log(orderIds);



		} else {
			console.log("xsd does not check out");
		}

		// if (this.xsdChecker.checkXml(payment)) {
		// 	console.log("xsd checks out start to work");
		// 	let result: ResultWrapper = this.elemExtractor.extract(payment);
		// 	// this.dbConnector.saveResult(result);
		// } else {
		// 	// todo
		// 	console.log("xsd does not check out");
		// }
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
}