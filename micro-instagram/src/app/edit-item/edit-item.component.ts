import { Component, OnInit } from '@angular/core';
import { Photo } from '../../data/photo';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  photoId!: Number;
  photo!: Photo;
  updatedPhotoUrl!: string;
  newPhotoUrl: string | ArrayBuffer | null = null;

    editForm = this.formBuilder.group({
      title: ['', Validators.required],
      photo: ['', Validators.required]
    })

  constructor(private photoService: PhotoService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.photoId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPhoto();
  }

  loadPhoto(): void {
    this.photoService.getPhoto(this.photoId).subscribe(photo => {
      this.photo = photo;

      this.editForm.setValue({
        title: this.photo.title,
        photo: ''
      });
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

    if(this.editForm.valid) {
      const formValues = this.editForm.value;

      const updatedPhoto: any = {
        albumId: this.photo.albumId,
        id: this.photo.id,
        title: formValues.title,
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
  }


