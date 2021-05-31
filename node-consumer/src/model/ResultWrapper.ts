import { Document, Node } from 'libxmljs2';
import { Specification } from '../model/Specification';
import { PaymentMessage } from './PaymentMessage';


export class ResultWrapper {

	message: string | undefined;
	extractedElem: string | undefined;
	specificationName: string | undefined;
	sentTimestamp: Date | undefined;
	receivedTimestamp: Date | undefined;
	processedTimestamp: Date | undefined;

	constructor(
		payment: PaymentMessage
	) {
		this.specificationName = payment.specificationName;
		this.message = payment.content;
		this.sentTimestamp = payment.sentTimestamp;
		this.receivedTimestamp = (new Date());
	}

	appendMessage(message: string): ResultWrapper {
		this.message = message;
		return this;
	}

	appendExtractedElem(extractedElem: string): ResultWrapper {
		this.extractedElem = extractedElem;
		return this;
	}
	
	appendSpecificationName(specificationName: string): ResultWrapper {
		this.specificationName = specificationName;
		return this;
	}

	appendSentTimestamp(sentTimestamp: Date): ResultWrapper {
		this.sentTimestamp = sentTimestamp;
		return this;
	}

	appendReceivedTimestamp(receivedTimestamp: Date): ResultWrapper {
		this.receivedTimestamp = receivedTimestamp;
		return this;
	}

	appendProcessedTimestamp(processedTimestamp: Date): ResultWrapper {
		this.processedTimestamp = processedTimestamp;
		return this;
	}

}