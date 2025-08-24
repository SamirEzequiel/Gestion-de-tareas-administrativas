import { useMemo } from "react";
import type { Task } from "../types";
import Badge from "./ui/Badge";

type Day = { key: string; label: string; isToday: boolean };

interface Props {
  tasks: Task[];
  days?: number; // cantidad de días a mostrar
  onAssignDate: (taskId: string, yyyyMmDd: string) => void;
}

export default function Planner({ tasks, days = 14, onAssignDate }: Props) {
  const strip = useMemo(() => nextDays(days), [days]);
  const grouped = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const d of strip) map.set(d.key, []);
    for (const t of tasks) {
      if (t.dueDate && map.has(t.dueDate)) {
        map.get(t.dueDate)!.push(t);
      }
    }
    return map;
  }, [tasks, strip]);

  return (
    <section className="bg-white border rounded-xl p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">Planificador (próximos {days} días)</h2>
        <span className="text-xs text-gray-500">Arrastra una tarea a un día para programarla</span>
      </div>

      {/* En móvil: carrusel horizontal */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {strip.map(day => (
          <div
            key={day.key}
            className={`min-w-[220px] sm:min-w-[240px] border rounded-lg p-3 ${day.isToday ? "bg-gray-50" : "bg-gray-50/50"}`}
            onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
            onDrop={(e) => {
              e.preventDefault();
              const taskId = e.dataTransfer.getData("text/plain");
              if (taskId) onAssignDate(taskId, day.key);
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{formatHuman(day.key)}</div>
              {day.isToday && <Badge>Hoy</Badge>}
            </div>

            <div className="space-y-2">
              {(grouped.get(day.key) ?? []).length === 0 ? (
                <div className="text-xs text-gray-500 border border-dashed rounded-lg p-3 text-center">
                  Suelta aquí
                </div>
              ) : (
                (grouped.get(day.key) ?? []).map(t => (
                  <div key={t.id} className="text-sm bg-white border rounded-md p-2 shadow-sm">
                    {t.title}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function nextDays(n: number): Day[] {
  const out: Day[] = [];
  const today = new Date();
  for (let i=0;i<n;i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const key = toKey(d);
    out.push({ key, label: d.toDateString(), isToday: i===0 });
  }
  return out;
}

function toKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,"0");
  const day = String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function formatHuman(yyyyMmDd: string) {
  const [y,m,d] = yyyyMmDd.split("-").map(Number);
  const dt = new Date(y, (m-1), d);
  return dt.toLocaleDateString(undefined, { weekday: "short", day: "2-digit", month: "short" });
}
