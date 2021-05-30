import { Document, Node } from 'libxmljs2';
import { HighlightSpanKind } from 'typescript';
import { Specification } from '../model/Specification';

export class ResultWrapper {

	private message: Document;
	private extractedElem: Node;
	private specification: Specification;
	private sentTimestamp: Date;
	private receivedTimestamp: Date;
	private processedTimestamp: Date;

	constructor(
		message: Document,
		extractedElem: Node,
		specification: Specification,
		sent: Date,
		received: Date,
		processed: Date
	) {
		this.message = message;
		this.extractedElem = extractedElem;
		this.specification = specification;
		this.sentTimestamp = sent;
		this.receivedTimestamp = received;
		this.processedTimestamp = processed;
	}


	getMessage(): Document {
		return this.message;
	}

	getExtractedElem(): Node {
		return this.extractedElem;
	}
	
	getSpecification(): Specification {
		return this.specification;
	}

	getSentTimestamp(): Date {
		return this.sentTimestamp;
	}


	getReceivedTimestamp(): Date {
		return this.receivedTimestamp;
	}

	getProcessedTimestamp(): Date {
		return this.processedTimestamp;
	}



}