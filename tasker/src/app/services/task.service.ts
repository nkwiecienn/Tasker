import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'http://localhost:3000/tasks';
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.tasksUrl}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.tasksUrl}`, task)
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.tasksUrl}/${id}`, task);
  }
}
