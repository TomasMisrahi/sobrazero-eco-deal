import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Bell, Package, CheckCircle2, Clock, X, Star, TrendingDown, ExternalLink } from "lucide-react";
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

  // Función para normalizar texto (quitar tildes y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    
    // Buscar por cualquier palabra del nombre del comercio
    const normalizedSearch = normalizeText(searchQuery);
    const normalizedName = normalizeText(store.name);
    const searchWords = normalizedSearch.split(" ").filter(word => word.length > 0);
    const matchesSearch = searchWords.length === 0 || searchWords.some(word => normalizedName.includes(word));
    
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
    let markers: mapboxgl.Marker[] = [];

    const updateMarkers = () => {
      // Eliminar marcadores existentes
      markers.forEach(marker => marker.remove());
      markers = [];

      // Agregar marcadores para comercios filtrados
      const storesToShow = selectedCategory === "all" 
        ? stores 
        : stores.filter(store => store.category === selectedCategory);

      storesToShow.forEach((store) => {
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
            `<div style="padding: 12px; min-width: 200px; cursor: pointer; font-family: system-ui, -apple-system, sans-serif; background-color: #f5f5dc;" class="store-popup" data-store-id="${store.id}">
              <h3 style="font-weight: 600; font-size: 14px; color: #1a1a1a; margin: 0 0 8px 0;">${store.name}</h3>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="color: #407b41; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 3px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                  ${store.discount}%
                </span>
                <span style="font-size: 12px; color: #666; display: flex; align-items: center; gap: 2px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  ${store.rating}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: #666;">
                <span style="display: flex; align-items: center; gap: 3px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#407b41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  ${store.pickupTime}
                </span>
                <span style="display: flex; align-items: center; gap: 3px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#407b41" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  ${store.distance}
                </span>
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
    };

    map.current.on('load', () => {
      updateMarkers();
    });

    // Actualizar marcadores cuando cambie la categoría seleccionada
    if (map.current && map.current.loaded()) {
      updateMarkers();
    }

    // Cleanup del mapa y marcadores
    return () => {
      markers.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [navigate, selectedCategory]);

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
