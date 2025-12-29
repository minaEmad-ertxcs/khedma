import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api-service';
import { UtilityService } from 'src/app/services/utility-service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { passwordMatchValidator } from '../../validation/password-match.validator';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './create-user.html',
  styleUrl: './create-user.scss'
})

export class CreateUser {
  previewImage: string = 'assets/images/user/avatar-4.jpg';
  selectedFile: File | null = null;
  form!: FormGroup;
  submitted = false;
  isLoading = false;

  isUser: boolean = false;

  constructor(public utilityService: UtilityService, private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService) { }


  ngOnInit() {
    this.form = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        mobileNumber: ['', [Validators.required, Validators.minLength(11)]],
        grade: [''],
        birthDate: ['', Validators.required],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        profileImage: [null],
      },
      {
        validators: passwordMatchValidator,
      }
    );


    this.form.get('role')?.valueChanges.subscribe(role => {
      this.isUser = role === 'User';

      const gradeControl = this.form.get('grade');

      if (this.isUser) {
        gradeControl?.setValidators([Validators.required]);
      } else {
        gradeControl?.clearValidators();
      }

      gradeControl?.updateValueAndValidity();
    });
  }


  get f() {
    return this.form.controls;
  }

  onRoleChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.isUser = value === 'User';
  }

  onCreateUser() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const body = {
      fullName: this.form.value.fullName,
      username: this.form.value.username,
      mobileNumber: this.form.value.mobileNumber,
      birthDate: this.form.value.birthDate,
      grade: this.form.value.grade,
      role: this.form.value.role,
      password: this.form.value.password
    }

    this.apiService.createUser(body)
      .subscribe({
        next: res => {
          this.utilityService.print("Saved successfully", res);
          this.utilityService.showAlert(res.message, "success");
        },
        error: err => {
          this.utilityService.print("Errors", err);
          this.utilityService.showAlert(err.error.message, "error");
        }
      });
  }
}
