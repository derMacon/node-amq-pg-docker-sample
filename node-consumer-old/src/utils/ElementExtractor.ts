import { PaymentMessage } from "../model/PaymentMessage";

const Dom = require('xmldom').DOMParser;
const xpath = require('xpath');

export class ElementExtractor {

	public extract(payment: PaymentMessage): string {
		console.log("payment inner: ", payment.xpath)
		let path = this.translatePath(payment.xpath);
		return this.extractElement(payment.content, path);
	}

	private translatePath(path: string): string {
		let xPathElems: string[] = path.split('/');
		let generatedPath: string = "";

		// delete first element since xpath starts with leading slash
		xPathElems.shift(); 

		xPathElems.forEach(e => generatedPath += `/*[local-name(.)='${e}']`);
		return generatedPath;
	}

	private extractElement(xmlContent: string, generatedPath: string) {
		let doc = new Dom().parseFromString(xmlContent)
		console.log(" -> out: ", xpath.select(generatedPath, doc));
		return xpath.select(generatedPath, doc)[0].textContent;
	}

}