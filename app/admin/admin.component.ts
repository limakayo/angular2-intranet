import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router, CanActivate, OnActivate } from '@angular/router-deprecated';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  moduleId: module.id,
  selector: 'intranet-admin',
  template: `
    <h2>Admin</h2>
    <p>This is an admin area.</p>
  `,
  providers: [ AuthService ]
})

@CanActivate(() => tokenNotExpired())

export class AdminComponent implements OnInit, OnActivate {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    //console.log( this.auth.user['roles'][0] );
  }

  routerOnActivate() {
    //console.log(this.auth.isAdmin())
    //if (!this.auth.isAdmin())
      //this.router.navigate(['Home']);
    
    console.log( "is admin? : " + this.auth.isAdmin() );
  }
}
