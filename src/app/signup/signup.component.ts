import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService,private router : Router) {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.signupService.addUser(formData).subscribe(response => {
        console.log('Data saved:', response);
        alert("user details completed successfully");
        this.signupForm.reset();
        this.router.navigate(['login']) ;
      });
    } else {
      console.log('Form is invalid');
    }
   

  }

  onClear() {
    this.signupForm.reset();
  }
}
