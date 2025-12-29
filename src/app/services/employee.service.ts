import { Injectable } from '@angular/core';
import {Employee} from '../model/Employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee : Employee[] =  [];
  key: string = 'employee'
  onSave(employe: Employee){
    try{
      this.employee.push(employe);
      localStorage.setItem(this.key,JSON.stringify(this.employee));
    }
    catch(error){
      console.log('Error saving to the localstorage',error)
    }
  }
  constructor() { }
}
