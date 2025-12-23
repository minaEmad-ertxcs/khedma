
import { Component, viewChild } from '@angular/core';


import { SharedModule } from 'src/app/theme/shared/shared.module';

import { ApexOptions, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { ApiService } from 'src/app/services/api-service';
import { BaseResponse } from 'src/app/model/BaseResponse';
import { UtilityService } from 'src/app/services/utility-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-analytics',
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent {

  chart = viewChild<ChartComponent>('chart');
  customerChart = viewChild<ChartComponent>('customerChart');
  chartOptions!: Partial<ApexOptions>;
  userChart!: Partial<ApexOptions>;
  adminChart!: Partial<ApexOptions>;
  chartOptions_3!: Partial<ApexOptions>;

  details: any = null;

  constructor(private apiService: ApiService, public utilityService: UtilityService, private router: Router) {
    // this.chartOptions = {
    //   chart: {
    //     height: 205,
    //     type: 'line',
    //     toolbar: {
    //       show: false
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     width: 2,
    //     curve: 'smooth'
    //   },
    //   series: [
    //     {
    //       name: 'Arts',
    //       data: [20, 50, 30, 60, 30, 50]
    //     },
    //     {
    //       name: 'Commerce',
    //       data: [60, 30, 65, 45, 67, 35]
    //     }
    //   ],
    //   legend: {
    //     position: 'top'
    //   },
    //   xaxis: {
    //     type: 'datetime',
    //     categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000'],
    //     axisBorder: {
    //       show: false
    //     }
    //   },
    //   yaxis: {
    //     show: true,
    //     min: 10,
    //     max: 70
    //   },
    //   colors: ['#73b4ff', '#59e0c5'],
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shade: 'light',
    //       gradientToColors: ['#4099ff', '#2ed8b6'],
    //       shadeIntensity: 0.5,
    //       type: 'horizontal',
    //       opacityFrom: 1,
    //       opacityTo: 1,
    //       stops: [0, 100]
    //     }
    //   },
    //   grid: {
    //     borderColor: '#cccccc3b'
    //   }
    // };

    // this.chartOptions_3 = {
    //   chart: {
    //     type: 'area',
    //     height: 145,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   colors: ['#ff5370'],
    //   fill: {
    //     type: 'gradient',
    //     gradient: {
    //       shade: 'dark',
    //       gradientToColors: ['#ff869a'],
    //       shadeIntensity: 1,
    //       type: 'horizontal',
    //       opacityFrom: 1,
    //       opacityTo: 0.8,
    //       stops: [0, 100, 100, 100]
    //     }
    //   },
    //   stroke: {
    //     curve: 'smooth',
    //     width: 2
    //   },
    //   series: [
    //     {
    //       data: [45, 35, 60, 50, 85, 70]
    //     }
    //   ],
    //   yaxis: {
    //     min: 5,
    //     max: 90
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // };
  }

  ngOnInit() {
    this.getDashBoardStats();
  }

  getAdminChart() {
    this.adminChart = {
      chart: {
        height: 150,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['Active', 'Deleted'],
      series: [Number(this.details.details.activeAdminOnly), Number(this.details.details.deletedAdminOnly)],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      colors: ['#2ed8b6', '#ff5370'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0
      }
    };
  }

  getUserChart() {
    this.userChart = {
      chart: {
        height: 150,
        type: 'donut'
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        pie: {
          donut: {
            size: '75%'
          }
        }
      },
      labels: ['Active', 'Deleted'],
      series: [Number(this.details.details.activeUsersOnly), Number(this.details.details.deletedUsersOnly)],
      legend: {
        show: false
      },
      tooltip: {
        theme: 'dark'
      },
      grid: {
        padding: {
          top: 20,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      // colors: ['#4680ff', '#2ed8b6'],
      colors: ['#2ed8b6', '#ff5370'],
      fill: {
        opacity: [1, 1]
      },
      stroke: {
        width: 0
      }
    };
  }

  getDashBoardStats() {
    this.apiService.getDashboardStatus().subscribe({
      next: (response: BaseResponse) => {
        this.utilityService.print('Success:', response);

        this.details = response.data;

        this.getUserChart();
        this.getAdminChart();

        this.utilityService.showAlert(response.message, 'success');
      },
      error: (error) => {
        this.utilityService.print('Error:', error);
        this.utilityService.showAlert(error.error.message, 'error');

        if (error.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl('/login', { replaceUrl: true });
          return;
        }
      }
    });
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
}
