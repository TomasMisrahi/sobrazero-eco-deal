import { ArrowLeft, Bell } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import DecorativeShapes from "@/components/DecorativeShapes";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Notificaciones = () => {
  const navigate = useNavigate();
  const [notifyNewStores, setNotifyNewStores] = useState(true);
  const [notifyOffers, setNotifyOffers] = useState(true);
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyPush, setNotifyPush] = useState(false);

  const handleToggle = (setter: (value: boolean) => void, name: string) => {
    return (checked: boolean) => {
      setter(checked);
      toast.success(checked ? `${name} activadas` : `${name} desactivadas`);
    };
  };

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <DecorativeShapes />
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/perfil")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Notificaciones</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4 relative z-10">
        {/* Notification Settings */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Preferencias de notificaciones
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-new-stores" className="cursor-pointer">
                  Nuevos comercios
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Cuando se sumen comercios cerca de ti
                </p>
              </div>
              <Switch
                id="notify-new-stores"
                checked={notifyNewStores}
                onCheckedChange={handleToggle(setNotifyNewStores, "Notificaciones de nuevos comercios")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-offers" className="cursor-pointer">
                  Ofertas especiales
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Descuentos y promociones exclusivas
                </p>
              </div>
              <Switch
                id="notify-offers"
                checked={notifyOffers}
                onCheckedChange={handleToggle(setNotifyOffers, "Notificaciones de ofertas")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-orders" className="cursor-pointer">
                  Estado de pedidos
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Actualizaciones sobre tus reservas
                </p>
              </div>
              <Switch
                id="notify-orders"
                checked={notifyOrders}
                onCheckedChange={handleToggle(setNotifyOrders, "Notificaciones de pedidos")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Label htmlFor="notify-push" className="cursor-pointer">
                  Notificaciones push
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Recibe alertas sobre ofertas cercanas
                </p>
              </div>
              <Switch
                id="notify-push"
                checked={notifyPush}
                onCheckedChange={handleToggle(setNotifyPush, "Notificaciones push")}
              />
            </div>
          </div>
        </Card>

      </main>
    </div>
  );
};

export default Notificaciones;
