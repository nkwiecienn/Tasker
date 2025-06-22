import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { TaskService } from '../../services/task.service';


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
  @Output() move = new EventEmitter<{ task: Task, to: Task['progress'] }>();

  constructor(private taskService: TaskService) {}

  assignedBy?: Employee;
  assignedTo?: Employee;

  ngOnInit(): void {
    this.assignedBy = this.getEmployee(this.task.assignedBy);
    this.assignedTo = this.getEmployee(this.task.assignedTo);
  }

  private getEmployee(id: string): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  moveToInProgress() {
    this.move.emit({ task: this.task, to: "inProgress"});
  }

  moveToDone() {
    this.move.emit({ task: this.task, to: "done"});
  }

  moveToCancelled() {
    this.move.emit({ task: this.task, to: "cancelled"});
  }
}
