import { User, Mail, Phone, MapPin, Settings, LogOut, Bell, HelpCircle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

const profileSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  email: z.string().trim().email("Email inválido").max(255, "Máximo 255 caracteres"),
  phone: z.string().trim().min(1, "El teléfono es requerido").max(20, "Máximo 20 caracteres"),
  address: z.string().trim().min(1, "La dirección es requerida").max(200, "Máximo 200 caracteres"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Perfil = () => {
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Estado local para datos del usuario
  const [user, setUser] = useState({
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+54 9 11 1234-5678",
    address: "Balvanera, CABA",
    completedOrders: 12,
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    // Actualizar estado local
    setUser({
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });
    toast.success("Perfil actualizado correctamente");
  };

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    setShowLogoutDialog(false);
    navigate("/autenticacion");
  };

  const menuItems = [
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

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Nombre completo
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Teléfono
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      Dirección
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Guardar cambios
              </Button>
            </form>
          </Form>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary mb-1">
                {user.completedOrders * 2.5}kg
              </p>
              <p className="text-xs text-muted-foreground">
                de comida salvada
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-accent/5 border-accent/20">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent mb-1">
                ${(user.completedOrders * 450).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                ahorrados en total
              </p>
            </div>
          </Card>
        </div>

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
