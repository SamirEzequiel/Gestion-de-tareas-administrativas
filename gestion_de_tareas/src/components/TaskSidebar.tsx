import { useState } from "react";
import type { Task, User } from "../types";
import Button from "./ui/Button";
import TextField from "./ui/TextField";
import Select from "./ui/Select";

type Props = { users: User[]; backlog: Task[]; onCreate: (title: string, assignedTo?: string) => void; };

export default function TaskSidebar({ users, backlog, onCreate }: Props) {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState<string>(users[0]?.id ?? "");

  return (
    <aside className="w-full sm:w-80 shrink-0">
      <div className="bg-white border rounded-xl p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Tasks</h3>
          <button className="h-8 w-8 grid place-items-center rounded hover:bg-gray-100">≡</button>
        </div>

        <div className="mt-3">
          <div className="text-xs uppercase text-gray-500 mb-2">General</div>
          <TextField placeholder="Add a New Task" value={title} onChange={e=>setTitle(e.target.value)} />
          <div className="mt-2 flex gap-2">
            <Select value={userId} onChange={e=>setUserId(e.target.value)}>
              {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
            </Select>
            <Button onClick={() => { if (title.trim()) { onCreate(title.trim(), userId); setTitle(""); }}}>Add</Button>
          </div>

          <ul className="mt-4 space-y-2">
            {backlog.map(t => (
              <li key={t.id}>
                <div
                  className="bg-white border rounded-md px-3 py-2 text-sm shadow-sm cursor-grab active:cursor-grabbing flex items-center justify-between"
                  draggable
                  onDragStart={(e) => { e.dataTransfer.setData("text/plain", t.id); e.dataTransfer.effectAllowed="move"; }}
                  title={t.title}
                >
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-gray-500">TManager › General</div>
                  </div>
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
