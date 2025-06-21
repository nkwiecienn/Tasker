import { Component } from '@angular/core';
import { TasksViewComponent } from './components/tasks-view/tasks-view.component';

@Component({
  selector: 'app-root',
  imports: [TasksViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasker';
}
