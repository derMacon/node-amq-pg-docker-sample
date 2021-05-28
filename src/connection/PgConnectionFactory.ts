import * as PgDriver from 'pg';

export abstract class PgConnectionFactory {

	static createConnection(): PgDriver.Client {
		let dbclient = new PgDriver.Client({
			host: process.env.PG_HOSTNAME,
			database: process.env.PG_DATABASE_NAME,
			user: process.env.PG_USER_NAME,
			password: process.env.PG_USER_PASSWORD,
			port: Number(process.env.PG_DATABASE_PORT),
		});

		console.log("dbClient: ", dbclient);

		dbclient.connect(err => {
			if (err) {
				console.error('connection error', err)
			} else {
				console.log('connected to postgres db')
			}
		});

		return dbclient;
	}

}