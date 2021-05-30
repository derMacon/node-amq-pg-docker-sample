export class PaymentMessage {
	private message: string;
	private specificationName: string;
	private sent: Date;

	constructor(
		message: string,
		specificationName: string,
		sent: Date,
	) {
		this.message = message;
		this.specificationName = specificationName;
		this.sent = sent;
	}

	getMessage(): string {
		return this.message;
	}

	getSpecificationName(): string {
		return this.specificationName;
	}

	getSent(): Date {
		return this.sent;
	}
}