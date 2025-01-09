import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../data/photo';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../data/album';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ErrorHandlingService } from '../../services/error-handling.service';

@UntilDestroy()
@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule, MatDialogModule, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  photoId!: Number;
  photo!: Photo;
  album!: Album;
  

  constructor(private albumService: AlbumService, 
              private photoService: PhotoService, 
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private errorHandlingService: ErrorHandlingService) {}

  ngOnInit(): void {
    this.photoId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.photoService.getPhoto(this.photoId).pipe(
      switchMap(photo => {
        this.photo = photo;
        return this.albumService.getAlbum(photo.albumId);
      }),
      catchError(err => {
        this.errorHandlingService.handleError(err, "Failed retrieving photo");
        return of(null);
      })
    ).subscribe(album => {
      if(album){
        this.album = album;
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {data: {id: this.photo.id}});
    
    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result === true) {
          return this.photoService.deletePhoto(this.photo.id);
        } else {
          return of(null);
        }
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Delete successful. Status:', response);
          this.router.navigate(['/photos']);
        }
      },
      error: (err) => {
        console.error('Error deleting photo. Status:', err.status, 'Message:', err.message);
        this.errorHandlingService.handleError(err, "Failed deleting photo");
      }
    });
  }
  openEdit(): void {
    this.router.navigate(['/edit', this.photoId]);
  }

}
