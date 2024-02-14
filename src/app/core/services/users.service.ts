import { Inject, Injectable } from '@angular/core';
import { User } from '../../layouts/dashboard/pages/users/models/user';
import { Observable, delay, finalize, of, tap } from 'rxjs';
import { AlertsService } from './alerts.service';
import { LoadingService } from './loading.service';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let USERS_DB: User[] = [
    {
      id: new Date().getTime() +1 ,
      userName: 'cremita',
      firstName: 'Pepe',
      lastName: 'Cuenca',
      email: 'pepe.cuenca@gmail.com',
      password: 'bombazo',
      role: 'USER'     
    },  
    {
      id: new Date().getTime() +2 ,
      userName: 'chucky',
      firstName: 'Vassily',
      lastName: 'Ivanchuk',
      email: 'vassily.ivanchuk@gmail.com',
      password: 'marzo',
      role: 'ADMIN'    
    },
    {
      id: new Date().getTime() +3,
      userName: 'flancito',
      firstName: 'Marcelo',
      lastName: 'Laje',
      email: 'marcelo.laje@gmail.com',
      password: 'flancito',
      role: 'ADMIN'    
    },
    {
      id: new Date().getTime() +4,
      userName: 'flancitaaaa',
      firstName: 'Valentina',
      lastName: 'Laje',
      email: 'valentina.laje@gmail.com',
      password: 'nikita',
      role: 'USER'    
    }   
  ];

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private alerts: AlertsService, private loadingService: LoadingService) {}
  
  getUserById(idUser: number | string): Observable<User | undefined> {
    return of(USERS_DB.find((user) => user.id == idUser)).pipe(delay(500));
  }


  getRoles(): Observable<string[]> {
    this.loadingService.setIsLoading(true);
    return of(ROLES_DB).pipe(
      delay(800), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

  getUsers() {
    
    this.loadingService.setIsLoading(true);
    return of(USERS_DB).pipe(
      delay(1200), 
      finalize(() => this.loadingService.setIsLoading(false)));
  }

		
  createUser(payload: User) {
    USERS_DB = [...USERS_DB, {...payload, id : new Date().getTime()}]; 
    return this.getUsers();      
  }

  deleteUserById(userId: number) {
    USERS_DB = USERS_DB.filter((user) => user.id != userId);
    return this.getUsers().pipe(tap(() => this.alerts.showSuccess('Realizado', 'Se eliminó correctamente')) );
  }
	
  updateUserById(userId: number, data: User) {
    USERS_DB = USERS_DB.map((c) => c.id === userId ? { ...c, ...data} : c); 
    return this.getUsers();

  }

}
