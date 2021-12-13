import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from '../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as angular from 'angular';

interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  @Output() loginEvent = new EventEmitter<ITask>();
  taskValues: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(150),
    ]),
    priority: new FormControl('low'),
  });
  public description: string = '';
  public changedDescription: boolean = false;
  priorities: Priority[] = [
    { value: 'low', viewValue: 'Low' },
    { value: 'normal', viewValue: 'Normal' },
    { value: 'hight', viewValue: 'Hight' },
  ];
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    console.log({ ...this.taskValues.value, description: this.description });
  }

  onDescriptionChange(e: any): void {
    this.changedDescription = true;
    const value = e.editor.getData();
    this.description = value;
    if ((value.length < 20 || value.length > 5000) && this.taskValues.touched) {
      angular
        .element(
          document.querySelector('.cke_inner[role="presentation"]') as Element
        )
        .addClass('error');
    } else {
      angular
        .element(
          document.querySelector('.cke_inner[role="presentation"]') as Element
        )
        .removeClass('error');
    }
  }
}
