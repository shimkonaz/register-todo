import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm = this.createForm();
  destroyed$ = new Subject();

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern(/^[0-9]\d*$/)],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: ['']
      })
    });
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.authService.register(this.signupForm.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
  }
}
