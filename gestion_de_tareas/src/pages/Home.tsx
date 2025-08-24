import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 pt-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Sistema de Tareas Colaborativas</h1>
          <p className="mt-3 text-gray-600">
            Organiza proyectos, arrastra tareas entre columnas y colabora con tu equipo.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/dashboard"><Button>Ir al Dashboard</Button></Link>
            <Link to="/login"><Button variant="secondary">Iniciar sesión</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
