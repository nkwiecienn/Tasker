export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "manager" | "employee";
}
