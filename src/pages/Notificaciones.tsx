import { ArrowLeft, Bell, BellOff, MapPin, ShoppingBag, Percent } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Notificaciones = () => {
  const navigate = useNavigate();
  const [notifyNewStores, setNotifyNewStores] = useState(true);
  const [notifyOffers, setNotifyOffers] = useState(true);
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyNearby, setNotifyNearby] = useState(false);

  // Mock notification history
  const notifications = [
    {
      id: 1,
      type: "offer",
      icon: Percent,
      title: "¡Nueva oferta disponible!",
      message: "Panadería Don José tiene 50% de descuento en packs sorpresa",
      time: "Hace 2 horas",
      read: false,
    },
    {
      id: 2,
      type: "order",
      icon: ShoppingBag,
      title: "Pedido confirmado",
      message: "Tu pedido de Frutas del Huerto está listo para recoger",
      time: "Hace 5 horas",
      read: false,
    },
    {
      id: 3,
      type: "nearby",
      icon: MapPin,
      title: "Nuevo comercio cerca",
      message: "Sushi Express acaba de unirse a 0.8 km de ti",
      time: "Ayer",
      read: true,
    },
    {
      id: 4,
      type: "offer",
      icon: Percent,
      title: "Última oportunidad",
      message: "Solo quedan 2 packs en La Esquina Verde",
      time: "Hace 2 días",
      read: true,
    },
  ];

  const handleToggle = (setter: (value: boolean) => void, name: string) => {
    return (checked: boolean) => {
      setter(checked);
      toast.success(checked ? `${name} activadas` : `${name} desactivadas`);
    };
  };

  return (
    <div className="min-h-screen bg-background pb-20">
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
      <main className="px-4 py-4 space-y-4">
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
                <Label htmlFor="notify-nearby" className="cursor-pointer">
                  Ofertas cercanas
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Cuando haya ofertas a menos de 1km
                </p>
              </div>
              <Switch
                id="notify-nearby"
                checked={notifyNearby}
                onCheckedChange={handleToggle(setNotifyNearby, "Notificaciones de ofertas cercanas")}
              />
            </div>
          </div>
        </Card>

        {/* Notification History */}
        <div>
          <h2 className="font-semibold mb-3 px-1">Historial</h2>
          <div className="space-y-2">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`p-4 ${!notification.read ? "bg-primary/5 border-primary/20" : ""}`}
                >
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      !notification.read ? "bg-primary/10" : "bg-muted"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        !notification.read ? "text-primary" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm leading-tight">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            Nueva
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Clear All */}
        <Button variant="outline" className="w-full">
          <BellOff className="w-4 h-4 mr-2" />
          Marcar todas como leídas
        </Button>
      </main>
    </div>
  );
};

export default Notificaciones;
