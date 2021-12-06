import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'registration-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  passHide: boolean = true;

  constructor() {}
  ngOnInit(): void {}

  onCreateAccount(form: NgForm) {
    console.log(form.value);
  }
}
