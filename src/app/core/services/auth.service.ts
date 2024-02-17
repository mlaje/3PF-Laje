import { Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { delay, of, map, finalize } from 'rxjs';
import { LoadingService } from './loading.service';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: User | null = null;
  
  constructor(private router: Router, 
              private alertsService: AlertsService,
              private loadingService: LoadingService) {}

  login(data: LoginData) : void {
      const MOCK_USER = {
          id: 2323,
          userName: 'kimo',
          firstName: 'Satoshi',
          lastName: 'Nakamoto',
          email: 'satoshi@gmail.com',
          password: 'bitcoin',
          role: 'ADMIN',
      };

      if (data.email === MOCK_USER.email && data.password === MOCK_USER.password) {
          this.authUser = MOCK_USER;
          localStorage.setItem('token', 'token123'); 
          this.router.navigate(['dashboard']);
      } else {
          this.alertsService.showError('Email o password inválidos');
      }
  };   

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth','login']);
    localStorage.removeItem('token');
  };

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('token'))
           .pipe(delay(1000), 
                 map((response) => !!response ), finalize(() => this.loadingService.setIsLoading(false)));           
  }

}
