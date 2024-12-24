import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { Observable, of } from 'rxjs';
import { Photo } from '../../data/photo';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule, RouterModule, MatPaginatorModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  allPhotos: Photo[] = []; 
  photos: Photo[] = [];  
  totalPhotos: number = 0;  
  pageSize: number = 12;  
  currentPage: number = 0; 

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  loadPhotos(): void {
    this.photoService.getPhotos().subscribe(response => {
      this.allPhotos = response;
      this.totalPhotos = this.allPhotos.length;
      this.paginatePhotos();
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginatePhotos();
  }

  paginatePhotos(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.photos = this.allPhotos.slice(startIndex, endIndex);
  }
}
