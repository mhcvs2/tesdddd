import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div>
      <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
        <fieldset ngModelGroup="login">
          <input type="text"
                 name="username"
                 [(ngModel)]="username"
                 #usernameRef="ngModel"
                 required
                 minlength="3"
          />
          <!--{{usernameRef.errors|json}}-->
          <div *ngIf="usernameRef.errors?.required">this is required</div>
          <div *ngIf="usernameRef.errors?.minlength">should be at least 3 charactors</div>
          <input required type="password"
                 name="password"
                 [(ngModel)]="password"
                 #passwordRef="ngModel"
          />
          <!--{{passwordRef.valid}}-->
          <div *ngIf="passwordRef.errors?.required">this is required</div>
          <!--<button (click)="onClick()">Login</button>-->
          <button type="submit">Login</button>
        </fieldset>
      </form>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(@Inject('auth') private service) { }

  ngOnInit() {
  }

  // onClick() {
  //   console.log('auth result is:' + this.service.loginWithCredentials(this.username, this.password));
  // }

  onSubmit(formvalue){
    console.log('auth result is:' + this.service.loginWithCredentials(formvalue.login.username, formvalue.login.password));
  }

}
