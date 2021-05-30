import * as PgDriver from 'pg';
import * as fs from 'fs';
import * as Xml from 'libxmljs2';

import { ResultWrapper } from '../model/ResultWrapper';
import { Specification } from '../model/Specification';

export class PersistenceService {

	private dbClient: PgDriver.Client;

	constructor() {
		this.dbClient = new PgDriver.Client({
			host: process.env.PG_HOSTNAME,
			database: process.env.PG_DATABASE_NAME,
			user: process.env.PG_USER_NAME,
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
		let query: string = "";
		fs.readFile("./schema.sql", (error: any, data: any) => {
			if (error) {
				throw error;
			}

			let query: string = data.toString();
			// let query: string = data.toString().replace(/(\r\n|\n|\r|\t)/gm, "");

			console.log("execute shema query: ", query);

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

		// const query = `
		// INSERT INTO payment (
		// 	content, 
		// 	extracted_element, 
		// 	specification_id
		// 	sent_timestamp, 
		// 	received_timestamp, 
		// 	processed_timestamp
		// ) VALUES (
		// 	'${result.getMessage()}',
		// 	'${result.getExtractedElem()}',
		// 	'${result.()}',
		// 	'${this.transformDate(result.getSentTimestamp())}',
		// 	'${this.transformDate(result.getReceivedTimestamp())}',
		// 	'${this.transformDate(result.getProcessedTimestamp())}'
		// );`;

		// console.log("query: ", query)

		// this.dbClient.query(query, (err, res) => {
		// 	if (err) {
		// 		console.error(err);
		// 		return;
		// 	}
		// 	console.log('Data insert successful');
		// });
	}

	saveSpecification(specification: Specification): void {
		const query = `
		INSERT INTO messages (
			specification_name, 
			specification_xsd
		) VALUES (
			'${specification.getSpecificationName()}',
			'${specification.getXsdContent()}'
		);`;

		console.log("query: ", query)

		this.dbClient.query(query, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('schema execution successfull');
		});
		
	}

	transformDate(inputDate: Date): string {
		return inputDate.toLocaleDateString() + " " + inputDate.toLocaleTimeString();
	}

}