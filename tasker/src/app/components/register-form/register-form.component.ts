import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  form!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
        role: ['employee', Validators.required]
    })
  }

  register(): void {
    if(!this.form.valid)
      return;

    const newEmployee: Employee = { ...this.form.value }; 

    this.employeeService.addEmployee(newEmployee).subscribe(() => {
      this.form.reset();
    });
  }
}
