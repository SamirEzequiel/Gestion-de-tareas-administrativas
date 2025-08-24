import type { PropsWithChildren } from "react";
import type { Status, Task } from "../types";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: Status;
  tasks: Task[];
  onDropTask: (taskId: string, status: Status) => void;
  onDeleteTask: (id: string) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  onDropTask,
  onDeleteTask,
}: PropsWithChildren<Props>) {
  return (
    <div
      className="bg-gray-50/80 rounded-xl p-3 border min-w-[300px] sm:min-w-0"
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
      onDrop={(e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("text/plain");
        if (taskId) onDropTask(taskId, status);
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold tracking-tight">{title}</h3>
        <span className="text-xs text-gray-500">{tasks.length}</span>
      </div>
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <div className="text-sm text-gray-500 border border-dashed rounded-lg p-4 text-center">
            Arrastra tareas aquí
          </div>
        ) : (
          tasks.map((t) => <TaskCard key={t.id} task={t} onDelete={onDeleteTask} />)
        )}
      </div>
    </div>
  );
}
