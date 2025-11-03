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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import StoreFilters from "@/components/StoreFilters";
import StoreDetailContent from "@/components/StoreDetailContent";
import BottomNavigation from "@/components/BottomNavigation";
import { stores, allReviews } from "@/data/mockStores";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapSearchQuery, setMapSearchQuery] = useState(""); // Para actualizar el mapa solo al presionar Enter
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [mapboxToken] = useState("pk.eyJ1IjoidG9tYXNtaXNyYWhpIiwiYSI6ImNtaDJwZDkwaDJ1eW0yd3B5eDZ6b3Y1djMifQ.44qXpnbdv09ro4NME7QxJQ");
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
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

  // Función para normalizar texto (quitar tildes y convertir a minúsculas)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  // Filtrar comercios para las cards (se actualiza solo al presionar Enter)
  const filteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    
    // Buscar por cualquier palabra del nombre del comercio
    const normalizedSearch = normalizeText(mapSearchQuery);
    const normalizedName = normalizeText(store.name);
    const searchWords = normalizedSearch.split(" ").filter(word => word.length > 0);
    const matchesSearch = searchWords.length === 0 || searchWords.some(word => normalizedName.includes(word));
    
    return matchesCategory && matchesSearch;
  });

  // Filtrar comercios para el mapa (solo se actualiza al presionar Enter)
  const mapFilteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    
    // Buscar por cualquier palabra del nombre del comercio
    const normalizedSearch = normalizeText(mapSearchQuery);
    const normalizedName = normalizeText(store.name);
    const searchWords = normalizedSearch.split(" ").filter(word => word.length > 0);
    const matchesSearch = searchWords.length === 0 || searchWords.some(word => normalizedName.includes(word));
    
    return matchesCategory && matchesSearch;
  });

  // Referencia para los marcadores
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Inicializar Mapbox (solo una vez)
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
      center: [-58.3960002, -34.6043469], // Centro en Escuela Da Vinci, Balvanera
      zoom: 14,
    });

    // Agregar controles de navegación
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Asegurar que los marcadores se agreguen después de que el mapa esté cargado
    map.current.on('load', () => {
      // Forzar actualización de marcadores después de la carga
      if (map.current) {
        const event = new CustomEvent('mapLoaded');
        window.dispatchEvent(event);
      }
    });

    // Cleanup del mapa al desmontar
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken]);

  // Actualizar marcadores cuando cambien los filtros (sin re-crear el mapa)
  useEffect(() => {
    const updateMarkers = () => {
      if (!map.current || !map.current.loaded()) return;

      // Eliminar marcadores existentes
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      // Agregar marcadores para comercios filtrados en el mapa
      mapFilteredStores.forEach((store) => {
        if (map.current) {
          const marker = new mapboxgl.Marker({ color: "#407b41" })
            .setLngLat([store.lng, store.lat])
            .addTo(map.current);

          // Agregar evento click directo al marcador
          marker.getElement().addEventListener('click', () => {
            setSelectedStore(store.id);
          });

          markersRef.current.push(marker);
        }
      });
    };

    updateMarkers();

    // Escuchar evento personalizado de carga del mapa
    window.addEventListener('mapLoaded', updateMarkers);

    return () => {
      window.removeEventListener('mapLoaded', updateMarkers);
    };
  }, [navigate, mapFilteredStores, isDarkMode]);

  // Observar cambios en el modo oscuro
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkModeEnabled = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkModeEnabled);
      
      // Actualizar el estilo del mapa cuando cambia el modo oscuro
      if (map.current && map.current.loaded()) {
        map.current.setStyle(darkModeEnabled ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11");
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Manejar navegación del sheet de notificaciones
  useEffect(() => {
    if (showNotifications) {
      // Agregar una entrada al historial cuando se abren las notificaciones
      window.history.pushState({ notificationsOpen: true }, '');
      
      const handlePopState = (event: PopStateEvent) => {
        setShowNotifications(false);
      };
      
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [showNotifications]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mapa de fondo (fullscreen) */}
      <div ref={mapContainer} className="absolute inset-0 w-full h-full mapbox-container" />
      
      <style>{`
        .mapbox-container .mapboxgl-ctrl-bottom-left,
        .mapbox-container .mapboxgl-ctrl-bottom-right {
          display: none !important;
        }
        .mapbox-container .mapboxgl-ctrl-top-right {
          top: 140px !important;
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

      {/* Controles flotantes sobre el mapa */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 space-y-3">
        {/* Barra de búsqueda y notificaciones */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comercios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setMapSearchQuery(searchQuery);
                  e.currentTarget.blur();
                }
              }}
              className="pl-10 pr-10 bg-white dark:bg-card shadow-lg"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => {
                  setSearchQuery("");
                  setMapSearchQuery("");
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative flex-shrink-0 bg-white dark:bg-card shadow-lg"
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

        {/* Filtros de categoría */}
        <StoreFilters
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setSearchQuery("");
            setMapSearchQuery("");
          }}
        />

        {/* Ubicación */}
        <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg inline-flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium">Balvanera, CABA</span>
        </div>
      </div>

      <BottomNavigation />

      {/* Drawer para mostrar el comercio seleccionado */}
      <Drawer 
        open={!!selectedStore} 
        onOpenChange={(open) => !open && setSelectedStore(null)}
        snapPoints={[0.45, 0.95]}
        fadeFromIndex={1}
      >
        <DrawerContent className="max-h-[96vh]">
          <DrawerHeader>
            <DrawerTitle className="sr-only">
              {stores.find(s => s.id === selectedStore)?.name}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto pb-6">
            {selectedStore && (
              <StoreDetailContent 
                storeId={selectedStore}
                stores={stores}
                allReviews={allReviews}
                showBackButton={false}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Sheet de Notificaciones */}
      <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Notificaciones</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-3 pb-6">
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
                        <X className="w-5 h-5" />
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
