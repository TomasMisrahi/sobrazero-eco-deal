import { Clock, MapPin, Package, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Pedidos = () => {
  // Leer pedidos del localStorage
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Actualizar cuando cambien los pedidos
  useEffect(() => {
    const handleStorageChange = () => {
      const savedOrders = localStorage.getItem("orders");
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Intervalo para verificar cambios locales
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      case "picked_up":
        return "Retirado";
      default:
        return "Completado";
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "pending":
        return "default";
      case "cancelled":
        return "destructive";
      case "picked_up":
        return "secondary";
      default:
        return "secondary";
    }
  };

  const handleReorder = (order: any) => {
    toast.success(`Pedido agregado nuevamente: ${order.storeName}`);
    // Aquí puedes agregar la lógica para volver a crear el pedido
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

                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                  
                  {order.status === "picked_up" && (
                    <Button 
                      onClick={() => handleReorder(order)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Volver a pedir
                    </Button>
                  )}
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
