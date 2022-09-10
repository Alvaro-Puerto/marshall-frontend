import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDivision } from '../interfaces/IDivision';
import { IOffice } from '../interfaces/IOffice';
import { IPosition } from '../interfaces/Iposition';
import { CustomvalidationService } from '../services/customvalidation.service';
import { DivisionService } from '../services/division.service';
import { EmployeeService } from '../services/employee.service';
import { OfficesService } from '../services/offices.service';
import { PositionService } from '../services/position.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form!       :FormGroup;
  salary      :any;
  positions   :IPosition[] = [];
  divisions   :IDivision[] = [];
  offices     :IOffice[] = [];

  constructor(private fb                  :FormBuilder, 
              private customValidators    :CustomvalidationService,
              private officeService       :OfficesService,
              private positionService     :PositionService,
              private divisionService     :DivisionService,
              private employeeService     :EmployeeService,
    ) { 
   
  }

  ngOnInit(): void {
    this.loadRelation();
    this.form = this.fb.group({
      code_employee: new FormControl('', [Validators.required]),
      identification : new FormControl('', [Validators.required]),
      name_employee: new FormControl('', [Validators.required]),
      surname_employee: new FormControl('', [Validators.required]),
      begin_date: new FormControl('', [Validators.required, this.customValidators.beginDateValidation]),
      birthday: new FormControl('', [Validators.required, this.customValidators.birthdayValidation]),
      salaries: new FormArray([])
    });
  }

  loadRelation() {
    this.divisionService.getDivision().subscribe((data:any) => {
      this.divisions = data;
    }, (err: HttpErrorResponse) => {

    });

    this.officeService.getOffice().subscribe((data:any) => {
      this.offices = data;
    }, (err: HttpErrorResponse) => {

    });

    this.positionService.getPosition().subscribe(data => {
      this.positions = data;
    }, (err: HttpErrorResponse) => {

    });
  }

  get f_validation() {
    return this.form.controls;
  }

  buildSalaryForm() {
    var form = new FormGroup({
        year: new FormControl('', [Validators.required, Validators.min(1990), Validators.max(new Date().getFullYear())]),
        month: new FormControl('',[Validators.required]),
        office: new FormControl('', [Validators.required]),
        position: new FormControl('', [Validators.required]),
        division: new FormControl('', [Validators.required]),
        base_salary: new FormControl(0, [Validators.required]),
        production_bonus: new FormControl(0, [Validators.required]),
        compesation_bonus: new FormControl(0, [Validators.required]),
        comission: new FormControl(0, [Validators.required]),
        contribution : new FormControl(0, [Validators.required]),
        grade : new FormControl(0, [Validators.required]),
    });

    return form;
  }

  addForm() {
    this.salaries.push(this.buildSalaryForm());
  }

  removeItem(index: number) {
    this.salaries.removeAt(index);
  }

  get formV() {
    return this.form.controls;
  }
  get salaries(): FormArray {
    return this.form.get('salaries') as FormArray;
  }

  save() {
    let listDataSalary: [] = this.salaries.value;
    let listData: any[] = [];
    listDataSalary.forEach(element => {
        parseInt(element['month']);
        this.divisions.find(x => x.id == element['division']);
        this.positions.find(x => x.id == element['position']);
        this.offices.find(x => x.id == element['office']);

        let data = {
          month: element['month'],
          division: this.divisions.find(x => x.id == element['division']),
          position: this.positions.find(x => x.id == element['position']),
          office :this.offices.find(x => x.id == element['office']),
          year: element['year'],
          base_salary: element['base_salary'],
          production_bonus: element['production_bonus'],
          compesation_bonus: element['compesation_bonus'],
          comission: element['comission'],
          contribution : element['contribution'],
          grade : element['grade'],
          
        }
        listData.push(Object.assign(this.getObjForm(), data))
    });

    this.employeeService.saveEmployee(listData)
    .subscribe((data:any) => {
      console.log(data);
      
    }, err => {
      
    });
    
  }

  getObjForm() {
    let data = {
      
    }
    
    return data;
  }

  transformData() {
    let data = {
      code_employee: this.form.get('code_employee')?.value,
      identification : this.form.get('identification')?.value,
      name_employee: this.form.get('name_employee')?.value,
      surname_employee: this.form.get('surname_employee')?.value,
      begin_date: this.form.get('begin_date')?.value,
      birthday: this.form.get('birthday')?.value,
    }
  }
}
