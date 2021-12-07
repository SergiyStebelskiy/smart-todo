import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  passHide: boolean = true;
  loginValues: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor() {}
  ngOnInit(): void {
    console.log(this.loginValues);
  }

  onLogin() {
    console.log(this.loginValues.value);
  }
}
