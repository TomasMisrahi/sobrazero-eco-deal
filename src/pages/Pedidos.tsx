import { Clock, MapPin, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";

const Pedidos = () => {
  // Mock data - en producción vendría de una API
  const orders = [
    {
      id: "1",
      storeName: "Panadería Don Juan",
      status: "pending",
      pickupTime: "18:00 - 20:00",
      address: "Av. Corrientes 1234, Balvanera",
      total: 1000,
      items: 2,
      date: "Hoy",
    },
    {
      id: "2",
      storeName: "Restaurante La Estancia",
      status: "completed",
      pickupTime: "20:00 - 21:30",
      address: "Av. Rivadavia 5678, Caballito",
      total: 1500,
      items: 1,
      date: "Ayer",
    },
  ];

  const getStatusLabel = (status: string) => {
    return status === "pending" ? "Pendiente" : "Completado";
  };

  const getStatusVariant = (status: string) => {
    return status === "pending" ? "default" : "secondary";
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">No tenés pedidos</h2>
            <p className="text-sm text-muted-foreground">
              Cuando reserves una bolsa sorpresa, aparecerá aquí
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{order.storeName}</h3>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant={getStatusVariant(order.status)}>
                    {getStatusLabel(order.status)}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{order.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Retiro: {order.pickupTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="w-4 h-4" />
                    <span>{order.items} {order.items === 1 ? "producto" : "productos"}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-lg font-bold text-primary">
                    ${order.total.toLocaleString()}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Pedidos;
