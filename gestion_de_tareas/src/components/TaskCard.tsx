import type { Task } from "../types";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

interface Props {
  task: Task;
  onDelete?: (id: string) => void;
}

export default function TaskCard({ task, onDelete }: Props) {
  return (
    <div
      className="bg-white border rounded-xl p-3 shadow-sm hover:shadow transition cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium leading-5">{task.title}</div>
          {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
          {task.dueDate && (
            <div className="mt-2 text-xs text-gray-600">
              Programada: <Badge>{formatHuman(task.dueDate)}</Badge>
            </div>
          )}
        </div>
        <Badge>{new Date(task.createdAt).toLocaleDateString()}</Badge>
      </div>
      <div className="mt-3 flex items-center justify-end">
        {onDelete && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-700">
            Eliminar
          </Button>
        )}
      </div>
    </div>
  );
}

function formatHuman(yyyyMmDd: string) {
  const [y,m,d] = yyyyMmDd.split("-").map(Number);
  const dt = new Date(y, (m-1), d);
  return dt.toLocaleDateString();
}
