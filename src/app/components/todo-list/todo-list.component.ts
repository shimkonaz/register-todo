import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoService } from '../../core/services/todo/todo.service';
import { Todo } from '../../shared/models/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todos$ = this.todoService.todos$;
  }
}
