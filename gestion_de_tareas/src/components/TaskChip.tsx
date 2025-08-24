import type { Task, User } from "../types";

export default function TaskChip({ task, user }: { task: Task; user?: User }) {
  // bloque azul suave
  return (
    <div
      className="rounded-md px-2 py-1 text-sm shadow-sm cursor-grab active:cursor-grabbing
                 bg-sky-200 text-sky-900 border border-sky-300"
      draggable
      onDragStart={(e) => { e.dataTransfer.setData("text/plain", task.id); e.dataTransfer.effectAllowed="move"; }}
      title={task.title}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate">{task.title}</span>
        {user && <span className="text-xs opacity-80">{user.name}</span>}
      </div>
    </div>
  );
}
