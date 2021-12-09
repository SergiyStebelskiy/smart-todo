import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegistrate } from './interfaces';

@Component({
  selector: 'registration-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class RegistrationFormComponent {
  @Output() registrateEvent = new EventEmitter<IRegistrate>();
  passHide: boolean = true;
  registrateValues: FormGroup = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor() {}

  onCreateAccount() {
    this.registrateEvent.emit(this.registrateValues.value);
  }
}
