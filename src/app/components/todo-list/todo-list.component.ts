import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoService } from 'src/app/core/services/todo/todo.service';
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

  delete(id: number) {
    this.todoService.removeTodo(id).subscribe(console.log);
  }
}
