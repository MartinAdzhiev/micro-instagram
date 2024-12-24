import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../../data/photo';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../data/album';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatDialogModule, MatDialog, MAT_DIALOG_DATA,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


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
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.photoId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.photoService.getPhoto(this.photoId).subscribe(photo => {
      this.photo = photo;

      this.albumService.getAlbum(this.photo.albumId).subscribe(album => {
        this.album = album;
      })
    });
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {data: {id: this.photo.id}});
    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.photoService.deletePhoto(this.photo.id).subscribe({
          next: (response) => {
            console.log('Delete successful. Status:', response);
            this.router.navigate(['/photos']);
          },
          error: (err) => {
            console.error('Error deleting photo. Status:', err.status, 'Message:', err.message);
          }
        });;
      }
    })
  }

  openEdit(): void {
    this.router.navigate(['/edit', this.photoId]);
  }

}
