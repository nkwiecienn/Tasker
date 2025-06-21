export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: "manager" | "employee";
}
