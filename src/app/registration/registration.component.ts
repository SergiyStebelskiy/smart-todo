import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegistrate } from './form/interfaces';
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  onRegistrate(values: IRegistrate) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'left';
    config.verticalPosition = 'bottom';
    return this.http
      .post<IRegistrate>(`${environment.url}/auth/registration`, values)
      .pipe(
        catchError((error) => {
          let message = 'Something went wrong';

          if (error.status === 403) message = 'This email already exist';
          this._snackBar.open(message, '', config);
          return throwError('');
        })
      )
      .subscribe((data) => {
        this._snackBar
          .open('Account successfully created', '', config)
          .afterDismissed()
          .subscribe(() => {
            this.router.navigateByUrl('/login');
          });
      });
  }
}
