import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Bell, Package, CheckCircle2, Clock, X } from "lucide-react";
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [mapboxToken] = useState("pk.eyJ1IjoidG9tYXNtaXNyYWhpIiwiYSI6ImNtaDJwZDkwaDJ1eW0yd3B5eDZ6b3Y1djMifQ.44qXpnbdv09ro4NME7QxJQ");
  const [notifications, setNotifications] = useState([
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
  ]);

  const unreadNotifications = notifications.filter(n => n.unread).length;

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleDeleteAllNotifications = () => {
    setNotifications([]);
  };

  // Mock data - en producción vendría de una API
  const stores = [
    {
      id: "1",
      name: "Panadería Don Juan",
      category: "panaderia",
      lat: -34.599722,
      lng: -58.438611,
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
      lat: -34.601500,
      lng: -58.440200,
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
      lat: -34.597800,
      lng: -58.436500,
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
      category: "restaurante",
      lat: -34.598500,
      lng: -58.441000,
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
      lat: -34.602000,
      lng: -58.437000,
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
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-58.438611, -34.599722], // Centro de Villa Crespo
      zoom: 14,
    });

    // Agregar controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Esperar a que el mapa se cargue antes de agregar marcadores
    map.current.on('load', () => {
      const markers: mapboxgl.Marker[] = [];

      // Agregar marcadores para cada comercio
      stores.forEach((store) => {
        if (map.current) {
          // Obtener el nombre de la categoría en español
          const categoryNames: { [key: string]: string } = {
            panaderia: "Panadería",
            supermercado: "Supermercado",
            verduleria: "Verdulería",
            restaurante: "Restaurante",
          };

          const popup = new mapboxgl.Popup({ 
            offset: 25,
            closeButton: false,
            className: 'mapbox-popup-custom'
          }).setHTML(
            `<div style="padding: 12px; min-width: 220px; cursor: pointer;" class="store-popup" data-store-id="${store.id}">
              <h3 style="font-weight: 600; margin-bottom: 4px; font-size: 14px; color: #1a1a1a;">${store.name}</h3>
              <p style="font-size: 12px; color: #666; margin-bottom: 8px;">${categoryNames[store.category]}</p>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <span style="background: #407b41; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
                  ${store.discount}% OFF
                </span>
                <span style="font-size: 12px; color: #666;">⭐ ${store.rating}</span>
              </div>
              <p style="font-size: 12px; color: #666; margin-bottom: 4px;">📍 ${store.distance}</p>
              <p style="font-size: 12px; color: #666; margin-bottom: 8px;">🕐 ${store.pickupTime}</p>
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0; text-align: center;">
                <span style="font-size: 12px; color: #407b41; font-weight: 600;">👉 Click para ver detalles</span>
              </div>
            </div>`
          );

          const marker = new mapboxgl.Marker({ color: "#407b41" })
            .setLngLat([store.lng, store.lat])
            .setPopup(popup)
            .addTo(map.current);

          markers.push(marker);

          // Agregar evento click al popup cuando se abre
          popup.on('open', () => {
            const popupElement = document.querySelector(`[data-store-id="${store.id}"]`);
            if (popupElement) {
              popupElement.addEventListener('click', () => {
                navigate(`/store/${store.id}`);
              });
            }
          });
        }
      });

      // Cleanup markers cuando se desmonte el componente
      return () => {
        markers.forEach(marker => marker.remove());
      };
    });

    // Cleanup del mapa
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [navigate]);

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
        <div className="relative">
          <div ref={mapContainer} className="w-full h-[400px] rounded-xl overflow-hidden shadow-card mapbox-container" />
          <style>{`
            .mapbox-container .mapboxgl-ctrl-bottom-left,
            .mapbox-container .mapboxgl-ctrl-bottom-right {
              display: none !important;
            }
            .mapbox-popup-custom .mapboxgl-popup-content {
              padding: 0;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .mapbox-popup-custom .mapboxgl-popup-tip {
              border-top-color: white;
            }
          `}</style>
        </div>

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
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">No hay notificaciones</p>
              </div>
            ) : (
              <>
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Card
                      key={notification.id}
                      className={`p-4 transition-colors relative ${
                        notification.unread ? "bg-primary/5 border-primary/20" : ""
                      }`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => handleDeleteNotification(notification.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
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
                        <div className="flex-1 min-w-0 pr-6">
                          <h3 className="font-semibold text-sm mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={handleDeleteAllNotifications}
                >
                  Eliminar todas las notificaciones
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
