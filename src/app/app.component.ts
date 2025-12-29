import { EmployeeService } from './services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  form: FormGroup = new FormGroup({});
  employee: Employee =  new Employee();
  employees?: Employee;

  constructor(private employeeService:EmployeeService){
    this.initForm();
    // debugger;
  }
  initForm(){
    this.form = new FormGroup({
      empid: new FormControl(this.employee.empId),
      name: new FormControl(this.employee.name),
      email: new FormControl(this.employee.email),
      city: new FormControl(this.employee.city),
      state: new FormControl(this.employee.state),
      adresse: new FormControl(this.employee.adresse),
      pinCode: new FormControl(this.employee.pinCode)
    })

  }
  onSave(){
    // debugger;
    // this.initForm();
    // console.log(typeof(this.form.value))
    // console.log(this.form.value);
    // this.form.controls['empId'].setValue(1);
    this.employees = this.form.value;
    // console.log(typeof(this.employees));
    this.employeeService.onSave(this.employees!);
  }
  reset(){
    this.initForm();
  }
}
