export interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  assignedBy: number;
  assignedTo: number;
  done: boolean;
  cancelled: boolean;
}
