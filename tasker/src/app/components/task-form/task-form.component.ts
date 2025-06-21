import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  form!: FormGroup;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private tasksService: TaskService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      assignedTo: ['', Validators.required]
    });

    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  submit(): void {
    if(this.form.valid) {
      const formValues = this.form.value;

      const newTask: Task = {
        ...formValues,
        assignedTo: +formValues.assignedTo,
        assignedBy: 1, 
        date: new Date().toISOString().split('T')[0],
        progress: 'assigned' 
      };

      this.tasksService.addTask(newTask).subscribe(() => {
        this.form.reset();
        this.close.emit();
      })
    }
  }

  @Output() close = new EventEmitter<void>();
}
