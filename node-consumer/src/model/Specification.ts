import * as Xml from 'libxmljs2';

export class Specification {

	private specificationName: string;
    private xsd: Xml.Document;

	constructor(
		specificationName: string,
		xsdContent: string
	) {
		this.specificationName = specificationName;
		this.xsd = Xml.parseXmlString(xsdContent);
	}

	getSpecificationName(): string {
		return this.specificationName;
	}

	getXsdContent(): Xml.Document {
		return this.xsd;
	}

}