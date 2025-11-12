import { Clock, MapPin, Package, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import DecorativeShapes from "@/components/DecorativeShapes";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Pedidos = () => {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  // Leer pedidos del localStorage o crear ejemplos
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    if (!savedOrders || JSON.parse(savedOrders).length === 0) {
      // Si no hay pedidos, crear ejemplos
      const exampleOrders = [
        {
          id: "example-1",
          storeName: "Panadería Don Juan",
          status: "pending",
          pickupTime: "18:00 - 20:00",
          address: "Av. Corrientes 2850, Balvanera",
          total: 1000,
          items: 1,
          date: "Hoy",
          products: [
            { name: "Medialunas", quantity: "6 unidades" },
            { name: "Pan francés", quantity: "500g" },
            { name: "Facturas surtidas", quantity: "4 unidades" },
            { name: "Pan de campo", quantity: "1kg" },
          ],
        },
        {
          id: "example-2",
          storeName: "Supermercado Express",
          status: "picked_up",
          pickupTime: "19:00 - 21:00",
          address: "Av. Pueyrredón 258, Balvanera",
          total: 3000,
          items: 2,
          date: "Ayer",
          products: [
            { name: "Frutas de estación variadas", quantity: "2kg" },
            { name: "Verduras frescas mixtas", quantity: "1.5kg" },
            { name: "Lácteos (leche, yogurt)", quantity: "3 unidades" },
            { name: "Pan del día", quantity: "500g" },
          ],
        },
        {
          id: "example-3",
          storeName: "Restaurante La Estancia",
          status: "cancelled",
          pickupTime: "20:00 - 21:30",
          address: "Av. Rivadavia 2380, Balvanera",
          total: 1500,
          items: 1,
          date: "Hace 2 días",
          products: [
            { name: "Milanesa napolitana con guarnición", quantity: "1 porción" },
            { name: "Tarta de verduras", quantity: "1 porción" },
            { name: "Flan casero con dulce de leche", quantity: "1 porción" },
          ],
        },
        {
          id: "example-4",
          storeName: "Verdulería Los Andes",
          status: "picked_up",
          pickupTime: "17:00 - 19:00",
          address: "Av. Córdoba 2645, Balvanera",
          total: 1800,
          items: 2,
          date: "Hace 3 días",
          products: [
            { name: "Tomates", quantity: "1 kilo" },
            { name: "Lechuga", quantity: "2 unidades" },
            { name: "Manzanas", quantity: "1 kilo" },
            { name: "Zanahorias", quantity: "medio kilo" },
          ],
        },
      ];
      localStorage.setItem("orders", JSON.stringify(exampleOrders));
      return exampleOrders;
    }
    return JSON.parse(savedOrders);
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

  const toggleExpanded = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleReorder = (order: any) => {
    const newOrder = {
      ...order,
      id: `order-${Date.now()}`,
      status: "pending",
      date: "Hoy",
    };
    
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    toast.success(`Pedido de ${order.storeName} agregado nuevamente`);
  };

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <DecorativeShapes />
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
          
          {/* Filtros */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              Todos
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pendiente
            </Button>
            <Button
              variant={statusFilter === "picked_up" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("picked_up")}
            >
              Retirado
            </Button>
            <Button
              variant={statusFilter === "cancelled" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("cancelled")}
            >
              Cancelado
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 relative z-10">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">No tenés pedidos</h2>
            <p className="text-sm text-muted-foreground">
              Cuando reserves una bolsa sorpresa, aparecerá aquí
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
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
                </div>

                <Collapsible
                  open={expandedOrders.includes(order.id)}
                  onOpenChange={() => toggleExpanded(order.id)}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-muted-foreground" />
                    <CollapsibleTrigger className="text-green-600 underline cursor-pointer hover:text-green-700">
                      {order.items} {order.items === 1 ? "producto" : "productos"}
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-2">
                    <div className="p-3 bg-muted/50 rounded-md">
                      <ul className="space-y-1.5">
                        {order.products?.map((product: any, index: number) => (
                          <li key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{product.name}</span>
                            <span className="font-medium">{product.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>


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
                      className="w-full"
                      size="sm"
                    >
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
