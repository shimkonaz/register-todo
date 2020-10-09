import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from '../../../shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  set currentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  get currentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  register(user: User): Observable<User> {
    const url = 'https://jsonplaceholder.typicode.com/users';

    return this.http.post<User>(url, user).pipe(
      map(
        (data) => {
          this.currentUser = data;
          this.router.navigateByUrl('/todos');
          return data;
        },
        err => console.error(err)
      )
    );
  }

}
