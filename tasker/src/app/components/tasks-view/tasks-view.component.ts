import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  standalone: true,
  selector: 'app-tasks-view',
  imports: [CommonModule, TaskComponent],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent {
  tasks$!: Observable<Task[]>;
  employees: Employee[] = [];
  
  constructor(private taskService: TaskService, private employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();

    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }
}
