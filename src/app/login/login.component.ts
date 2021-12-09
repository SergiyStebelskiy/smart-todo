import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin } from './form/interfaces';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin(values: ILogin) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    return this.http
      .post<{ access_token: string }>(`${environment.url}/auth/login`, values)
      .pipe(
        catchError((error) => {
          let message = 'Something went wrong';
          if (error.status === 404) message = 'Incorrect email or password';
          this._snackBar.open(message, '', config);
          return throwError('');
        })
      )
      .subscribe((data) => {
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        this._snackBar
          .open('You are successfully logined', '', config)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigateByUrl('/');
          });
      });
  }
}
