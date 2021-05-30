import { Node } from "libxmljs2";
import { PaymentMessage } from "../model/PaymentMessage";
import { ResultWrapper } from "../model/ResultWrapper";
import { Specification } from "../model/Specification";

export class ElementExtractor {

	extract(messageWrapper: PaymentMessage): ResultWrapper {

		// todo
		let extractedElem: string = "this is a test";

		return new ResultWrapper(
			messageWrapper.getDocument(),
			new Node(),
			new Specification('test1', 'test2'),
			new Date(),
			new Date(),
			new Date()
		);
	}

}