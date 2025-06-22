import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  form!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  login(): void {
    if(!this.form.valid)
      return;

    const { email, password } = this.form.value;

    this.employeeService.getEmployees().subscribe(employees => {
      const matched = employees.find(emp =>
        emp.email === email && emp.password === password
      );

      if (matched) {
        localStorage.setItem('currentUser', matched.id);
        localStorage.setItem('role', matched.role);
        this.router.navigate(['/tasks-view']);
      } else {
        this.errorMessage = 'Failed to sign in.';
      }
    })
  }
}
