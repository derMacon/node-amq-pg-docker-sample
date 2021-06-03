import { parseXmlString, Document } from 'libxmljs2';
import { PaymentInput } from './PaymentInput';

// src: https://stackoverflow.com/questions/34031448/typescript-typeerror-myclass-myfunction-is-not-a-function
export class PaymentMessage {

	constructor(private initData: PaymentInput) {}

	get content(): string {
		 return this.initData.content;
	};

	get xPath(): string {
		return this.initData.xPath;
	}

	get sentTimestamp(): Date {
		return this.initData.sentTimestamp
	}

	// constructor(
	// 	private _specificationName: string,
	// 	private _content: string,
	// 	private _sentTimestamp: Date,
	// ) {}

	// get specificationName(): string {
	// 	 return this._specificationName; 
	// }

	// get content(): Document {
	// 	 return parseXmlString(this._content);
	// };

	// get sentTimestamp(): Date {
	// 	return this._sentTimestamp;
	// }

}