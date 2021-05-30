export class XsdChecker {

	private xsdSpecification: string = "";

	setXsdSpecification(xsdSpecification: string) {
		this.xsdSpecification = xsdSpecification;
	}

	checkXml(xmlContent: string): boolean {
		return true;
	}
}