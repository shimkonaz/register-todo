import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Todo } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  _currentTodos: Todo[];
  todos$ = new Subject<Todo[]>();

  set currentTodos(value: Todo[]) {
    this._currentTodos = value;
    this.todos$.next(value);
  };

  get currentTodos(): Todo[] {
    return this._currentTodos;
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todoUrl).pipe(
      map(data => this.currentTodos = [...data.filter(todo => todo.userId === 11)]) //NOTE: only when using jsonplaceholder.typicode
    );
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.todoUrl, todo).pipe(
      tap(data => this.currentTodos = [
        ...this.currentTodos,
        data
      ])
    )
  }

  updateTodo(todo: Todo) {
    const url = `${this.todoUrl}/${todo.id}`;
    
    return this.http.put<Todo>(url, todo).pipe(
      tap(data => {
        this.currentTodos = [
          ...this.currentTodos.filter(todo => todo.id !== data.id)
        ];
        this.currentTodos = [
          ...this.currentTodos,
          data
        ];
      })
    );
  }

  removeTodo(id: number) {
    const url = `${this.todoUrl}/${id}`;

    return this.http.delete<Todo>(url).pipe(
      tap(() => {
        this.currentTodos = [...this.currentTodos.filter(todo => todo.id !== id)];
      })
    );
  }
}
