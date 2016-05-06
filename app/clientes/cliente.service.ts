import { Injectable } 		from '@angular/core';
import { Http, Response } 	from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Cliente } 			from './cliente';
import { Observable }		from 'rxjs/Observable';

@Injectable()
export class ClienteService {
	
	constructor(private http: Http) {}

	private clientesUrl = 'app/clientes.json';

	getClientes() : Observable<Cliente[]> {
		return this.http.get(this.clientesUrl)
						.map(this.extractData)
						.catch(this.handleError);
	}

	private extractData(res: Response) {
		if (res.status < 200 || res.status >= 300) {
			throw new Error('Bad response status: ' + res.status);
		}
		let body = res.json();
		return body.data || {};
	}

	private handleError(error:any) {
		let errMsg = error.message || 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

}