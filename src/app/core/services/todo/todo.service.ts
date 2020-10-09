import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Todo } from '../../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoUrl = 'https://jsonplaceholder.typicode.com/todos';
  todos$ = new Subject<Todo[]>();
  
  private _currentTodos: Todo[];

  set currentTodos(value: Todo[]) {
    this._currentTodos = value;
    this.todos$.next(value);
  };

  get currentTodos(): Todo[] {
    return this._currentTodos || [];
  }

  constructor(private http: HttpClient) { }

  getAllTodos(): void {
    this.http.get<Todo[]>(this.todoUrl).pipe(
      take(1),
      //NOTE: only when using jsonplaceholder.typicode
      map(data => this.currentTodos = [...data.filter(todo => todo.userId === 11)])
    ).subscribe();
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.todoUrl, todo).pipe(
      take(1),
      tap(data => this.currentTodos = [
        data,
        ...this.currentTodos
      ])
    );
  }

  updateTodo(todo: Todo) {
    const url = `${this.todoUrl}/${todo.id}`;
    
    this.http.put<Todo>(url, todo).pipe(
      take(1),
      tap(data => {
        this.currentTodos = [
          //NOTE: todo.id !== data.id not working,
          //as todo.id always the same for all todos from jsonplaceholder.typicode
          ...this.currentTodos.filter(todo => todo.title !== data.title)
        ];
        this.currentTodos = [
          data,
          ...this.currentTodos
        ];
      })
    ).subscribe();
  }

  removeTodo(todo: Todo) {
    const url = `${this.todoUrl}/${todo.id}`;
    
    this.http.delete<Todo>(url).pipe(
      take(1),
      tap(() => {
        this.currentTodos = [
          //NOTE: todo.id !== data.id not working,
          //as todo.id always the same for all todos from jsonplaceholder.typicode
          ...this.currentTodos.filter(currentTodo => currentTodo.title !== todo.title)
        ];
      })
    ).subscribe();
  }
}
