import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.usernamesValidator.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
      // news: new FormControl('newssss')
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control);
  }

  getHobbyControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  usernamesValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.includes(control.value)) {
      return { forbiddenUsername: true };
    }
    // return null; OPTIONAL
  }
}
