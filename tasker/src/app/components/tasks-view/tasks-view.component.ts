import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Console } from 'console';

@Component({
  standalone: true,
  selector: 'app-tasks-view',
  imports: [CommonModule, TaskComponent, TaskFormComponent],
  templateUrl: './tasks-view.component.html',
  styleUrl: './tasks-view.component.css'
})
export class TasksViewComponent {
  tasks: Task[] = [];
  employees: Employee[] = [];
  selectedTask: Task | null = null;
  showForm = false;
  
  constructor(private taskService: TaskService, private employeeService: EmployeeService) {}
  
  get assignedTasks() {
    return this.tasks.filter(t => t.progress === "assigned");
  }

  get inProgressTasks() {
    return this.tasks.filter(t => t.progress === "inProgress");
  }

  get doneTasks() {
    return this.tasks.filter(t => t.progress === "done");
  }

  get cancelledTasks() {
    return this.tasks.filter(t => t.progress === "cancelled");
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  onFormClosed(): void {
    this.selectedTask = null;
    this.showForm = false;
    this.loadTasks();
  }

  openEdit(task: Task): void {
    this.selectedTask = task;
    this.showForm = true;
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
  }

  moveTask(event: { task: Task, to: Task['progress']}): void {
    const updated = {
      ...event.task,
      progress: event.to
    };

    this.taskService.updateTask(event.task.id, updated).subscribe(() => {
      this.loadTasks();
    })
  }

  onDeleteTask(): void {
    if(!this.selectedTask)
      return;
    this.taskService.daleteTask(this.selectedTask.id).subscribe(() => {
      this.selectedTask = null;
      this.showForm = false;
      this.loadTasks();
    });
  }
}
