
import { Component, viewChild } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api-service';
import { UtilityService } from 'src/app/services/utility-service';
import { BaseResponse } from 'src/app/model/BaseResponse';

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
      next: (response: BaseResponse) => {
        this.utilityService.print('Get Users successful:', response);

        this.users = response.data.content;
        this.isLoading = false;
      },
      error: (error) => {
        this.utilityService.print('Error:', JSON.stringify(error));
        this.isLoading = false;
      }
    });
  }

  get pagedUsers() {
    const start = (this.currentPage - 1) * this.pageLimit;
    return this.filteredUsers.slice(start, start + this.pageLimit);
  }

  get filteredUsers() {
    if (!this.searchTerm.trim())
      return this.users;

    this.utilityService.print("Search for ", this.searchTerm);

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
    this.utilityService.print("Go to page: ", this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onUpdate(user: any) {
    this.utilityService.print('Navigating to user details:', user);

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
    this.apiService.deleteUser(this.selectedUser.id).subscribe({
      next: (response: BaseResponse) => {
        this.utilityService.print('Delete user successfully:', response);
        this.utilityService.showAlert(response.message, 'success');

        this.users = this.users.filter(user => user.id !== this.selectedUser.id);
      },
      error: (error) => {
        this.utilityService.print('Error:', error);
        this.utilityService.showAlert(error.error.message, 'error');
      }
    });
  }

  createUser() {
    this.router.navigate(['/create-user']);
  }
}
