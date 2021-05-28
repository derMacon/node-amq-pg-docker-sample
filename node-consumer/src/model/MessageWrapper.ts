export class MessageWrapper {
	message: string;
	sent: Date;

	constructor(
		message: string,
		sent: Date
		) {
		this.message = message;
		this.sent = sent;
	}
}