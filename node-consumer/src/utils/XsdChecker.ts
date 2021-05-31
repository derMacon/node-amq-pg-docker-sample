import { Document } from 'libxmljs2';
import { Specification } from '../model/Specification';
import { Payment } from '../model/Payment';

export class XsdChecker {

	private xsdSpecification: Specification[] = [];

	addSpecification(xsdSpecification: Specification) {
		this.xsdSpecification.push(xsdSpecification);
	}

	checkXml(xmlContent: Payment): boolean {
		// let spec: Specification = this.findSpecification(xmlContent.getSpecificationName());

		// todo throw exception when no spec found

		// let doc: Document = xmlContent.getDocument();
		// return doc.validate(spec.getXsdContent());
		return true;
	}

	// findSpecification(specName: string): Specification {
	// 	let out: Specification | undefined = undefined;
	// 	let idx: number = 0;

	// 	let entry: Specification;
	// 	while(out === undefined && idx < this.xsdSpecification.length) {
	// 		entry = this.xsdSpecification[idx];
	// 		if (entry.getSpecificationName() === specName) {
	// 			out = entry;
	// 		}
	// 	}

	// 	if (out === undefined) {
	// 		// todo
	// 		console.log("todo throw exception - no specification with that name");
	// 	}

	// 	return out!;
	// }

}