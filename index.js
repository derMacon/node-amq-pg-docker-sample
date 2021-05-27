var http = require('http');
var request = require('request');
var express = require('express');

// var client = new Stomp('127.0.0.1', 61613);

const { connectDb } = require('./DbConnectionUtils.js');
const { connectBroker } = require('./AmqConnectionUtils.js');

var messages = [];
dbclient = connectDb();
connectBroker(dbclient, messages);
	

const app = express();

app.get('/', (request, response) => {
	response.send('Our first node.js server');
});

app.get('/messages', (request, response) => {
	response.send(JSON.stringify(messages));
});

app.listen(3000, () => console.log('server running on port 3000'));

