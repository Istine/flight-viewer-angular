import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private apiUrl: string = ` https://opensky-network.org/api/flights/all?`;

  constructor(private httpClient: HttpClient) {}

  getFilghts(data: { start: number; end: number }): Observable<any[]> {
    const newApiUrl = this.apiUrl + `begin=${data.start}&end=${data.end}`;
    return this.httpClient.get<any[]>(newApiUrl);
  }
}
