import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../app/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private dialog: MatDialog) { }

  handleError(error: HttpErrorResponse, customMessage: string): void {
    
      let errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    this.dialog.open(ErrorDialogComponent, {
      data: {
        customMessage: customMessage,
        message: errorMessage,
      },
    });
  }
}
