import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PhotoService} from '../../services/photo.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../data/album';
import { Photo } from '../../data/photo';

@Component({
  selector: 'app-upload-item',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './upload-item.component.html',
  styleUrl: './upload-item.component.css'
})
export class UploadItemComponent implements OnInit {

  albums: Album[] = []
  selectedAlbumId!: Number;
  title!: String;
  photoUrl!: String;


  constructor(private router: Router,
              private photoService: PhotoService,
              private albumService: AlbumService){}

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    this.albumService.getAlbums().subscribe(response => {
      this.albums = response;
    })
  }

  onSubmit() {
    const photo: any = {
        albumId: this.selectedAlbumId,
        title: this.title,
        url: this.photoUrl,
        thumbnailUrl: this.photoUrl
        }

    this.photoService.uploadPhoto(photo).subscribe({
      next: (response) => {
        console.log('Upload successful. Status:', response);
        this.router.navigate(['/photos']);
      },
      error: (err) => {
        console.error('Error uploading photo. Status:', err.status, 'Message:', err.message);
      }
    });;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.photoUrl = e.target?.result as string ?? null;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

}