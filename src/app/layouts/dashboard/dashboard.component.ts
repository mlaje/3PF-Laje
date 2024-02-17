import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  showFiller = false;

  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService
    ) {}
  logout(): void {
    // /dashboard/users
    //this.router.navigate(['users'], {relativeTo: this.route} );
    //localStorage.removeItem('access-token');
    //this.router.navigate(['auth','login'] );
    this.authService.logout();
  }
}
