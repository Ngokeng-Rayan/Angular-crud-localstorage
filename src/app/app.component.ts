import { EmployeeService } from './services/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  form: FormGroup;
  allEmployees: Employee[] = [];
  editingEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {
    this.form = this.createForm();
  }

  ngOnInit() {
    this.loadEmployees();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      empid: new FormControl(null),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      adresse: new FormControl(''),
      contact: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      pinCode: new FormControl('', Validators.required)
    });
  }

  onSave() {
    if (this.form.valid) {
      const employeeData: Employee = { ...this.form.value };

      if (this.editingEmployee) {
        // Ensure empId is preserved when updating
        employeeData.empId = this.editingEmployee.empId;

        // Update existing employee
        this.employeeService.update(employeeData).subscribe({
          next: () => {
            this.loadEmployees();
            this.resetForm();
            alert('Employee updated successfully!');
          },
          error: (error) => {
            console.error('Error updating employee:', error);
            alert('Error updating employee: ' + error.message);
          }
        });
      } else {
        // Create new employee
        this.employeeService.onSave(employeeData).subscribe({
          next: () => {
            this.loadEmployees();
            this.resetForm();
            alert('Employee saved successfully!');
          },
          error: (error) => {
            console.error('Error saving employee:', error);
            alert('Error saving employee');
          }
        });
      }
    }
  }

  onEdit(employee: Employee) {
    this.editingEmployee = employee;
    this.form.patchValue({
      empid: employee.empId,
      name: employee.name,
      email: employee.email,
      city: employee.city,
      state: employee.state,
      adresse: employee.adresse,
      contact: employee.contact,
      pinCode: employee.pinCode
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe({
        next: (success) => {
          if (success) {
            this.loadEmployees();
            alert('Employee deleted successfully!');
          } else {
            alert('Error deleting employee');
          }
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          alert('Error deleting employee');
        }
      });
    }
  }

  resetForm() {
    this.form.reset();
    this.editingEmployee = null;
    // Reset the form to its initial state
    this.form.patchValue({
      empid: null,
      name: '',
      email: '',
      city: '',
      state: '',
      adresse: '',
      contact: '',
      pinCode: ''
    });
  }

  private loadEmployees() {
    this.employeeService.get().subscribe({
      next: (employees) => {
        this.allEmployees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }
}
