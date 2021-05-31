import { AmqService } from './service/AmqService';
import { PersistenceService } from './service/PersistenceService';
import { WorkerService } from './service/WorkerService';
import { ElementExtractor } from './utils/ElementExtractor';
import { XsdChecker } from './utils/XsdChecker';
import { parseXmlString } from "libxmljs2";

require('dotenv').config();

let workerService: WorkerService = new WorkerService(
	new ElementExtractor(),
	new XsdChecker(),
	new PersistenceService()
);

new AmqService(workerService).connectBroker();



// const Dom = require('xmldom').DOMParser;
// // const select = require('xpath.js');
// const select = require('xpath.js');
// const useNamespaces = require('xpath.js');
// const xml = '<employee xmlns="sample-specification.xsd">' +
// '<firstname order_id="123" item_name="123">testfst</firstname>' +
// '</employee>';
// const doc = new Dom().parseFromString(xml);
// // const nodes = select('//bookml:title/text()', doc);
// useNamespaces({xmlns: 'sample-specification.xsd'})
// const nodes = select('//xmlns:firstname', doc);
// // const nodes = select(doc, '//firstname');

// const orderIds = nodes.map((node:any) => node.textContent);
// // const orderIds = nodes.map((node:any) => node.getAttribute('order_id'));
// console.log(orderIds);





// works...
// const Dom = require('xmldom').DOMParser;
// // const select = require('xpath.js');
// const select = require('xpath.js');
// const useNamespaces = require('xpath.js');
// const xml = '<employee>' +
// '<firstname order_id="123" item_name="123">testfst</firstname>' +
// '</employee>';
// const doc = new Dom().parseFromString(xml);
// // const nodes = select('//bookml:title/text()', doc);
// // useNamespaces({xmlns: 'sample-specification.xsd'})
// // const nodes = select('//xmlns:firstname', doc);
// const nodes = select(doc, '//employee/firstname');

// const orderIds = nodes.map((node:any) => node.textContent);
// // const orderIds = nodes.map((node:any) => node.getAttribute('order_id'));
// console.log(orderIds);





// const Dom = require('xmldom').DOMParser;
// // const select = require('xpath.js');
// const select = require('xpath.js');
// const useNamespaces = require('xpath.js');
// const xml = '<employee xmlns="sample-specification.xsd">' +
// '<firstname order_id="123" item_name="123">testfst</firstname>' +
// '</employee>';
// const doc = new Dom().parseFromString(xml);
// // const nodes = select('//bookml:title/text()', doc);
// // useNamespaces({xmlns: 'sample-specification.xsd'})
// // const nodes = select('//xmlns:firstname', doc);
// const nodes = select(doc, "//*[local-name()='loc']/employee/firstname");

// const orderIds = nodes.map((node:any) => node.textContent);
// // const orderIds = nodes.map((node:any) => node.getAttribute('order_id'));
// console.log(orderIds);




// var xpath = require('xpath')
// 	  , dom = require('xmldom').DOMParser
// var xml = "<book><title xmlns='myns'>Harry Potter</title></book>"
//     var doc = new dom().parseFromString(xml)
//     var node = xpath.select("//*[local-name(.)='title' and namespace-uri(.)='myns']", doc)[0]
//     console.log(node.namespaceURI)
//     console.log(node.textContent)







	// works for real
// var xpath = require('xpath')
// 	  , dom = require('xmldom').DOMParser
// var xml = "<employee xmlns='sample-specification.xsd'><fst>Harry Potter</fst><snd>hogwards</snd></employee>"
//     var doc = new dom().parseFromString(xml)
//     var node = xpath.select("/*[local-name(.)='employee']/*[local-name(.)='snd']", doc)[0]
//     // console.log(node.namespaceURI)
//     console.log(node.textContent)

