import * as Xml from 'libxmljs2';

import { Specification } from '../model/Specification';

export class ResultWrapper {

	message: Xml.Document;
	extractedElem: Xml.Node;
	specification: Specification;
	sent: Date;
	received: Date;
	processed: Date;

	constructor(
		message: Xml.Document,
		extractedElem: Xml.Node,
		specification: Specification,
		sent: Date,
		received: Date,
		processed: Date
	) {
		this.message = message;
		this.extractedElem = extractedElem;
		this.specification = specification;
		this.sent = sent;
		this.received = received;
		this.processed = processed;
	}

}