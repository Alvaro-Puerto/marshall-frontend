import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDivision } from '../interfaces/IDivision';
import { BaseApiServiceService } from './base-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService extends BaseApiServiceService {
  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  getDivision(): Observable<IDivision[]> {
    return this.http.get<IDivision[]>(this.baseUrl + '/division');
  }
}
