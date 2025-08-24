import { useMemo, useState } from "react";
import type { Task, User } from "../types";
import { initialTasks, users } from "../data/mock";
import TopNav from "../components/TopNav";
import LeftRail from "../components/LeftRail";
import CalendarHeader from "../components/CalendarHeader";
import TaskSidebar from "../components/TaskSidebar";
import WeeklyScheduler from "../components/WeeklyScheduler";

export default function Dashboard() {
  const [allUsers] = useState<User[]>(users);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // semana navegable
  const [weekStart, setWeekStart] = useState(toWeekStartKey(new Date()));
  const weekLabel = useMemo(() => {
    const s = keyToDate(weekStart); const e = new Date(s); e.setDate(s.getDate()+6);
    return `${fmtRange(s)} – ${fmtRange(e)}`;
  }, [weekStart]);

  // backlog = sin schedule
  const backlog = useMemo(() => tasks.filter(t => !t.schedule), [tasks]);

  function createTask(title: string, assignedTo?: string) {
    setTasks(prev => [{ id:`t_${crypto.randomUUID()}`, title, status:"TODO", createdAt:new Date().toISOString(), assignedTo }, ...prev]);
  }
  function handleAssign(taskId: string, dateKey: string, hour: number|null) {
    setTasks(prev => prev.map(t => t.id===taskId ? { ...t, schedule:{ date: dateKey, hour: hour ?? undefined } } : t));
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TopNav />
      <div className="mx-auto max-w-7xl flex">
        <LeftRail />
        <main className="flex-1 px-4 py-4 space-y-4">
          <CalendarHeader
            weekLabel={weekLabel}
            onToday={() => setWeekStart(toWeekStartKey(new Date()))}
            onPrev={() => setWeekStart(shiftWeek(weekStart, -1))}
            onNext={() => setWeekStart(shiftWeek(weekStart, +1))}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <TaskSidebar users={allUsers} backlog={backlog} onCreate={createTask} />
            <div className="flex-1">
              <WeeklyScheduler
                weekStartKey={weekStart}
                startHour={8}
                endHour={18}
                tasks={tasks}
                users={allUsers}
                onAssign={handleAssign}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function toWeekStartKey(d: Date) {
  const dt = new Date(d); const wd = dt.getDay(); // 0=Dom
  const diff = (wd===0?-6:1) - wd; dt.setDate(dt.getDate()+diff); dt.setHours(0,0,0,0);
  return toKey(dt);
}
function shiftWeek(key: string, delta: number) { const d = keyToDate(key); d.setDate(d.getDate() + (7*delta)); return toKey(d); }
function fmtRange(d: Date) { return d.toLocaleDateString(undefined, { month:"short", day:"numeric", year:"numeric" }); }
function keyToDate(k:string){ const [y,m,d]=k.split("-").map(Number); return new Date(y,m-1,d); }
function toKey(d:Date){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
