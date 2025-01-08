import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../../services/photo.service';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { Photo } from '../../data/photo';
import { Router, RouterModule } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-item',
  imports: [CommonModule, RouterModule, MatPaginatorModule, MatFormFieldModule, MatInputModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit{
 
  photos: Photo[] = [];

  pageSizeOptions: number[] = [12, 24, 36];

  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPageAction$ = this.currentPageSubject.asObservable();

  private currentPageSizeSubject = new BehaviorSubject<number>(12);
  currentPageSizeAction$ = this.currentPageSizeSubject.asObservable();

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
    this.currentPageSizeSubject.next(event.pageSize);
  }


  getPaginatedPhotos(): Observable<Photo[]> {
    return combineLatest([
      this.currentPageAction$,
      this.currentPageSizeAction$
    ]).pipe(
      switchMap(([pageIndex, pageSize]) => {
        return this.photoService.getPaginatedPhotos(pageIndex + 1, pageSize)
      }),
      tap((paginatedPhotos) => {
        console.log('Paginated Photos:', paginatedPhotos);
      })
    );
}
}
