export class ResultWrapper {

	message: string;
	extractedElem: string;
	sent: Date;
	received: Date;
	processed: Date;

	constructor(
		message: string,
		extractedElem: string,
		sent: Date,
		received: Date,
		processed: Date
	) {
		this.message = message;
		this.extractedElem = extractedElem;
		this.sent = sent;
		this.received = received;
		this.processed = processed;
	}

}