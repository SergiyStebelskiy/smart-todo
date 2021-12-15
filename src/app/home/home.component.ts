import { ViewPopupComponent } from './view-popup/view-popup.component';
import { PopupComponent } from './popup/popup.component';
import { ITask } from './interfaces';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  tasks: Array<ITask> = [];
  loading: boolean = true;
  ngOnInit(): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    const token = localStorage.getItem('access_token');
    if (!token) this.router.navigateByUrl('login');
    else
      this.http
        .get(`${environment.url}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .pipe(
          catchError((error) => {
            this.loading = false;
            let message = 'Something went wrong';
            if (error.status === 401) this.router.navigateByUrl('login');
            else {
              this._snackBar.open(message, '', config);
            }
            return throwError('');
          })
        )
        .subscribe((data) => {
          this.loading = false;
          this.tasks = data as Array<ITask>;
        });
  }

  onCreateTask({ id, ...values }: ITask) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    const token = localStorage.getItem('access_token');
    if (!token) this.router.navigateByUrl('login');
    return this.http
      .post<ITask>(
        `${environment.url}/tasks`,
        { ...values, checked: false },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        catchError((error) => {
          let message = 'Something went wrong';
          if (error?.status === 400) message = 'Validation error';
          this._snackBar.open(message, '', config);
          return throwError('');
        })
      )
      .subscribe((data) => {
        this.tasks.push(data);
        this._snackBar.open('Task successfully created.', '', config);
      });
  }
  onEditTask({ id, ...values }: ITask) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    const token = localStorage.getItem('access_token');
    if (!token) this.router.navigateByUrl('login');
    return this.http
      .put<ITask>(`${environment.url}/tasks/${id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          let message = 'Something went wrong';
          if (error?.status === 400) message = 'Validation error';
          this._snackBar.open(message, '', config);
          return throwError('');
        })
      )
      .subscribe((data) => {
        this.tasks = this.tasks.map((e) => (e.id === data.id ? data : e));
        this._snackBar.open('Task successfully changed.', '', config);
      });
  }
  onDeleteTask({ id }: { id: number }) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    const token = localStorage.getItem('access_token');
    if (!token) this.router.navigateByUrl('login');
    return this.http
      .delete<ITask>(`${environment.url}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          let message = 'Something went wrong';
          if (error?.status === 400) message = 'Validation error';
          this._snackBar.open(message, '', config);
          return throwError('');
        })
      )
      .subscribe((data) => {
        this.tasks = this.tasks.filter((e) => e.id !== id);
        this._snackBar.open('Task successfully deleted.', '', config);
      });
  }
  openCreateTaskPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '60%',
      data: {
        type: 'create',
        task: null,
      },
    });
    dialogRef.componentInstance['submitEvent'].subscribe(
      this.onCreateTask.bind(this)
    );
  }
  openEditTaskPopup(task: ITask) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '60%',
      data: {
        type: 'edit',
        task,
      },
    });
    dialogRef.componentInstance['submitEvent'].subscribe(
      this.onEditTask.bind(this)
    );
  }
  openDeleteTaskPopup(task: ITask) {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '60%',
      data: {
        type: 'delete',
        task,
      },
    });
    dialogRef.componentInstance['submitEvent'].subscribe(
      this.onDeleteTask.bind(this)
    );
  }
  openViewTaskPopup(task: ITask) {
    this.dialog.open(ViewPopupComponent, {
      width: '80%',
      data: {
        task,
      },
    });
  }
}
