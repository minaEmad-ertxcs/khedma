import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private selectedUser: any = null;

  setUser(user: any) {
    this.selectedUser = user;
  }

  getUser() {
    return this.selectedUser;
  }

  clearUser() {
    this.selectedUser = null;
  }
}
