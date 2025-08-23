import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Sistema de Tareas</h1>
        <p className="mb-6 text-gray-600">Colabora con tu equipo en proyectos y tareas.</p>
        <div className="flex gap-4">
          <Link to="/register" className="bg-black text-white px-4 py-2 rounded">Registrarme</Link>
          <Link to="/login" className="border px-4 py-2 rounded">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
}
