import React, { Component } from 'react';

type BatchControlProps = {};
type BatchControlState = {};

class BatchControl extends React.Component<BatchControlProps, BatchControlState> {

	constructor(props: BatchControlProps) {
        super(props);
	}
	
    render() {
        return (
			<div className="p-5">
				{/* <form className="form-inline">
				<div className="form-group mb-2">
					<label htmlFor="staticEmail2" className="sr-only">Email</label>
					<input type="text" className="form-control-plaintext" id="staticEmail2" value="email@example.com"/>
				</div>
				<div className="form-group mx-sm-3 mb-2">
					<label htmlFor="inputPassword2" className="sr-only">Password</label>
					<input type="password" className="form-control" id="inputPassword2" placeholder="Password"/>
				</div>
				<button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
				</form> */}

				{/* <div className="d-inline-flex flex-row">
					<label className="p-2 p-2 col-form-label" htmlFor="xmlChoice">Email</label>
					<input className="p-2 form-control" type="text"  id="xmlChoice"/>
					<input className="p-2 custom-file-input" type="file" id="customFile"/>
				</div> */}

				<form>
					<div className="form-row">
						<div className="col-md-2 mb-3">
						<label htmlFor="xmlInput">XML Input</label>
						<select className="form-select" id="xmlInput" aria-label="Default select example">
							<option value="1" selected>default payment</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						</div>
						<div className="col-md-2 mb-3">
						<label htmlFor="xsdInput">XML Input</label>
						<select className="form-select" id="xsdInput" aria-label="Default select example">
							<option value="1" selected>default specification</option>
							<option value="2">Two</option>
							<option value="3">Three</option>
						</select>
						</div>

						<div className="col-md-2 mb-3">
						<label htmlFor="quantity">quantity</label>
						<input type="text" className="form-control" id="quantity" value="1" required/>
						</div>

						<div className="col-md-2 mb-3">
						<label htmlFor="timespan">timespan</label>
						<input type="text" className="form-control" id="timespan" value="0" required/>
						</div>
					</div>
					<button className="btn btn-primary" type="submit">Submit form</button>
				</form>
            </div>
        );
    }
}

export default BatchControl;