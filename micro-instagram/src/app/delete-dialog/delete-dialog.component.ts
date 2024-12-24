import { Component, inject } from '@angular/core';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
