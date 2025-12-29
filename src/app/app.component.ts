
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';


import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  constructor(private themeService: ThemeService) { }


  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.themeService.loadTheme();
  }
}
