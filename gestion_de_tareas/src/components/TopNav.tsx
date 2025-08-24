export default function TopNav() {
    return (
      <div className="h-12 bg-sky-700 text-white">
        <div className="h-full mx-auto max-w-7xl px-4 flex items-center justify-between">
          <div className="font-semibold tracking-tight">TManager<span className="text-white/70 text-xs align-top ml-1">BETA</span></div>
          <div className="flex items-center gap-3">
            <button className="rounded px-3 py-1 text-sm hover:bg-sky-600">Integrations</button>
            <div className="h-7 w-7 rounded-full bg-white/30" title="Profile" />
          </div>
        </div>
      </div>
    );
  }
  