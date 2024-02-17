import { Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/models/user';
import { Router } from '@angular/router';
import { AlertsService } from './alerts.service';
import { delay, of, map, finalize, tap } from 'rxjs';
import { LoadingService } from './loading.service';

interface LoginData {
  email: null | string;
  password: null | string;
}

const MOCK_USER = {
  id: 2323,
  userName: 'kimo',
  firstName: 'Satoshi',
  lastName: 'Nakamoto',
  email: 'satoshi@gmail.com',
  password: 'bitcoin',
  role: 'ADMIN',
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUser: User | null = null;
  
  constructor(private router: Router, 
              private alertsService: AlertsService,
              private loadingService: LoadingService) {}

  login(data: LoginData) : void {
      if (data.email    === MOCK_USER.email && 
          data.password === MOCK_USER.password) {
            this.setAuthUser(MOCK_USER);
            localStorage.setItem('token', 'token123');        // TOKEN siempre igual
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
                 map((response) => !!response ), 
                 tap(()         => this.setAuthUser(MOCK_USER)),
                 finalize(()    => this.loadingService.setIsLoading(false)));           
  }

  private setAuthUser(mockUser: User): void {
    this.authUser = mockUser;
    //this.store.dispatch(AuthActions.setAuthUser({ user }));
    localStorage.setItem('token', 'token123'); 
  }

}
