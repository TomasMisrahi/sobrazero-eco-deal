import { User, Mail, Phone, MapPin, Heart, Settings, LogOut } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";

const Perfil = () => {
  // Mock data - en producción vendría de una API
  const user = {
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+54 9 11 1234-5678",
    address: "Balvanera, CABA",
    savedStores: 8,
    completedOrders: 23,
  };

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
  };

  const menuItems = [
    {
      icon: Heart,
      label: "Comercios favoritos",
      value: user.savedStores,
    },
    {
      icon: Settings,
      label: "Configuración",
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
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-20 h-20 mb-3">
              <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.completedOrders} pedidos realizados
            </p>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{user.address}</span>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary mb-1">
              {user.completedOrders * 850}kg
            </p>
            <p className="text-xs text-muted-foreground">
              de comida salvada del desperdicio
            </p>
          </div>
        </Card>

        {/* Menu Items */}
        <Card className="divide-y divide-border">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.value && (
                  <span className="text-sm text-muted-foreground">
                    {item.value}
                  </span>
                )}
              </button>
            );
          })}
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </Button>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Perfil;
