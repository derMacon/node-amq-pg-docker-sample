// import * as dotenv from "dotenv";
import { AmqService } from './connection/AmqService';

require('dotenv').config();

const messages: string[] = [];


new AmqService("test").connectBroker(messages);

