import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PhotoService} from '../../services/photo.service';
import { AlbumService } from '../../services/album.service';
import { Album } from '../../data/album';
import { Photo } from '../../data/photo';
import { ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ErrorHandlingService } from '../../services/error-handling.service';

@UntilDestroy()
@Component({
  selector: 'app-upload-item',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './upload-item.component.html',
  styleUrl: './upload-item.component.css'
})
export class UploadItemComponent {

  albums$ = this.albumService.albums$;
  photoUrl!: String;


  uploadForm = this.formBuilder.group({
    albumId: ['', Validators.required],
    title: ['', Validators.required],
    photo: ['', Validators.required]
  })


  constructor(private router: Router,
              private photoService: PhotoService,
              private albumService: AlbumService,
              private formBuilder: FormBuilder,
              private errorHandlingService: ErrorHandlingService){}


  onSubmit() {

    if(this.uploadForm.valid) {
      const formValues = this.uploadForm.value;

      const photo: any = {
        albumId: Number(formValues.albumId),
        title: formValues.title,
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
        this.errorHandlingService.handleError(err, "Failed uploading photo");
      }
    });;
    }
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
