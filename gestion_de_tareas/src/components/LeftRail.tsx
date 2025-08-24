export default function LeftRail() {
    const Btn = ({ label }: { label: string }) => (
      <button
        className="h-10 w-10 grid place-items-center rounded text-white/90 hover:bg-white/10"
        title={label}
      >
        {/* cuadrito tipo icono */}
        <div className="h-4 w-4 rounded-sm border border-white/60" />
      </button>
    );
    return (
      <aside className="hidden sm:flex sm:flex-col sm:w-12 bg-sky-700 text-white py-2 gap-2">
        <Btn label="Calendar" />
        <Btn label="Board" />
        <Btn label="Tasks" />
      </aside>
    );
  }
  