import { bootstrap }    from '@angular/platform-browser-dynamic';
//import { ROUTER_PROVIDERS } from '@angular/router';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

// Add all operators to Observable
import 'rxjs/Rx';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, AUTH_PROVIDERS]);
