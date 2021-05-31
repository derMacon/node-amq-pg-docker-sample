import { Document, Node } from 'libxmljs2';
import { Specification } from '../model/Specification';

export class ResultWrapper {

	constructor(
		private _message: Document,
		private _extractedElem: Node,
		private _specification: Specification,
		private _sentTimestamp: Date,
		private _receivedTimestamp: Date,
		private _processedTimestamp: Date
	) {}

	get message(): Document {
		return this._message;
	}

	get extractedElem(): Node {
		return this._extractedElem;
	}
	
	get specification(): Specification {
		return this._specification;
	}

	get sentTimestamp(): Date {
		return this._sentTimestamp;
	}


	get receivedTimestamp(): Date {
		return this._receivedTimestamp;
	}

	get processedTimestamp(): Date {
		return this._processedTimestamp;
	}

}