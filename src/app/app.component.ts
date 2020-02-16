import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

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
        email: new FormControl(null, [Validators.required, Validators.email], this.emailsAsyncValidator),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
      // news: new FormControl('newssss')
    });

    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.setValue({
      userData: {
        username: 'Daniel',
        email: 'daniel@test.com',
      },
      gender: 'male',
      hobbies: []
    });

    this.signupForm.patchValue({
      userData: {
        username: 'Daniel22'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      gender: 'female'
    });
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

  emailsAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com'){
          resolve({ forbiddenEmail: true });
        }
        resolve(null);
      }, 3000);
    });
    return promise;
  }
}
