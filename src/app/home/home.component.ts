import { ITask } from './interfaces';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar
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
}
