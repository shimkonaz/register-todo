import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  addTodoForm = this.createForm();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private todoService: TodoService
  ) { }

  ngOnInit() {
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    this.todoService.addTodo({
      ...this.addTodoForm.value,
      completed: false,
      userId: this.authService.currentUser.id
    }).subscribe(console.log);
  }
}
