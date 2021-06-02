
import { BenchmarkRequest } from '../model/BenchmarkRequest'

import React, { Component } from 'react';
import axios from 'axios';

const fetch = require('node-fetch');


type BenchmarkControlProps = {};
type BenchmarkControlState = {
	benchRequest: BenchmarkRequest;
	paymentOptions: string[];
	pathOptions: string[];
};

class BenchmarkControl extends React.Component<BenchmarkControlProps, BenchmarkControlState> {

	constructor(props: BenchmarkControlProps) {
        super(props);
		this.state = {
			benchRequest: new BenchmarkRequest(),
			paymentOptions: [],
			pathOptions: []
		}

		this.renderXPath = this.renderXPath.bind(this);
		this.fetchPaymentOptions = this.fetchPaymentOptions.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
       this.fetchPaymentOptions();
	   this.fetchPathOptions();
    }

    fetchPaymentOptions() {
       axios.get("http://localhost:8284/api/v1/options/payment")
           .then(res => {
				res.data.forEach((elem: string) => {
					// console.log("before fetch: ", this.state)
					this.setState( prevState => ({
						paymentOptions: [...prevState.paymentOptions, elem]
					}));
					// console.log("after fetch: ", this.state)
				})
		   })
           .catch(err => {
               console.log(err);
               return null;
           });
    };

    fetchPathOptions() {
       axios.get("http://localhost:8284/api/v1/options/path")
           .then(res => {
				res.data.forEach((elem: string) => {
					this.setState( prevState => ({
						pathOptions: [...prevState.pathOptions, elem]
					}));
				})
		   })
           .catch(err => {
               console.log(err);
               return null;
           });
    };




	renderSelection(labelTxt: string, lst: string[]):React.ReactNode {
		return <div className="mb-3">
			<label htmlFor="xsdInput">XSD Input</label>
			<select className="form-select" id="xsdInput" aria-label="Default select example">
				{lst.map(elem=> {
					return <option key={elem}>{elem}</option>
				})}
			</select>
		</div>
	}

	renderXPath() {
		if (this.state.pathOptions.length > 0) {
			let fstElem: string = this.state.pathOptions[0]
			this.state.benchRequest.pathOption = fstElem;
		}
		return this.renderSelection('xpath', this.state.pathOptions);
	}

	renderPaymentPane() {
		if (this.state.paymentOptions.length > 0) {
			let fstElem: string = this.state.paymentOptions[0]
			this.state.benchRequest.paymentOption = fstElem;
		}
		return this.renderSelection('payment', this.state.paymentOptions);
	}

	transform(e: any) {
		return e.text();
	}

	fetchAvailableSpecs(e: any) {
		console.log(e)
	}




	handleSubmit(event: any) {
		event.preventDefault();
		console.log("submit event: ", event)

		// fetch('http://localhost:8284/api/v1/get-specs')

		let json: string = JSON.stringify(this.state.benchRequest!);
		console.log("out json: ", json);
		console.log("out obj: ", this.state.benchRequest);
		axios.post('http://localhost:8284/api/v1/benchmark/start', this.state.benchRequest)
		  .then(function (response) {
			console.log(response);
		  })
	}

	
    render() {
		let xPathPane: React.ReactNode = this.renderXPath();
		let paymentPane: React.ReactNode = this.renderPaymentPane();
		console.log("hier")

        return (
			<div className="p-5">
				<form onSubmit={this.handleSubmit}>
					<div>
						{xPathPane}
						{paymentPane}

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

export default BenchmarkControl;