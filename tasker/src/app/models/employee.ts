export interface Employee {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "manager" | "employee";
}
