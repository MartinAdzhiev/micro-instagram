import { Component, OnInit } from '@angular/core';
import { Photo } from '../../data/photo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  photoId!: Number;
  photo!: Photo;
  updatedPhotoUrl!: String;
  newPhotoUrl: string | ArrayBuffer | null = null;

  constructor(private photoService: PhotoService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.photoId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.photoService.getPhoto(this.photoId).subscribe(photo => {
      this.photo = photo;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.newPhotoUrl = e.target?.result as string ?? null;
        this.updatedPhotoUrl = this.newPhotoUrl;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    const updatedPhoto: Photo = {
      albumId: this.photo.albumId,
      id: this.photo.id,
      title: this.photo.title,
      url: this.updatedPhotoUrl,
      thumbnailUrl: this.updatedPhotoUrl
    }

    console.log(updatedPhoto);

    this.photoService.updatePhoto(updatedPhoto).subscribe({
      next: (response) => {
        console.log('Update successful. Status:', response);
        this.router.navigate(['/details', this.photoId]);
      },
      error: (err) => {
        console.error('Error updating photo. Status:', err.status, 'Message:', err.message);
      }
    });;
    }
  }


