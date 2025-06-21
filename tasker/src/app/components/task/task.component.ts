import { Component, Input } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
}
