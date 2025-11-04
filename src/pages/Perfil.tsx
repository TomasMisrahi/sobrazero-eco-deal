import { Settings, LogOut, Bell, HelpCircle, ChevronRight, Edit, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Perfil = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Estado local para datos del usuario
  const [user] = useState({
    name: "María González",
    completedOrders: 12,
  });

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    setShowLogoutDialog(false);
    navigate("/autenticacion");
  };

  const menuItems = [
    {
      icon: Edit,
      label: "Editar perfil",
      path: "/perfil/editar",
    },
    {
      icon: Settings,
      label: "Configuración",
      path: "/perfil/configuracion",
    },
    {
      icon: Bell,
      label: "Notificaciones",
      path: "/perfil/notificaciones",
    },
    {
      icon: HelpCircle,
      label: "Centro de ayuda",
      path: "/perfil/centro-ayuda",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Mi Perfil</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {/* Profile Info and Stats */}
        <Card className="p-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-20 h-20 mb-3">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xl font-bold text-primary mb-1">
                {user.completedOrders * 2.5}kg
              </p>
              <p className="text-xs text-muted-foreground">
                de comida salvada
              </p>
            </div>

            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xl font-bold text-primary mb-1">
                ${(user.completedOrders * 450).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                ahorrados en total
              </p>
            </div>

            <div className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20">
              <ShoppingBag className="w-6 h-6 mx-auto mb-1 text-primary" />
              <p className="text-xl font-bold text-primary mb-1">
                {user.completedOrders}
              </p>
              <p className="text-xs text-muted-foreground">
                pedidos
              </p>
            </div>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowLogoutDialog(true)}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </main>

      {/* Logout Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro que desea cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              Deberás volver a iniciar sesión para acceder a tu cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BottomNavigation />
    </div>
  );
};

export default Perfil;
