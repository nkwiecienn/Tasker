import { Employee } from "./employee";

export interface Task {
    id: number;
    assignedBy: Employee;
    assignedTo: Employee;
    date: string;
    description: string;
    cancelled?: boolean;
}
