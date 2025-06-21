import { Employee } from './employee';

export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  assignedBy: Employee;
  assignedTo: Employee;
  done: boolean;
  cancelled: boolean;
}
