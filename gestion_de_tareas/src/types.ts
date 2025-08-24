export type Status = "TODO" | "DOING" | "DONE";

export interface User {
  id: string;
  name: string;
  email?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  createdAt: string;
  /** fecha objetivo opcional (YYYY-MM-DD) */
  dueDate?: string;
  /** usuario asignado */
  assignedTo?: string;
  /** programación para el calendario semanal */
  schedule?: {
    date: string; // YYYY-MM-DD
    hour?: number; // null para all-day
  };
}
