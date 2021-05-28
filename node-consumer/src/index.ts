// import * as dotenv from "dotenv";
import * as PgDriver from 'pg';

import { AmqService } from './connection/AmqService';
import { PgConnectionFactory } from './connection/PgConnectionFactory';

require('dotenv').config();

const messages: string[] = [];

let dbClient: PgDriver.Client = PgConnectionFactory.createConnection();
new AmqService(dbClient).connectBroker(messages);

