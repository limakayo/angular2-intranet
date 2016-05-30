import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrdemService {

	private url = 'http://localhost:8000/api/ordens';

	constructor(private http: Http, private authHttp: AuthHttp) { }

	getOrdens() {
		return this.http.get(this.url)
			.map(this.extractData)
			.catch(this.handleError);
	}

	addOrdem(form: any) {
		let body = JSON.stringify({ form });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.authHttp.post(this.url, body, options)
						.map(this.extractData)
						.catch(this.handleError);
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body || {};
	}

	private handleError(error: any) {
		console.log(error.message);
		let errMsg = error.message || 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
