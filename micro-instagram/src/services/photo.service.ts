import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Photo } from '../data/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly baseUrl: string = `${environment.apiUrl}/photos`;

  constructor(private http: HttpClient) { }

  photos$ = this.http.get<Photo[]>(this.baseUrl);

  totalPhotos$ = this.photos$.pipe(
    map(photos => photos.length)
  )

  getPaginatedPhotos(page: number, limit: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}?_page=${page}&_limit=${limit}`);
  }

  getPhoto(id: Number): Observable<Photo> {
    return this.http.get<Photo>(`${this.baseUrl}/${id}`);
  }

  deletePhoto(id: Number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { observe: 'response' });
  } 

  updatePhoto(photo: Photo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${photo.id}`, photo, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      observe: 'response'
    });
  }

  uploadPhoto(photo: Photo): Observable<any> {
    return this.http.post(this.baseUrl, photo, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      observe: 'response'
    });
} 
}
