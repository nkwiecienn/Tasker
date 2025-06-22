import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  form!: FormGroup;
  employees: Employee[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<Task>();
  @Input() task: Task | null = null;

  constructor(
    private employeeService: EmployeeService,
    private taskService: TaskService,
    public roleService: RoleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: [''],
      assignedBy: [''],
      assignedTo: ['', Validators.required],
      progress: ['assigned', Validators.required]
    });

    this.employeeService.getEmployees().subscribe(data => this.employees = data);

    if (this.task) {
      this.form.patchValue({
        ...this.task,
        assignedBy: String(this.task.assignedBy),
        assignedTo: String(this.task.assignedTo)
      });
    } else {
      this.form.patchValue({
        date: new Date().toISOString().split('T')[0],
        progress: 'assigned',
        assignedBy: localStorage.getItem("currentUser"),
        assignedTo: localStorage.getItem("currentUser")
      });
    }
  }

  submit(): void {
    if(this.form.valid) {
      const formValues = this.form.value;

      const newTask: Task = {
        ...formValues,
        assignedTo: formValues.assignedTo,
        assignedBy: formValues.assignedBy, 
        date: formValues.date,
        progress: formValues.progress 
      };

      if (this.task) {
        this.taskService.updateTask(this.task.id, newTask).subscribe(() => {
          this.form.reset();
          this.close.emit()});
      } else {
        this.taskService.addTask(newTask).subscribe(() => {
          this.form.reset();
          this.close.emit()});
      }
    }
  }
}
