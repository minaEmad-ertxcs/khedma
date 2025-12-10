import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  alertMessage: string | null = null;
  alertType: string = '';
  alertTimeout: any;

  constructor() { }

  print(staticMassage?: String, message?: any) {
    if (environment.production != true) {
      console.log(staticMassage);
      console.log(JSON.stringify(message));
    }
  }

  showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type === 'success' ? 'alert-success' : 'alert-danger';

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }

    this.alertTimeout = setTimeout(() => {
      this.alertMessage = null;
      this.alertTimeout = null;
    }, 3000);
  }
}
