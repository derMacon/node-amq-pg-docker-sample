import { BenchmarkRequest } from '../model/BenchmarkRequest'
import React from 'react';
import axios from 'axios';

import NumericInput from 'react-numeric-input';


type BenchmarkControlProps = {};
type BenchmarkControlState = {
	benchRequest: BenchmarkRequest;
	paymentOptions: string[];
	pathOptions: string[];
};

class BenchmarkControl extends React.Component<BenchmarkControlProps, BenchmarkControlState> {

	private hostname: string = process.env.REACT_APP_API_HOSTNAME!;
	private port: string = process.env.REACT_APP_API_PORT!;
	private payment_endpoint: string = process.env.REACT_APP_API_ENDPOINT_FETCH_PAYMENT!;
	private path_endpoint: string = process.env.REACT_APP_API_ENDPOINT_FETCH_PATH!;
	private submit_endpoint: string = process.env.REACT_APP_API_ENDPOINT_SUBMIT!;


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
		this.handleXPathSelection = this.handleXPathSelection.bind(this);
		this.handlePaymentSelection = this.handlePaymentSelection.bind(this);
		this.handleTimespanInput = this.handleTimespanInput.bind(this);
		this.handleQuantityInput = this.handleQuantityInput.bind(this);
		this.renderDurationPane = this.renderDurationPane.bind(this);
		this.renderQuantityPane = this.renderQuantityPane.bind(this);
	}

	componentDidMount() {
       this.fetchPaymentOptions();
	   this.fetchPathOptions();
    }

    fetchPaymentOptions() {
       axios.get('http://' + this.hostname + ":" + this.port + this.payment_endpoint)
           .then(res => {
				res.data.forEach((elem: string) => {
					this.setState( prevState => ({
						paymentOptions: [...prevState.paymentOptions, elem]
					}));
				})
		   })
           .catch(err => {
               console.log(err);
               return null;
           });
    };

    fetchPathOptions() {
       axios.get('http://' + this.hostname + ":" + this.port + this.path_endpoint)
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


	// -------------- handler methods -------------- //

	handleXPathSelection(e: React.FormEvent<HTMLSelectElement>) {
		e.preventDefault();
		this.state.benchRequest.pathOption = e.currentTarget.value;
	}

	handlePaymentSelection(e: React.FormEvent<HTMLSelectElement>) {
		e.preventDefault();
		this.state.benchRequest.paymentOption = e.currentTarget.value;
	}

	handleQuantityInput(value: number | null, stringValue: string, input: HTMLInputElement) {
		let benchRequestCopy = Object.assign({}, this.state.benchRequest);
		benchRequestCopy.messageCnt = +value!;
		this.setState({
			benchRequest: benchRequestCopy
		});
	}

	handleTimespanInput(value: number | null, stringValue: string, input: HTMLInputElement) {
		let benchRequestCopy = Object.assign({}, this.state.benchRequest);
		benchRequestCopy.duration = +value!;
		this.setState({
			benchRequest: benchRequestCopy
		});
	}

	renderSelection(labelTxt: string, lst: string[], changeHandler: (e: React.FormEvent<HTMLSelectElement>) => void):React.ReactNode {
		return <div className="mb-3">
			<label htmlFor={labelTxt}>{labelTxt}</label>
			<select className="form-select" id={labelTxt} aria-label="Default select example" onChange={changeHandler}>
				{lst.map(elem=> {
					return <option key={elem}>{elem}</option>
				})}
			</select>
		</div>
	}

	handleSubmit(event: any) {
		event.preventDefault();
		console.log("submit event: ", event)

		let json: string = JSON.stringify(this.state.benchRequest!);
		console.log("out json: ", json);
		console.log("out obj: ", this.state.benchRequest);
		axios.post('http://' + this.hostname + ":" + this.port + this.submit_endpoint, this.state.benchRequest)
		  .then(function (response) {
			console.log(response);
		  })
	}


	// -------------- render helper methods -------------- //

	renderXPath() {
		if (this.state.pathOptions.length > 0) {
			let fstElem: string = this.state.pathOptions[0]
			this.state.benchRequest.pathOption = fstElem;
		}
		return this.renderSelection('xpath', this.state.pathOptions, this.handleXPathSelection);
	}

	renderPaymentPane() {
		if (this.state.paymentOptions.length > 0) {
			let fstElem: string = this.state.paymentOptions[0]
			this.state.benchRequest.paymentOption = fstElem;
		}
		return this.renderSelection('payment', this.state.paymentOptions, this.handlePaymentSelection);
	}

	renderQuantityPane(): React.ReactNode {
		return <div className="mb-3">
			<label htmlFor="quantity">Quantity</label>
			<NumericInput className="form-control" value={this.state.benchRequest.messageCnt} onChange={this.handleQuantityInput}/>
		</div>
	}

	renderDurationPane(): React.ReactNode {
		return <div className="mb-3">
			<label htmlFor="timespan">Timespan</label>
			<NumericInput className="form-control" value={this.state.benchRequest.duration} onChange={this.handleTimespanInput}/>
		</div>
	}

	
    render() {

		let xPathPane: React.ReactNode = this.renderXPath();
		let paymentPane: React.ReactNode = this.renderPaymentPane();
		let quantityPane: React.ReactNode = this.renderQuantityPane();
		let durationPane: React.ReactNode = this.renderDurationPane();

        return (
			<div className="p-5">
				<form onSubmit={this.handleSubmit}>
					<div>
						{xPathPane}
						{paymentPane}
						{quantityPane}
						{durationPane}
					</div>
					<button className="btn btn-primary" type="submit">Start Batch</button>
				</form>
            </div>
        );
    }
}

export default BenchmarkControl;