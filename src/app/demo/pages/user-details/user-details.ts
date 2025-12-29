import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api-service';
import { UserService } from 'src/app/services/user-service';
import { UtilityService } from 'src/app/services/utility-service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-details',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss'
})
export class UserDetails implements OnInit {
  previewImage: string = 'assets/images/user/avatar-4.jpg';
  userId: string | null = null;
  selectedFile: File | null = null;
  user: any;
  form!: FormGroup;
  submitted = false;
  isLoading = false;

  constructor(public utilityService: UtilityService, private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userId = this.route.snapshot.paramMap.get('id');

    this.utilityService.print('Loaded user details for ID:', this.userId);

    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(11)]],
      grade: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      profileImage: [null]
    });

    this.getUserById(this.userId);
  }

  getUserById(userId: any) {
    this.apiService.getUserById(userId)
      .subscribe({
        next: res => {
          this.utilityService.print("Get user successfully", res);
          this.user = res.data;
          this.isLoading = false;

          this.getImageUserByUsername(this.user.username);
        },
        error: err => console.error("Error", err)
      });
  }

  getImageUserByUsername(username: string) {
    this.apiService.getUserImageByUsername(username).subscribe({
      next: (blob: Blob) => {
        this.previewImage = URL.createObjectURL(blob);
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.selectedFile = file;

    this.previewImage = URL.createObjectURL(file);
  }

  saveChanges() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.utilityService.print("Body: " + JSON.stringify(this.form.value));

    this.utilityService.print("the user", this.user);

    const formData = new FormData();

    formData.append("user", new Blob([JSON.stringify({
      username: this.user.username,
      fullName: this.form.value.fullName,
      mobileNumber: this.form.value.mobileNumber,
      grade: this.form.value.grade,
      birthDate: this.form.value.birthDate
    })], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.apiService.updateUser(formData)
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
