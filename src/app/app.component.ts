import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription = 'Advanced';
  account = {
    email: '',
    subscription: '',
    password: ''
  };

  onSubmit(form: NgForm) {
    this.account = {
      email: form.value.email,
      subscription: form.value.subscription,
      password: form.value.password
    };
  }
}
