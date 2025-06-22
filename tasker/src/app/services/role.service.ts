import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  isManager(): boolean {
    if(typeof localStorage !== 'undefined')
      return localStorage.getItem('role') === "manager";
    return false;
  }

  isEmployee(): boolean {
    if(typeof localStorage !== 'undefined')
      return localStorage.getItem('role') === "employee";
    return false;
  }
}
