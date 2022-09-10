import { Injectable } from '@angular/core';
import { BaseApiServiceService } from './base-api-service.service';
import { HttpClient } from '@angular/common/http';
import { IPosition } from '../interfaces/Iposition';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService extends BaseApiServiceService {

  constructor(
    private http: HttpClient
  ) { 
    super();
  }


  getPosition(): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(this.baseUrl + '/position');
  }
}
