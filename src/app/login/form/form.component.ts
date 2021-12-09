import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from './interfaces';

@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class LoginFormComponent {
  @Output() loginEvent = new EventEmitter<ILogin>();
  passHide: boolean = true;
  loginValues: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor() {}

  onLogin() {
    this.loginEvent.emit(this.loginValues.value);
  }
}
