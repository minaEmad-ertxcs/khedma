import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api-service';
import { UserService } from 'src/app/services/user-service';
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

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute, private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    console.log('Loaded user details for ID:', this.userId);

    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(11)]],
      grade: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      profileImage: [null]
    });

    this.apiService.getUserById(this.userId)
      .subscribe({
        next: res => {
          console.log("Get user successfully", res);

          this.user = res;
        },
        error: err => console.error("Error", err)
      });
  }

  get f() {
    return this.form.controls;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);

    this.form.patchValue({
      profileImage: this.selectedFile
    });

    this.form.get('profileImage')?.updateValueAndValidity();
  }

  saveChanges() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log("Body: " + JSON.stringify(this.form.value));

    const formData = new FormData();

    formData.append('fullName', this.form.value.fullName);
    formData.append('username', this.user.username);
    formData.append('mobileNumber', this.form.value.mobileNumber);
    formData.append('grade', this.form.value.grade);
    formData.append('birthDate', this.form.value.birthDate);

    if (this.selectedFile) {
      formData.append('profileImage', this.selectedFile);
    }

    console.log("FormData Values:");
    for (const [key, value] of formData as any) {
      console.log(key, value);
    }

    this.apiService.updateUser(formData)
      .subscribe({
        next: res => {
          console.log("Saved successfully", res);
        },
        error: err => console.error("Errors❤️", err)
      });
  }
}
