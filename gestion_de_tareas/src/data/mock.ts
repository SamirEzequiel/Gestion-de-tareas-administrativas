import type { Task, User } from "../types";

const today = new Date();
const toKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
};

const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);

export const users: User[] = [
  { id: "u1", name: "Ana García", email: "ana@example.com" },
  { id: "u2", name: "Carlos López", email: "carlos@example.com" },
  { id: "u3", name: "María Rodríguez", email: "maria@example.com" },
];

export const initialTasks: Task[] = [
  { id: "t1", title: "Configurar proyecto", status: "TODO",  createdAt: new Date().toISOString(), dueDate: toKey(tomorrow) },
  { id: "t2", title: "Diseñar columnas Kanban", status: "DOING", createdAt: new Date().toISOString() },
  { id: "t3", title: "Prueba de drag & drop",  status: "DONE", createdAt: new Date().toISOString() },
];
