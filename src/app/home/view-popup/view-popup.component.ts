import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from './../interfaces';

@Component({
  selector: 'app-view-popup',
  templateUrl: './view-popup.component.html',
})
export class ViewPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITask }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
