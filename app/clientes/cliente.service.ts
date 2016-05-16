import { Injectable } 		from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Cliente } 			from './cliente';
import { Observable }		from 'rxjs/Observable';

@Injectable()
export class ClienteService {
	private clientesUrl = 'http://localhost:8000/clientes';

	constructor(private _http: Http) {}

	getClientes() {
		return this._http.get(this.clientesUrl)
						 .map(this.extractData)
						 .catch(this.handleError);
	}

	addCliente (nome: string) {
		let body = JSON.stringify({ nome });
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this._http.post(this.clientesUrl, body, options)
						.map(this.extractData)
						.catch(this.handleError);
	}

	getCliente (id: number) {
		return this._http.get(this.clientesUrl + '/' + id)
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

	private handleError(error:any) {
		let errMsg = error.message || 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}
