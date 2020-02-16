import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  projectFormSubmitted = false;

  projectData: {
    projectName: string,
    email: string,
    status: string
  };

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.projectNameValidator]),
      email: new FormControl(null, [Validators.required, Validators.email], this.emailAsyncValidator),
      status: new FormControl('Stable')
    });
  }

  onSubmit() {
    console.log(this.projectForm);
    this.projectData = {
      projectName: this.projectForm.value.projectName,
      email: this.projectForm.value.email,
      status: this.projectForm.value.status
    };
    this.projectFormSubmitted = true;
  }

  projectNameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { invalidProjectName: true };
    }
    return null;
  }

  emailAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ forbiddenEmail: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
