import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api-service';
import { UtilityService } from 'src/app/services/utility-service';
import { BaseResponse } from 'src/app/model/BaseResponse';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  providers: [UtilityService],
  imports: [SharedModule, RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginForm!: FormGroup;
  submitted = false;
  isLoading: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder, public utilityService: UtilityService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.utilityService.print('Form submitted:', this.loginForm.value);

    const body = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.apiService.login(body).subscribe({
      next: (response: BaseResponse) => {
        this.utilityService.print('Login successful:', response);

        localStorage.setItem('token', response.data.access_token);
        this.router.navigate(['/analytics']);
        this.isLoading = false;
      },
      error: (error) => {
        this.utilityService.print('Login failed:', error.error);
        this.utilityService.showAlert(error.error.message, 'error');
        this.isLoading = false;
      }
    });
  }
}