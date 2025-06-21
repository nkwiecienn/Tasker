import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';


@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() employees: Employee[] = [];
  @Output() edit = new EventEmitter<Task>();


  assignedBy?: Employee;
  assignedTo?: Employee;

  ngOnInit(): void {
    this.assignedBy = this.getEmployee(this.task.assignedBy);
    this.assignedTo = this.getEmployee(this.task.assignedTo);
  }

  private getEmployee(id: number): Employee | undefined {
    return this.employees.find(e => Number(e.id) === id);
  }
}
