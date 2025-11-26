
import { Component, viewChild } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service';
import { UtilityService } from 'src/app/services/utility-service';

@Component({
  selector: 'app-users',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  // configs
  currentPage: number = 1;
  pageLimit: number = 5;
  isModalOpen = false;
  selectedUser: any;
  isLoading = false;

  // vars
  pages: any;
  searchTerm = '';
  totalElements: number = 0;
  users: any[] = [];

  constructor(public utilityService: UtilityService, private apiService: ApiService, private http: HttpClient, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.getUsers();
  }

  getUsers() {
    const args = {
      page: 0,
      size: 5
    }

    this.apiService.getUsers(args).subscribe({
      next: (response: any) => {
        console.log('Get Users successful:', response);

        this.users = response.content;
      },
      error: (error) => {
        console.error('Login failed:', error);

      }
    });

    this.isLoading = false;
  }

  cards = [
    {
      background: 'bg-c-blue',
      title: 'Orders Received',
      icon: 'icon-shopping-cart',
      text: 'Completed Orders',
      number: '486',
      no: '351'
    },
    {
      background: 'bg-c-green',
      title: 'Total Sales',
      icon: 'icon-tag',
      text: 'This Month',
      number: '1641',
      no: '213'
    },
    {
      background: 'bg-c-yellow',
      title: 'Revenue',
      icon: 'icon-repeat',
      text: 'This Month',
      number: '$42,56',
      no: '$5,032'
    },
    {
      background: 'bg-c-red',
      title: 'Total Profit',
      icon: 'icon-shopping-cart',
      text: 'This Month',
      number: '$9,562',
      no: '$542'
    }
  ];

  images = [
    {
      src: 'assets/images/gallery-grid/img-grd-gal-1.jpg',
      title: 'Old Scooter',
      size: 'PNG-100KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-2.jpg',
      title: 'Wall Art',
      size: 'PNG-150KB'
    },
    {
      src: 'assets/images/gallery-grid/img-grd-gal-3.jpg',
      title: 'Microphone',
      size: 'PNG-150KB'
    }
  ];

  get pagedUsers() {
    const start = (this.currentPage - 1) * this.pageLimit;
    return this.filteredUsers.slice(start, start + this.pageLimit);
  }

  get filteredUsers() {
    if (!this.searchTerm.trim())
      return this.users;

    console.log("Search for " + this.searchTerm);

    return this.users.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredUsers.length / this.pageLimit);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    console.log("Go to page: " + this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onUpdate(user: any) {
    console.log('Navigating to user details:', user);

    this.userService.setUser(user);

    this.router.navigate(['/user-details', user.id]);
  }

  onDelete(user: any) {
    this.selectedUser = user;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmDelete() {
    this.isModalOpen = false;
    alert('Item deleted successfully!');
  }
}
