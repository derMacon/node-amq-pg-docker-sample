import { MessageWrapper } from "../model/MessageWrapper";
import { ResultWrapper } from "../model/ResultWrapper";

export class ElementExtractor {

	extract(messageWrapper: MessageWrapper): ResultWrapper {

		// todo
		let extractedElem: string = "this is a test";

		return new ResultWrapper(
			messageWrapper.message,
			extractedElem, 
			new Date(),
			new Date(),
			new Date()
		);
	}

}