import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
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
  user: any;

  form = {
    fullName: '',
    mobile: '',
    grade: '',
    birthDate: ''
  };

  constructor(private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.user = this.userService.getUser();

    console.log('User data:', this.user);
    console.log('Loaded user details for ID:', this.userId);

    if (!this.user) {
      // 1- navigate to users component again
      // this.router.navigate(['/users']);

      // 2- get the data from database
      // console.log('No user in state — fetch from API by ID:', userId);
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveChanges() {
    const body = {
      fullName: this.form.fullName,
      mobile: this.form.mobile,
      grade: this.form.grade,
      birthDate: this.form.birthDate
    };

    console.log("body: " + body.fullName);
    console.log("body: " + body.birthDate);
    console.log("body: " + body.grade);
    console.log("body: " + body.mobile);

    // this.http.post('https://your-api-url.com/api/update-user', body)
    //   .subscribe({
    //     next: res => console.log("Saved successfully", res),
    //     error: err => console.error("Error", err)
    //   });
  }
}
