import { Component, Input } from '@angular/core';

import { TodoService } from '../../core/services/todo';
import { Todo } from '../../shared/models';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {
  @Input() todo: Todo;

  showUpdateForm = false;

  constructor(private todoService: TodoService) { }

  toggleUpdateForm() {
    this.showUpdateForm = !this.showUpdateForm;
  }

  delete(todo: Todo) {
    this.todoService.removeTodo(todo);
  }
}
