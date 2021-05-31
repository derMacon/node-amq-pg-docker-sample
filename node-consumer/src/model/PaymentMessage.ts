import { Payment } from './Payment';

// src: https://stackoverflow.com/questions/34031448/typescript-typeerror-myclass-myfunction-is-not-a-function
export class PaymentMessage implements Payment {

	constructor(private initData: Payment) {}

	get specificationName(): string {
		 return this.initData.specificationName; 
	}

	get content(): string {
		 return this.initData.content;
	};

	get sentTimestamp(): Date {
		return this.initData.sentTimestamp
	}

}