
import { Component, inject } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { ChatMsgComponent } from './chat-msg/chat-msg.component';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { UtilityService } from 'src/app/services/utility-service';
import { ThemeService } from 'src/app/services/theme-service';

@Component({
  selector: 'app-nav-right',
  imports: [SharedModule, ChatUserListComponent, ChatMsgComponent],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {

  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  router: any;

  user: any;

  constructor(private utilityService: UtilityService, public themeService: ThemeService, ) {
    this.router = inject(Router);
    this.visibleUserList = false;
    this.chatMessage = false;
    this.user = this.utilityService.getUserInfo();
    this.utilityService.print(this.user);
  }

  onChatToggle(friendID: any) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
