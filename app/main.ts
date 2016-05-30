import { bootstrap }    from '@angular/platform-browser-dynamic';
//import { ROUTER_PROVIDERS } from '@angular/router';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthService } from './shared/auth.service';
import { appInjector } from'./shared/injector';

// Add all operators to Observable
//import 'rxjs/Rx';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [
	ROUTER_PROVIDERS, 
	HTTP_PROVIDERS, 
	AUTH_PROVIDERS,
]).then((appRef) => {
	appInjector(appRef.injector);
});
