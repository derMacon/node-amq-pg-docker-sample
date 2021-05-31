import { Document, parseXmlString } from 'libxmljs2';
import { SpecificationInput } from './SpecificationInput';

export class Specification {

	constructor(private specInput: SpecificationInput) {}

	get specificationName(): string {
		return this.specInput.specificationName;
	}

    get xsdContent(): Document {
		return parseXmlString(this.specInput.xsdContent);
	}

}