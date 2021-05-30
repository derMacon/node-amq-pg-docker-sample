import { Document } from 'libxmljs2';

export class PaymentMessage {
	private document: Document;
	private specificationName: string;
	private sent: Date;

	constructor(
		message: Document,
		specificationName: string,
		sent: Date,
	) {
		this.document = message;
		this.specificationName = specificationName;
		this.sent = sent;
	}

	getDocument(): Document {
		return this.document;
	}

	getSpecificationName(): string {
		return this.specificationName;
	}

	getSent(): Date {
		return this.sent;
	}
}