export class BenchmarkRequest {

	constructor(
		private _xpath: string,
		private _paymentType: boolean,
		private _messageCnt: number,
		private _duration: number
	) {}

	xpath(): string {
		return this._xpath;
	}

	paymentType(): boolean {
		return this._paymentType;
	}

	messageCnt(): number {
		return this._messageCnt;
	}

	duration(): number {
		return this._duration;
	}

}