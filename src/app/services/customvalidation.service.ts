import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  birthdayValidation(birthdayControl: AbstractControl) {
      var birthday = new Date(birthdayControl.value);

      var timeDiff = Math.abs(Date.now() - new Date(birthday).getTime());
      var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      console.log(age);
      if (age < 18) {
        return {
          'birthday': true
        };
      }

      return {
        'birthday': false
      };
  }

  beginDateValidation(beginDateControl: AbstractControl) {
     var begin_date = beginDateControl.value;
     if (new Date() < new Date(begin_date)) {
      return {
        'begin_date_error': true
      };
     }
     return {
      'begin_date_error': false
    };
  }

  validateMonthAndYear(yearControl: AbstractControl, data:any []) {

  }
  
}
