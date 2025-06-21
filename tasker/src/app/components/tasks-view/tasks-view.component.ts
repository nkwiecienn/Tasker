import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  standalone: true,
  selector: 'app-tasks-view',
  imports: [CommonModule, TaskComponent],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent {
  tasks$!: Observable<Task[]>;
  
  constructor(private taskService: TaskService) {
    this.tasks$ = new Observable<Task[]>();
  }
  
  ngOnInit(): void {
    this.loadTasks();
  }
  
  loadTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }
}
