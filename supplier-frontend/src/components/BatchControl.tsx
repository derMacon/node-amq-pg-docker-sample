import { Specification } from '../model/Specification'

import React, { Component } from 'react';
import axios from 'axios';

const fetch = require('node-fetch');


type BatchControlProps = {};
type BatchControlState = {
	availableSpecs: Specification[],
	currSpec: Specification | undefined,
};

class BatchControl extends React.Component<BatchControlProps, BatchControlState> {

	constructor(props: BatchControlProps) {
        super(props);
		this.state = {
			availableSpecs: [],
			currSpec: undefined
		}

		this.fetchAvailableSpecs = this.fetchAvailableSpecs.bind(this);
		this.setCurrSpec = this.setCurrSpec.bind(this);
		this.renderAvailableSpecs = this.renderAvailableSpecs.bind(this);

		console.log("before");
		// axios.get("http://localhost:8284/greeting2", {}).then(resp => console.log(resp));

		fetch('http://localhost:8284/api/v1/get-specs')
			.then(this.transform)
			.then(this.fetchAvailableSpecs)
		console.log("after");

	}

	transform(e: any) {
		return e.text();
	}

	fetchAvailableSpecs(e:any) {
		let inputElems: Specification[] = JSON.parse(e);
		inputElems.forEach(elem => {
			this.setState( prevState => ({
				availableSpecs: [...prevState.availableSpecs, elem]
			}));
		})

		console.log("after updated state", this.state);
		this.setCurrSpec(this.state.availableSpecs[0])
	}

	setCurrSpec(curr: Specification) {
		this.setState({ currSpec: curr });
	}


	renderAvailableSpecs() {
		console.log("av 1sp: ", this.state.availableSpecs)
		return <div className="mb-3">
			<label htmlFor="xsdInput">XSD Input</label>
			<select className="form-select" id="xsdInput" aria-label="Default select example">
				{this.state.availableSpecs.map(elem => {
					return <option key={elem.specificationName}>{elem.specificationName}</option>
				})}
			</select>
		</div>
	}


	
    render() {
		console.log("state bef: ", this.state)
		let currXPath: string | undefined = this.state.currSpec?.xpath;
		let availableSpecsPane = this.renderAvailableSpecs();

        return (
			<div className="p-5">
				<form>
					<div>
						<div className="mb-3">
							<label htmlFor="xmlInput">XML Input</label>
							<select className="form-select" id="xmlInput" aria-label="Default select example">
								<option value="1" selected>Default Payment</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</select>
						</div>

						{availableSpecsPane}

						<div className="mb-3">
							<label htmlFor="xpath">xPath</label>
							<input type="text" className="form-control" id="xpath" value={currXPath} disabled/>
							{/* <input type="text" className="form-control" id="xpath" value={this.state.currSpec.xpath} disabled/> */}
						</div>

						<div className="mb-3">
							<label htmlFor="quantity">Quantity</label>
							<input type="text" className="form-control" id="quantity" value="1" required/>
						</div>

						<div className="mb-3">
							<label htmlFor="timespan">Timespan</label>
							<input type="text" className="form-control" id="timespan" value="0" required/>
						</div>
					</div>
					<button className="btn btn-primary" type="submit">Start Batch</button>
				</form>
            </div>
        );
    }
}

export default BatchControl;