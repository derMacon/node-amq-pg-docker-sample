import { SpecificationInput } from './SpecificationInput';

export class Specification {

	constructor(private specInput: SpecificationInput) {}

	get specificationName(): string {
		return this.specInput.specificationName;
	}

    get xsdContent(): string {
		return this.specInput.xsdContent;
	}
	 
	get xpath(): string {
		return this.specInput.xpath;
	}

}