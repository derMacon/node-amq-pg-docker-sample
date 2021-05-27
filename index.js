console.log('hello world');



var Stomp = require('stomp-client');
var http = require('http');
var request = require('request');
var destination = '/queue/samplequeue';
var express = require('express');

var client = new Stomp('127.0.0.1', 61613);



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


const { Client } = require('pg');

const dbclient = new Client({
    host: 'localhost',
    database: 'script-db',
    user: 'admin',
    password: 'admin',
    port: 5432,
});

dbclient.connect(err => {
	if (err) {
	  console.error('connection error', err.stack)
	} else {
	  console.log('connected')
	}
  })


const query = `
INSERT INTO messages (message_id, message)
VALUES (42, 'testmessage')
`;

console.log("vor db insert")

dbclient.query(query, (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Data insert successful');
    dbclient.end();
});

console.log("nach db insert")


// var messages = [];
	
// client.connect(function(sessionId) {
// 	console.log("in connect.............");
	 
// 	 client.subscribe(destination, function(body, headers) {
//        console.log('This is the body of a message on the subscribed queue:', body);
//        console.log('header: ', headers);
// 	   messages.push(body);
// 	   console.log("mess arr: ", messages);
//      });
// });



// const app = express();

// app.get('/', (request, response) => {
// 	response.send('Our first node.js server');
// });

// app.get('/messages', (request, response) => {
// 	response.send(JSON.stringify(messages));
// });

// app.listen(3000, () => console.log('server running on port 3000'));

