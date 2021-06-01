import * as PgDriver from 'pg';
import * as fs from 'fs';
import * as Xml from 'libxmljs2';

import { ResultWrapper } from '../model/ResultWrapper';
import * as Xsd from '../model/Specification';

export class PersistenceService {

	private dbClient: PgDriver.Pool;

	constructor() {
		this.dbClient = new PgDriver.Pool({
			host: process.env.PG_HOSTNAME,
			database: process.env.PG_DATABASE_NAME,
			user: process.env.PG_USER_NAME,
			max: 20,
			idleTimeoutMillis: 30000,
  			connectionTimeoutMillis: 2000,
			password: process.env.PG_USER_PASSWORD,
			port: Number(process.env.PG_DATABASE_PORT),
		});

		this.dbClient.connect(err => {
			if (err) {
				console.error('connection error', err)
			} else {
				console.log('connected to postgres db')
			}
		});

		// load schema file
		fs.readFile("./schema.sql", (error: any, data: any) => {
			if (error) {
				throw error;
			}

			let query: string = data.toString();
			// let query: string = data.toString().replace(/(\r\n|\n|\r|\t)/gm, "");

			// query database 
			this.dbClient.query(query, (err, res) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log('schema execution successfull', res);
			});


		});

	}

	saveResult(result: ResultWrapper): void {

		console.log("persist obj: ", result);

		const query = `
		INSERT INTO payment (
			content, 
			extracted_element, 
			specification_name,
			sent_timestamp, 
			received_timestamp, 
			processed_timestamp
		) VALUES (
			'${result.message}',
			'${result.extractedElem}',
			'${result.specificationName}',
			'${this.transformDate(result.receivedTimestamp!)}',
			'${this.transformDate(result.receivedTimestamp!)}',
			'${this.transformDate(result.processedTimestamp!)}'
		);`;

		this.dbClient.query(query, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Data insert successfull');
		});
	}

	saveSpecification(specification: Xsd.Specification): void {
		// todo - scheint irgendwie nicht zu gehen: error: index row requires 8472 bytes, maximum size is 8191
		// bei kuerzerer xsd Spezifikation laeufts aber...

		console.log("save: -------- ", specification.specificationName);

		// const query: string = `
		// INSERT INTO specification (
		// 	specification_name, 
		// 	specification_xsd
		// ) VALUES (
		// 	'${specification.specificationName}',
		// 	'${specification.xsdContent}'
		// );`;

		// console.log("save specs - query: ", query)

		// this.dbClient.query(query, (err, res) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return;
		// 	}
		// 	console.log('schema execution successfull');
		// });
		
	}


	transformDate(inputDate: Date): string {
		console.log('date: ', inputDate)
		// return inputDate.getMilliseconds();
		// return inputDate.toLocaleDateString() + " " + inputDate.toLocaleTimeString() + ":" + inputDate.getMilliseconds();
		return inputDate.toISOString();
	}

}