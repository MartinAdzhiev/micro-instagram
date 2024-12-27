import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Album } from '../data/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private readonly baseUrl: string = `${environment.apiUrl}/albums`;

  constructor(private http: HttpClient) { }

  albums$ = this.http.get<Album[]>(this.baseUrl);

  getAlbum(id: Number): Observable<Album> {
    return this.http.get<Album>(`${this.baseUrl}/${id}`)
  }
}
