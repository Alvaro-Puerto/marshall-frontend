import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiServiceService {
  public baseUrl = 'https://localhost:44386/api';
  constructor() { }
}
