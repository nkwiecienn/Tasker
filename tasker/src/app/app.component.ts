import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tasker';

  constructor(
    private router: Router, 
  ) {}

  get isLoggedIn(): boolean {
    if(typeof localStorage !== 'undefined')
      return !!localStorage.getItem('role')
    return false;
  }

  logout(): void {
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
