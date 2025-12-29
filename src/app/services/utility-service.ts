import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  alertMessage: string | null = null;
  alertType: string = '';
  alertTimeout: any;

  constructor(private router: Router) { }

  print(staticMassage?: String, message?: any) {
    if (environment.production != true) {
      console.log(staticMassage);
      console.log(JSON.stringify(message));
    }
  }

  getBaseImagePath() {
    return environment.baseImagePath;
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

  isUnauthenticated(error: any) {
    if (error.status === 401) {
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return;
    }
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    this.print("", token);
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    this.print(decoded);
    this.print("", decoded.exp * 1000 < Date.now());
    return decoded.exp * 1000 < Date.now();
  }

  getUserInfo() {
    if (!this.isTokenExpired()) {
      const token = localStorage.getItem('token');


      if (!token) return null;

      const decoded: any = jwtDecode(token);

      return {
        username: decoded.sub,
        fullName: decoded.fullName,
        email: decoded.email,
        phoneNumber: decoded.phoneNumber,
        issuedAt: decoded.iat,
        expiresAt: decoded.exp
      };
    } else {
      return null;
    }
  }

}
