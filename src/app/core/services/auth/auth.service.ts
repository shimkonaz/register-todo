import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { User } from 'src/app/shared/models/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

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
          this.router.navigateByUrl('/todos');
          this.currentUser = data;
          return data;
        },
        err => console.error(err)
      )
    );
  }

}
