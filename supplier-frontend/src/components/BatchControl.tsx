import { Specification } from '../model/Specification'
import { PaymentInput } from '../model/PaymentInput'

import React, { Component } from 'react';
import axios from 'axios';

const fetch = require('node-fetch');


type BatchControlProps = {};
type BatchControlState = {
	availableSpecs: Specification[],
	availablePayments: PaymentInput[],
	currSpec: Specification | undefined,
};

class BatchControl extends React.Component<BatchControlProps, BatchControlState> {

	constructor(props: BatchControlProps) {
        super(props);
		this.state = {
			availableSpecs: [],
			availablePayments: [],
			currSpec: undefined
		}

		this.fetchAvailableSpecs = this.fetchAvailableSpecs.bind(this);
		this.setCurrSpec = this.setCurrSpec.bind(this);
		this.renderAvailableSpecs = this.renderAvailableSpecs.bind(this);
		this.fetchAvailablePayments = this.fetchAvailablePayments.bind(this);
		this.renderXPath = this.renderXPath.bind(this);

		console.log("before");
		// axios.get("http://localhost:8284/greeting2", {}).then(resp => console.log(resp));

		fetch('http://localhost:8284/api/v1/get-specs')
			.then(this.transform)
			.then(this.fetchAvailableSpecs)

		fetch('http://localhost:8284/api/v1/get-payments')
			.then(this.transform)
			.then(this.fetchAvailablePayments)

		console.log("after");

	}

	transform(e: any) {
		return e.text();
	}

	fetchAvailableSpecs(e: any) {
		let inputElems: Specification[] = JSON.parse(e);
		inputElems.forEach(elem => {
			this.setState( prevState => ({
				availableSpecs: [...prevState.availableSpecs, elem]
			}));
		})

		this.setCurrSpec(this.state.availableSpecs[0])
	}

	// todo maybe integrate it directly in calling method?? dont know if its necessary for later (callback handlers...)
	setCurrSpec(curr: Specification) {
		this.setState({ currSpec: curr });
	}

	fetchAvailablePayments(e: any) {
		console.log("works: ", e);

		let inputElems: PaymentInput[] = JSON.parse(e);
		inputElems.forEach(elem => {
			this.setState( prevState => ({
				availablePayments: [...prevState.availablePayments, elem]
			}));
		})

	}





	renderAvailablePayments() {
		return <div className="mb-3">
			<label htmlFor="xsdInput">XML Input</label>
			<select className="form-select" id="xsdInput" aria-label="Default select example">
				{this.state.availablePayments.map(elem => {
					return <option key={elem.paymentName}>{elem.paymentName}</option>
				})}
			</select>
		</div>
	}



	renderAvailableSpecs() {
		return <div className="mb-3">
			<label htmlFor="xsdInput">XSD Input</label>
			<select className="form-select" id="xsdInput" aria-label="Default select example">
				{this.state.availableSpecs.map(elem => {
					return <option key={elem.specificationName}>{elem.specificationName}</option>
				})}
			</select>
		</div>
	}

	renderXPath() {
		let currXPath: string | undefined = this.state.currSpec?.xpath;
		return <div className="mb-3">
					<label htmlFor="xpath">xPath</label>
					<input type="text" className="form-control" id="xpath" value={currXPath} disabled/>
				</div>
	}


	handleSubmit(event: any) {
		event.preventDefault();
		console.log("submit event: ", event)
	}

	
    render() {
		console.log("state bef: ", this.state)
		let availablePaymentsPane = this.renderAvailablePayments();
		let availableSpecsPane = this.renderAvailableSpecs();
		let xPathPane = this.renderXPath();

        return (
			<div className="p-5">
				<form onSubmit={this.handleSubmit}>
					<div>
						{availablePaymentsPane}
						{availableSpecsPane}
						{xPathPane}

						

						<div className="mb-3">
							<label htmlFor="quantity">Quantity</label>
							<input type="text" className="form-control" id="quantity" value="1" required/>
						</div>

						<div className="mb-3">
							<label htmlFor="timespan">Timespan</label>
							<input type="text" className="form-control" id="timespan" value="0" required/>
						</div>
					</div>
					{/* <input className="btn btn-primary" type="submit"/> */}
					<button className="btn btn-primary" type="submit">Start Batch</button>
				</form>
            </div>
        );
    }
}

export default BatchControl;