import { Component, viewChild } from '@angular/core';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  startDate: string = '';
  endDate: string = '';
  searchForm!: FormGroup;
  submitted = false;
  users: any[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }


  // users = [
  //   {
  //     id: '1',
  //     fullName: 'minaemad',
  //     mobilePhone: '01125037505',
  //     birthDate: '01-05-2011',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  //   {
  //     id: '2',
  //     fullName: 'minaemad1',
  //     mobilePhone: '01325037505',
  //     birthDate: '23-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  //   {
  //     id: '3',
  //     fullName: 'minaemad2',
  //     mobilePhone: '01125037505',
  //     birthDate: '23-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  //   {
  //     id: '4',
  //     fullName: 'minaemad3',
  //     mobilePhone: '01125037405',
  //     birthDate: '23-6-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: true
  //       }
  //     ]
  //   },
  //   {
  //     id: '5',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  //   {
  //     id: '6',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: true
  //       }
  //     ]
  //   },
  //   {
  //     id: '7',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  //   {
  //     id: '8',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: true
  //       }
  //     ]
  //   },
  //   {
  //     id: '9',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: true
  //       }
  //     ]
  //   },
  //   {
  //     id: '10',
  //     fullName: 'minaemad4',
  //     mobilePhone: '01125037505',
  //     birthDate: '20-5-2001',
  //     records: [
  //       {
  //         date: "7-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "14-11-2025",
  //         isPresent: false
  //       },
  //       {
  //         date: "21-11-2025",
  //         isPresent: true
  //       },
  //       {
  //         date: "28-11-2025",
  //         isPresent: false
  //       }
  //     ]
  //   },
  // ]

  get f() {
    return this.searchForm.controls;
  }

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

  getUsers() {
    this.submitted = true;

    if (this.searchForm.invalid) {
      return;
    }

    this.users = [
      {
        id: '1',
        fullName: 'minaemad',
        mobilePhone: '01125037505',
        birthDate: '01-05-2011',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
      {
        id: '2',
        fullName: 'minaemad1',
        mobilePhone: '01325037505',
        birthDate: '23-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: false
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
      {
        id: '3',
        fullName: 'minaemad2',
        mobilePhone: '01125037505',
        birthDate: '23-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: false
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
      {
        id: '4',
        fullName: 'minaemad3',
        mobilePhone: '01125037405',
        birthDate: '23-6-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: true
          }
        ]
      },
      {
        id: '5',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: false
          },
          {
            date: "14-11-2025",
            isPresent: false
          },
          {
            date: "21-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
      {
        id: '6',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: true
          }
        ]
      },
      {
        id: '7',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: false
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: false
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
      {
        id: '8',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: true
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: true
          }
        ]
      },
      {
        id: '9',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: false
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: true
          }
        ]
      },
      {
        id: '10',
        fullName: 'minaemad4',
        mobilePhone: '01125037505',
        birthDate: '20-5-2001',
        records: [
          {
            date: "7-11-2025",
            isPresent: true
          },
          {
            date: "14-11-2025",
            isPresent: false
          },
          {
            date: "21-11-2025",
            isPresent: true
          },
          {
            date: "28-11-2025",
            isPresent: false
          }
        ]
      },
    ]

    this.totalElements = this.users.length;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  }
}
