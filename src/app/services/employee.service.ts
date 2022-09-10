import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiServiceService } from './base-api-service.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseApiServiceService{

  constructor(private http: HttpClient) { 
    super();
  }
  
  saveEmployee(data:any) {   
                  
    return this.http.post(this.baseUrl + '/employeesalary', data);
  }

}
