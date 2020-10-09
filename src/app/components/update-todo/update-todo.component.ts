import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from '../../shared/models';
import { AuthService } from '../../core/services/auth';
import { TodoService } from '../../core/services/todo';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent {
  @Input() todo: Todo;
  @Output() updated = new EventEmitter<void>();

  updateTodoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.updateTodoForm = this.createForm(this.todo);
  }

  createForm(todo: Todo): FormGroup {
    return this.fb.group({
      title: [todo.title, Validators.required],
    });
  }

  onSubmit() {
    this.todoService.updateTodo({
      ...this.updateTodoForm.value,
      completed: false,
      id: this.todo.id,
      userId: this.authService.currentUser.id
    });
    this.updated.emit();
  }
}
