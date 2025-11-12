
import { Component, viewChild } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-users',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  // configs
  currentPage: number = 1;
  pageLimit: number = 3;

  // vars
  pages: any;
  searchTerm = '';
  totalElements: number = 0;

  constructor(private router: Router, private userService: UserService) {
    this.totalElements = this.users.length;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    console.log("totalPages: " + this.totalPages);
  }

  users = [
    {
      id: '1',
      fullName: 'minaemad',
      mobilePhone: '01125037505',
      birthDate: '01-05-2011',
      isAttended: false
    },
    {
      id: '2',
      fullName: 'minaemad1',
      mobilePhone: '01325037505',
      birthDate: '23-5-2001',
      isAttended: true
    },
    {
      id: '3',
      fullName: 'minaemad2',
      mobilePhone: '01125037505',
      birthDate: '23-5-2001',
      isAttended: false
    },
    {
      id: '4',
      fullName: 'minaemad3',
      mobilePhone: '01125037405',
      birthDate: '23-6-2001',
      isAttended: true
    },
    {
      id: '5',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: true
    },
    {
      id: '6',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: false
    },
    {
      id: '7',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: true
    },
    {
      id: '8',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: false
    },
    {
      id: '9',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: false
    },
    {
      id: '10',
      fullName: 'minaemad4',
      mobilePhone: '01125037505',
      birthDate: '20-5-2001',
      isAttended: true
    },
  ]

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
    const confirmDelete = confirm(`Are you sure you want to delete ${user.fullName}?`);

    if (confirmDelete) {
      console.log('Deleted user:', user);
      // Add your delete logic here

      // this.users = this.users.filter(u => u.id !== user.id);
    }
  }
}
