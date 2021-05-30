import * as xml from 'libxmljs2';

import { Specification } from '../model/Specification';
import { PaymentMessage } from '../model/PaymentMessage';

export class XsdChecker {

	private xsdSpecification: Specification[] = [];

	addSpecification(xsdSpecification: Specification) {
		this.xsdSpecification.push(xsdSpecification);
	}

	checkXml(xmlContent: PaymentMessage): boolean {
		let spec: Specification = this.findSpecification(xmlContent.getSpecificationName());

		// todo throw exception when no spec found

		let doc: xml.Document = xml.parseXmlString(xmlContent.getMessage());
		return doc.validate(spec.getXsdContent());
	}

	findSpecification(specName: string): Specification {
		let out: Specification | undefined = undefined;
		let idx: number = 0;

		let entry: Specification;
		while(out === undefined && idx < this.xsdSpecification.length) {
			entry = this.xsdSpecification[idx];
			if (entry.getSpecificationName() === specName) {
				out = entry;
			}
		}

		if (out === undefined) {
			// todo
			console.log("todo throw exception - no specification with that name");
		}

		return out!;
	}

}