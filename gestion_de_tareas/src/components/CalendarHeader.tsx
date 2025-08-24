type Props = { weekLabel: string; onPrev: () => void; onToday: () => void; onNext: () => void; };
export default function CalendarHeader({ weekLabel, onPrev, onToday, onNext }: Props) {
  const Btn = (p: any) => <button {...p} className={"h-9 px-3 rounded border bg-white hover:bg-gray-50 text-sm " + (p.className ?? "")} />;
  const Tab = ({ active, children }: { active?: boolean; children: any }) => (
    <span className={`h-9 px-3 grid place-items-center rounded border text-sm ${active ? "bg-black text-white" : "bg-gray-50"}`}>{children}</span>
  );
  return (
    <div className="flex items-center justify-between bg-white border rounded-xl p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Btn onClick={onToday}>today</Btn>
        <Btn onClick={onPrev}>⟨</Btn>
        <Btn onClick={onNext}>⟩</Btn>
      </div>
      <h2 className="text-lg sm:text-xl font-semibold">{weekLabel}</h2>
      <div className="hidden sm:flex items-center gap-2">
        <Tab>day</Tab>
        <Tab active>week</Tab>
        <Tab>month</Tab>
        <Tab>agenda</Tab>
      </div>
    </div>
  );
}
