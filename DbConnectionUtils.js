const { Client } = require('pg');


// const { Pool } = require('pg');

// const pool = new Pool({
//     host: 'localhost',
//     database: '',
//     user: 'admin',
//     password: 'admin',
//     port: 7002,
// });

// pool.on('error', (err, client) => {
//     console.error('Error:', err);
// });

function connectDb() {
	const dbclient = new Client({
		host: 'localhost',
		database: 'script-db',
		user: 'admin',
		password: 'admin',
		port: 7003,
	});

	dbclient.connect(err => {
		if (err) {
			console.error('connection error', err.stack)
		} else {
			console.log('connected')
		}
	})

	return dbclient;
}

module.exports.connectDb = connectDb;
