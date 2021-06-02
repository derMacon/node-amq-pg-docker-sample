// import { Document, parseXmlString } from 'libxmljs2';
// import { Specification } from '../model/Specification';
// import { PaymentMessage } from '../model/PaymentMessage';

// // const Stomp = require('stomp-client');
// // require('colors');
// // const Diff = require('diff');

export class XsdChecker {

	// private xsdSpecification: string;

	// constructor() {
	// 	// this.xsdSpecification

	// }




// 	private xsdSpecification: Specification[] = [];

	// addSpecification(xsdSpecification: Specification) {
// 		console.log("adding specification: ", xsdSpecification.specificationName);
// 		this.xsdSpecification.push(xsdSpecification);
	// }



// 	checkXml(payment: PaymentMessage): boolean {
// 		let spec: Specification = this.findSpecification(payment.specificationName);

// 		// todo throw exception when no spec found

// 		console.log("payment before: ", payment);

// 		let txt: string = '<?xml version="1.0" encoding="UTF-8"?>\r\n' +
// 		'<Document xmlns="sample-specification.xsd">\r\n' +
// 		'  <CstmrCdtTrfInitn>\r\n' +
// 		'    <GrpHdr>\r\n' +
// 		'      <MsgId>UXC20120800037</MsgId>\r\n' +
// 		'      <CreDtTm>2021-05-08T13:30:49.419</CreDtTm>\r\n' +
// 		'      <NbOfTxs>1</NbOfTxs>\r\n' +
// 		'      <CtrlSum>1717.17</CtrlSum>\r\n' +
// 		'      <InitgPty>\r\n' +
// 		'        <Nm>Initiating Party Name</Nm>\r\n' +
// 		'      </InitgPty>\r\n' +
// 		'    </GrpHdr>\r\n' +
// 		'    <PmtInf>\r\n' +
// 		'      <PmtInfId>UXC20120800037R00001</PmtInfId>\r\n' +
// 		'      <PmtMtd>TRF</PmtMtd>\r\n' +
// 		'      <NbOfTxs>1</NbOfTxs>\r\n' +
// 		'      <CtrlSum>1717.17</CtrlSum>\r\n' +
// 		'      <PmtTpInf>\r\n' +
// 		'        <SvcLvl>\r\n' +
// 		'          <Cd>SDVA</Cd>\r\n' +
// 		'        </SvcLvl>\r\n' +
// 		'      </PmtTpInf>\r\n' +
// 		'      <ReqdExctnDt>\r\n' +
// 		'        <Dt>2021-05-08</Dt>  \r\n' +
// 		'      </ReqdExctnDt>\r\n' +
// 		'      <Dbtr>\r\n' +
// 		'        <Nm>GL</Nm>\r\n' +
// 		'      </Dbtr>\r\n' +
// 		'      <DbtrAcct>\r\n' +
// 		'        <Id>\r\n' +
// 		'          <IBAN>AT331200000696200104</IBAN>\r\n' +
// 		'        </Id>\r\n' +
// 		'      </DbtrAcct>\r\n' +
// 		'      <DbtrAgt>\r\n' +
// 		'        <FinInstnId>\r\n' +
// 		'          <BICFI>BKAUATW0XXX</BICFI>\r\n' +
// 		'        </FinInstnId>\r\n' +
// 		'      </DbtrAgt>\r\n' +
// 		'      <CdtTrfTxInf>\r\n' +
// 		'        <PmtId>\r\n' +
// 		'          <InstrId>UXC20120300037I00001</InstrId>\r\n' +
// 		'          <EndToEndId>UXC20120300036E00001</EndToEndId>\r\n' +
// 		'        </PmtId>\r\n' +
// 		'        <Amt>\r\n' +
// 		'          <InstdAmt Ccy="EUR">1717.17</InstdAmt>\r\n' +
// 		'        </Amt>\r\n' +
// 		'        <CdtrAgt>\r\n' +
// 		'          <FinInstnId>\r\n' +
// 		'            <BICFI>HYVEDEMM047</BICFI>\r\n' +
// 		'          </FinInstnId>\r\n' +
// 		'        </CdtrAgt>\r\n' +
// 		'        <Cdtr>\r\n' +
// 		'          <Nm>DE NAME</Nm>\r\n' +
// 		'          <PstlAdr>\r\n' +
// 		'            <Ctry>DE</Ctry>\r\n' +
// 		'            <AdrLine>Point Courrier 201</AdrLine>\r\n' +
// 		'            <AdrLine>IT 91191 Gif sur Yvette</AdrLine>\r\n' +
// 		'          </PstlAdr>\r\n' +
// 		'        </Cdtr>\r\n' +
// 		'        <CdtrAcct>\r\n' +
// 		'          <Id>\r\n' +
// 		'            <IBAN>DE7979320075037742545600</IBAN>\r\n' +
// 		'          </Id>\r\n' +
// 		'        </CdtrAcct>\r\n' +
// 		'        <RmtInf>\r\n' +
// 		'          <Ustrd>Unstructured Remittance Info Val enrich 17</Ustrd>\r\n' +
// 		'        </RmtInf>\r\n' +
// 		'      </CdtTrfTxInf>\r\n' +
// 		'    </PmtInf>\r\n' +
// 		'  </CstmrCdtTrfInitn>\r\n' +
// 		'</Document>';

// 		let doc: string = payment.content;







// 		console.log("doc equals ", doc === txt)

// 		return parseXmlString(doc).validate(parseXmlString(spec.xsdContent));
// 		// return true;
// 	}

// 	findSpecification(specName: string): Specification | undefined {
// 		let out: Specification | undefined = undefined;
// 		let idx: number = 0;

// 		let entry: Specification;
// 		console.log("len: ", this.xsdSpecification.length);
// 		while(out === undefined && idx < this.xsdSpecification.length) {
// 			entry = this.xsdSpecification[idx++];
// 			console.log("entry: ", entry.specificationName);
// 			if (entry.specificationName === specName) {
// 				out = entry;
// 			}
// 		}

// 		if (out === undefined) {
// 			// todo
// 			console.log("no specification with that name: ", specName);
// 			// console.log("spec lst: ", this.xsdSpecification);
// 		}

// 		return out!;
	// }

}