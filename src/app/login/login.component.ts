import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fixed 'styleUrl' to 'styleUrls'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPasswordField: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Initialize the login form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Handle login submission
  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      // Call loginUser method from the service
      this.loginService.loginUser(email, password).subscribe(user => {
        if (user) {
          alert('Login successful');
          this.loginForm.reset();  
          this.router.navigate(['studentDashboard']);  
        } else {
          alert('Invalid credentials, user not found');
        }
      }, error => {
        console.error('Error during login:', error);
        alert('Something went wrong. Please try again later.');
      });
    } else {
      alert('Please enter valid email and password');
    }
  }

  onEmailInput(): void {
    // Show the password field only when there is input in the email field
    const emailControl = this.loginForm.get('email');
    if (emailControl && emailControl.value) {
      this.showPasswordField = true;  // Show the password field when email has value
    } else {
      this.showPasswordField = false; // Hide the password field if email is cleared
    }
  }
  onClear(): void {
    this.loginForm.reset();
    this.showPasswordField = false; // Reset the form and hide the password field
  }
}
