import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, FileText, Newspaper, LayoutDashboard } from "lucide-react";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/cases", label: "Casos", icon: Newspaper },
  { path: "/admin/articles", label: "Artículos", icon: FileText },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <span className="label-mono">Cargando...</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <p className="font-display text-xl">Acceso denegado</p>
        <p className="text-sm text-muted-foreground">No tienes permisos de administrador.</p>
        <Button variant="outline" onClick={() => { signOut(); navigate("/admin/login"); }}>
          Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r border-foreground/10 flex flex-col">
        <div className="p-4 border-b border-foreground/10">
          <h2 className="font-display text-lg font-bold">Admin</h2>
          <p className="label-mono truncate">{user.email}</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors rounded-sm ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-2 border-t border-foreground/10">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Ver sitio público
          </button>
          <button
            onClick={() => { signOut(); navigate("/admin/login"); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
