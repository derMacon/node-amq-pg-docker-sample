import * as PgDriver from 'pg';
import { ResultWrapper } from '../model/ResultWrapper';

export class PersistenceService {

	dbClient: PgDriver.Client;

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
	}

	saveResult(result: ResultWrapper): void {

		const query = `
		INSERT INTO messages (message, elem, elem, elem)
		VALUES ('${result.message}', '${result.extractedElem}')
		`;

		console.log("query: ", query)

		this.dbClient.query(query, (err, res) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log('Data insert successful');
		});
	}

}