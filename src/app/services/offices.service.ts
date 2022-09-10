import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffice } from '../interfaces/IOffice';
import { BaseApiServiceService } from './base-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class OfficesService extends BaseApiServiceService {
  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  getOffice(): Observable<IOffice[]>  {
    return this.http.get<IOffice[]>(this.baseUrl + '/office');
  }
}
