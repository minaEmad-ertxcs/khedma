import { Component } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/services/utility-service';
import { ApiService } from 'src/app/services/api-service';

@Component({
  selector: 'app-take-attendance',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './take-attendance.html',
  styleUrl: './take-attendance.scss'
})
export class TakeAttendance {
  // configs
  currentPage: number = 1;
  pageLimit: number = 5;
  isLoading = false;

  // vars
  pages: any;
  searchTerm = '';
  totalElements: number = 0;
  changes: any[] = [];

  startDate: string = '';
  endDate: string = '';
  searchForm!: FormGroup;
  submitted = false;
  users: any[] = [];
  totalPages: any;

  constructor(private fb: FormBuilder, public utilityService: UtilityService, private apiService: ApiService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  getAttendanceByRanges() {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    const args = {
      page: this.currentPage - 1,
      size: this.pageLimit
    }

    const body = {
      startDate: this.searchForm.get('startDate')?.value,
      endDate: this.searchForm.get('endDate')?.value
    }

    this.utilityService.print("", body)

    this.apiService.getAttendanceByRange(body, args).subscribe({
      next: (response: any) => {
        this.utilityService.print('Get attendance successfully:', response);

        const pageData = response.data;

        this.users = pageData.content;
        this.totalPages = pageData.totalPages;
        this.totalElements = pageData.totalElements;

        this.pages = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
      },
      error: (error) => {
        this.utilityService.print('Somthing went wrong:', error);
      }
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  get pagedUsers() {
    return this.users;
  }

  // get filteredUsers() {
  //   if (!this.searchTerm.trim())
  //     return this.users;

  //   this.utilityService.print("Search for ", this.searchTerm);

  //   return this.users.filter(user =>
  //     user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  // get totalPages() {
  //   return Math.ceil(this.filteredUsers.length / this.pageLimit);
  // }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAttendanceByRanges();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.utilityService.print("Go to page: " + this.currentPage);
    this.getAttendanceByRanges();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAttendanceByRanges();
    }
  }

  onRecordChange(userId: number, record: any) {
    const existing = this.changes.find(item => item.userId === userId && item.date === record.date);

    if (existing) {
      existing.present = record.isPresent;
    } else {
      this.changes.push({
        userId: userId,
        date: record.date,
        present: record.isPresent
      });
    }
  }

  submitAttendance() {
    const body = {
      attendanceRecords: this.changes
    };

    this.utilityService.print("Final records to submit: ", body);

    this.apiService.takeAttendance(this.changes).subscribe({
      next: (response: any) => {
        this.utilityService.print('Save attendance successfully:', response);

        this.utilityService.showAlert(response.message, 'success');

        this.changes = [];
      },
      error: (error) => {
        this.utilityService.print('Login failed:', error);
        this.utilityService.showAlert('Something went wrong: ' + JSON.stringify(error), 'error');
      }
    });
  }
}
