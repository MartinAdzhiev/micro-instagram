import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
