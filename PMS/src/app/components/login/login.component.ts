import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm! : FormGroup
  successMessage: string = '';
  errorMessage: string = '';

  constructor( private fb:FormBuilder, private router:Router, private authService:AuthService) {

    this.loginForm = this.fb.group({
      // name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {}

  loginUser(){
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (loginResponse) => {

          if (loginResponse.token) {
            localStorage.setItem('authToken', loginResponse.token);
            this.authService.readToken(
              (tokenResponse) => {

                if (tokenResponse.info.role === 'admin') {
                  this.successMessage = 'Login successful. Redirecting to admin...';
                  setTimeout(() => this.router.navigate(['admin']), 2000);
                } else if (tokenResponse.info.role === 'user') {
                  this.successMessage = 'Login successful. Redirecting to user dashboard...';
                  setTimeout(() => this.router.navigate(['users']), 2000);

                }
              },
              (error) => {
                console.error("Error fetching user details with token", error);
                this.errorMessage = 'Error fetching user details. Please try again.';
              }
            );
          }
        },
        error: (error) => {
          console.error("Login failed", error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        }
      });
    } else {
      console.error("Form is invalid");
    }
  }




}
