import Button from "./ui/Button";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-black" />
          <span className="font-semibold tracking-tight">Gestión de Tareas</span>
        </div>
        <nav className="hidden sm:flex items-center gap-2">
          <Button variant="ghost">Documentación</Button>
          <Button variant="ghost">Soporte</Button>
          <Button variant="secondary">Mi cuenta</Button>
        </nav>
        <div className="sm:hidden">
          <Button variant="secondary">Menú</Button>
        </div>
      </div>
    </header>
  );
}
