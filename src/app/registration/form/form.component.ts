import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'registration-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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
  ngOnInit(): void {
    console.log(this.registrateValues);
  }

  onCreateAccount() {
    console.log(this.registrateValues.value);
  }
}
