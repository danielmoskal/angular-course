import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultQuestion = 'teacher';
  reply: string;
  genders = ['male', 'female'];
  defaultGender = 'female';
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'teacher',
    //   replyTextarea: '',
    //   gender: 'male'
    // });
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // onSubmit(form: HTMLFormElement) {
  //   console.log(form);
  // }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);
    // console.log(`is valid: ${this.form.valid}`);
    this.user = {
      username: this.form.value.userData.username,
      email: this.form.value.userData.email,
      secretQuestion: this.form.value.secret,
      answer: this.form.value.replyTextarea,
      gender: this.form.value.gender
    };

    this.form.reset({
      userData: {
        username: 'nameAfterReset'
      },
      gender: 'male'
    });
  }
}
