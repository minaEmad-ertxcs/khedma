import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  alertMessage: string | null = null;
  alertType: string = '';
  alertTimeout: any;

  constructor() { }

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
