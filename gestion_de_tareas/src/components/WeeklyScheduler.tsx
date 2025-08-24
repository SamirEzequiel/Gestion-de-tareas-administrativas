import { useMemo } from "react";
import type { Task, User } from "../types";
import TaskChip from "./TaskChip";

type Props = {
  weekStartKey: string;
  startHour?: number;
  endHour?: number; // excluyente
  tasks: Task[];
  users: User[];
  onAssign: (taskId: string, dateKey: string, hour: number | null) => void;
};

export default function WeeklyScheduler({
  weekStartKey, startHour = 8, endHour = 18, tasks, users, onAssign
}: Props) {
  const days = useMemo(() => {
    const base = toDate(weekStartKey);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base); d.setDate(base.getDate() + i);
      return { key: toKey(d), w: d.toLocaleDateString(undefined,{ weekday:"short"}), m: d.toLocaleDateString(undefined,{ month:"numeric", day:"numeric"}), today: isSameDay(d, new Date()) };
    });
  }, [weekStartKey]);

  const hours = useMemo(() => Array.from({ length: endHour - startHour }, (_, i) => startHour + i), [startHour, endHour]);
  const userById = (id?: string) => users.find(u => u.id === id);
  const at = (dateKey: string, hour: number | null) =>
    tasks.filter(t => t.schedule?.date === dateKey && ((hour===null && t.schedule?.hour==null) || t.schedule?.hour===hour));

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
      <div className="min-w-[980px]">
        {/* Head días */}
        <div className="grid" style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}>
          <div className="border-b bg-white p-3" />
          {days.map(d => (
            <div key={d.key} className={`border-b p-3 ${d.today ? "bg-gray-50" : ""}`}>
              <div className="text-xs uppercase text-gray-500">{d.w}</div>
              <div className="font-medium">{d.m}</div>
            </div>
          ))}
        </div>

        {/* Fila all-day */}
        <div className="grid" style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}>
          <div className="border-r p-2 text-xs text-gray-500 bg-white">all-day</div>
          {days.map(d => (
            <div key={"allday_"+d.key}
              className="border p-2 min-h-[56px] bg-gray-50/60 hover:bg-gray-50 transition"
              onDragOver={(e)=>{e.preventDefault(); e.dataTransfer.dropEffect="move";}}
              onDrop={(e)=>{e.preventDefault(); const id=e.dataTransfer.getData("text/plain"); if(id) onAssign(id, d.key, null);}}
            >
              <div className="flex flex-wrap gap-2">
                {at(d.key, null).map(t => <TaskChip key={t.id} task={t} user={userById(t.assignedTo)} />)}
              </div>
            </div>
          ))}
        </div>

        {/* Horas */}
        {hours.map(h => (
          <div key={h} className="grid" style={{ gridTemplateColumns: `80px repeat(7, 1fr)` }}>
            <div className="border-r p-2 text-xs text-gray-500 bg-white">{fmt(h)} – {fmt(h+1)}</div>
            {days.map(d => (
              <div key={d.key+"_"+h}
                className="border p-2 min-h-[70px] hover:bg-gray-50 transition"
                onDragOver={(e)=>{e.preventDefault(); e.dataTransfer.dropEffect="move";}}
                onDrop={(e)=>{e.preventDefault(); const id=e.dataTransfer.getData("text/plain"); if(id) onAssign(id, d.key, h);}}
              >
                <div className="space-y-1">
                  {at(d.key, h).map(t => <TaskChip key={t.id} task={t} user={userById(t.assignedTo)} />)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
const toDate = (k:string)=>{const [y,m,d]=k.split("-").map(Number);return new Date(y,m-1,d);};
const toKey = (d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const isSameDay=(a:Date,b:Date)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
const fmt=(h:number)=>{const dt=new Date();dt.setHours(h,0,0,0);return dt.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});};
