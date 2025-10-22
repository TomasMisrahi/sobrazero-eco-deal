import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Bell, Package, CheckCircle2, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import StoreFilters from "@/components/StoreFilters";
import StoreCard from "@/components/StoreCard";
import BottomNavigation from "@/components/BottomNavigation";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");

  const notifications = [
    {
      id: "1",
      type: "order",
      title: "Pedido confirmado",
      description: "Tu pedido de Panadería Don Juan está listo para retirar",
      time: "Hace 10 min",
      icon: CheckCircle2,
      unread: true,
    },
    {
      id: "2",
      type: "promo",
      title: "Nueva oferta cerca",
      description: "Verdulería Los Andes tiene 60% de descuento",
      time: "Hace 1 hora",
      icon: Package,
      unread: true,
    },
    {
      id: "3",
      type: "reminder",
      title: "Recordatorio de retiro",
      description: "No olvides retirar tu pedido antes de las 20:00",
      time: "Hace 2 horas",
      icon: Clock,
      unread: true,
    },
    {
      id: "4",
      type: "order",
      title: "Pedido completado",
      description: "Gracias por usar SobraZero!",
      time: "Ayer",
      icon: CheckCircle2,
      unread: false,
    },
  ];

  // Mock data - en producción vendría de una API
  const stores = [
    {
      id: "1",
      name: "Panadería Don Juan",
      category: "panaderia",
      lat: -34.603722,
      lng: -58.381592,
      distance: "0.8 km",
      rating: 4.5,
      reviewCount: 127,
      discount: 60,
      pickupTime: "18:00 - 20:00",
      available: 5,
    },
    {
      id: "2",
      name: "Supermercado Express",
      category: "supermercado",
      lat: -34.605722,
      lng: -58.383592,
      distance: "1.2 km",
      rating: 4.2,
      reviewCount: 89,
      discount: 50,
      pickupTime: "19:00 - 21:00",
      available: 8,
    },
    {
      id: "3",
      name: "Verdulería Los Andes",
      category: "verduleria",
      lat: -34.607722,
      lng: -58.379592,
      distance: "1.5 km",
      rating: 4.7,
      reviewCount: 156,
      discount: 55,
      pickupTime: "17:00 - 19:00",
      available: 3,
    },
    {
      id: "4",
      name: "Restaurante La Estancia",
      category: "restaurant",
      lat: -34.601722,
      lng: -58.385592,
      distance: "0.5 km",
      rating: 4.8,
      reviewCount: 203,
      discount: 70,
      pickupTime: "20:00 - 21:30",
      available: 4,
    },
    {
      id: "5",
      name: "Panadería Artesanal",
      category: "panaderia",
      lat: -34.609722,
      lng: -58.377592,
      distance: "2.1 km",
      rating: 4.6,
      reviewCount: 94,
      discount: 65,
      pickupTime: "18:30 - 20:00",
      available: 6,
    },
  ];

  const filteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Inicializar Mapbox
  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-58.381592, -34.603722], // Centro de Capital Federal
      zoom: 13,
    });

    // Agregar controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Agregar marcadores para cada comercio
    filteredStores.forEach((store) => {
      if (map.current) {
        new mapboxgl.Marker({ color: "#407b41" })
          .setLngLat([store.lng, store.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div style="padding: 8px;">
                <h3 style="font-weight: bold; margin-bottom: 4px;">${store.name}</h3>
                <p style="font-size: 12px; color: #666;">${store.discount}% descuento</p>
              </div>`
            )
          )
          .addTo(map.current);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, filteredStores]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar comercios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-card"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative flex-shrink-0"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Villa Crespo, CABA</span>
        </div>

        {/* Map */}
        {!mapboxToken ? (
          <Card className="p-4 space-y-3">
            <Label htmlFor="mapbox-token">Token de Mapbox (requerido para el mapa)</Label>
            <div className="flex gap-2">
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.eyJ1..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Obtén tu token gratuito en{" "}
              <a
                href="https://mapbox.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                mapbox.com
              </a>
            </p>
          </Card>
        ) : (
          <div ref={mapContainer} className="w-full h-[400px] rounded-xl overflow-hidden shadow-card" />
        )}

        {/* Filters */}
        <div>
          <h2 className="text-sm font-semibold mb-3">Categorías</h2>
          <StoreFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Stores List */}
        <div>
          <h2 className="text-sm font-semibold mb-3">
            {filteredStores.length} comercios cercanos
          </h2>
          <div className="space-y-3">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                {...store}
                onClick={() => navigate(`/store/${store.id}`)}
              />
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />

      {/* Sheet de Notificaciones */}
      <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Notificaciones</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`p-4 transition-colors ${
                    notification.unread ? "bg-primary/5 border-primary/20" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.unread ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          notification.unread ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{notification.title}</h3>
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
