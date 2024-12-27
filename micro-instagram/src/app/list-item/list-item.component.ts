import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { BehaviorSubject, combineLatest, map, Observable, of, tap } from 'rxjs';
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
export class ListItemComponent implements OnInit{
 
  photos: Photo[] = [];

  pageSize: number = 12;

  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPageAction$ = this.currentPageSubject.asObservable();

  photos$: Observable<Photo[]> = this.photoService.photos$;
  
  totalPhotos$ = this.photoService.totalPhotos$.pipe(
    tap(total => {
      console.log('total photos:', total);
    })
  )

  constructor(private photoService: PhotoService, private router: Router) {}


  ngOnInit(): void {
    this.getPaginatedPhotos().subscribe(paginatedPhotos => {
      console.log('Received Paginated Photos:', paginatedPhotos);
      this.photos = paginatedPhotos;
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPageSubject.next(event.pageIndex);
  }


  getPaginatedPhotos(): Observable<Photo[]> {
    return combineLatest([
      this.photos$,
      this.currentPageAction$
    ]).pipe(
      map(([photos, pageIndex]) => {
        const startIndex = pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return photos.slice(startIndex, endIndex);
      }),
      tap((paginatedPhotos) => {
        console.log('Paginated Photos:', paginatedPhotos);
      })
    );
}
}
