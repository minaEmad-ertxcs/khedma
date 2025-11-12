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
  userId: string | null = null;
  user: any;

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
}
