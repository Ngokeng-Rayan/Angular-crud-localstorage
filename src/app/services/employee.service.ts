import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private key: string = 'employees';

  onSave(employee: Employee): Observable<Employee> {
    try {
      // Get existing employees from storage
      const existingEmployees = this.getFromStorage();

      // Add ID if not present
      if (!employee.empId) {
        employee.empId = this.generateId(existingEmployees);
      }

      // Add the new employee to the array
      existingEmployees.push(employee);

      // Save the entire updated array back to localStorage
      localStorage.setItem(this.key, JSON.stringify(existingEmployees));

      return of(employee);
    } catch (error) {
      console.error('Error saving to localStorage', error);
      return throwError(() => new Error('Error saving employee'));
    }
  }

  get(): Observable<Employee[]> {
    try {
      const employees = this.getFromStorage();
      return of(employees);
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return of([]);
    }
  }

  update(employee: Employee): Observable<Employee> {
    try {
      const existingEmployees = this.getFromStorage();

      // Find the employee by empId
      const index = existingEmployees.findIndex(emp => emp.empId === employee.empId);

      if (index !== -1) {
        // Update the employee in the array
        existingEmployees[index] = { ...employee };
        localStorage.setItem(this.key, JSON.stringify(existingEmployees));
        return of(existingEmployees[index]);
      } else {
        return throwError(() => new Error('Employee not found'));
      }
    } catch (error) {
      console.error('Error updating employee', error);
      return throwError(() => new Error('Error updating employee'));
    }
  }

  delete(id: number): Observable<boolean> {
    try {
      const existingEmployees = this.getFromStorage();
      const index = existingEmployees.findIndex(emp => emp.empId === id);

      if (index !== -1) {
        existingEmployees.splice(index, 1);
        localStorage.setItem(this.key, JSON.stringify(existingEmployees));
        return of(true);
      } else {
        return of(false);
      }
    } catch (error) {
      console.error('Error deleting employee', error);
      return of(false);
    }
  }

  private getFromStorage(): Employee[] {
    try {
      const stored = localStorage.getItem(this.key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return [];
    }
  }

  private generateId(employees: Employee[]): number {
    const maxId = employees.length > 0 ? Math.max(...employees.map(e => e.empId || 0)) : 0;
    return maxId + 1;
  }

  constructor() { }
}
