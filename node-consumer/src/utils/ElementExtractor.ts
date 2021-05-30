import { PaymentMessage } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";

export class ElementExtractor {

	extract(messageWrapper: PaymentMessage): ResultWrapper {

		// todo
		let extractedElem: string = "this is a test";

		return new ResultWrapper(
			messageWrapper.getMessage(),
			extractedElem, 
			new Date(),
			new Date(),
			new Date()
		);
	}

}