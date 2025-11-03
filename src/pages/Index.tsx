import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Bell, Package, CheckCircle2, Clock, X, Star, TrendingDown, ExternalLink, ShoppingBag, Heart } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import StoreFilters from "@/components/StoreFilters";
import StoreCard from "@/components/StoreCard";
import ReviewSection from "@/components/ReviewSection";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";
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
  const [quantity, setQuantity] = useState(1);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
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
      lat: -34.6025,
      lng: -58.3945,
      distance: "0.5 km",
      address: "Av. Corrientes 2850, Balvanera",
      rating: 4.5,
      reviewCount: 127,
      discount: 60,
      originalPrice: 2500,
      discountedPrice: 1000,
      pickupTime: "18:00 - 20:00",
      available: 5,
      description: "Bolsa sorpresa con productos de panadería frescos del día: pan, facturas, medialunas y más. Todos los productos están en perfecto estado.",
    },
    {
      id: "2",
      name: "Supermercado Express",
      category: "supermercado",
      lat: -34.6058,
      lng: -58.3975,
      distance: "0.9 km",
      address: "Av. Pueyrredón 258, Balvanera",
      rating: 4.2,
      reviewCount: 89,
      discount: 50,
      originalPrice: 3000,
      discountedPrice: 1500,
      pickupTime: "19:00 - 21:00",
      available: 8,
      description: "Bolsa sorpresa con variedad de productos: verduras, frutas, lácteos y otros productos frescos. Perfecto para abastecer tu hogar.",
    },
    {
      id: "3",
      name: "Verdulería Los Andes",
      category: "verduleria",
      lat: -34.6070,
      lng: -58.3950,
      distance: "0.7 km",
      address: "Av. Córdoba 2645, Balvanera",
      rating: 4.7,
      reviewCount: 156,
      discount: 55,
      originalPrice: 2000,
      discountedPrice: 900,
      pickupTime: "17:00 - 19:00",
      available: 3,
      description: "Bolsa sorpresa con frutas y verduras frescas de estación. Productos de excelente calidad directos de la quinta.",
    },
    {
      id: "4",
      name: "Restaurante La Estancia",
      category: "restaurante",
      lat: -34.6032,
      lng: -58.4005,
      distance: "0.3 km",
      address: "Av. Rivadavia 2380, Balvanera",
      rating: 4.8,
      reviewCount: 203,
      discount: 70,
      originalPrice: 5000,
      discountedPrice: 1500,
      pickupTime: "20:00 - 21:30",
      available: 4,
      description: "Bolsa sorpresa con platos de restaurante preparados del día: minutas, guarniciones y postres. Comida casera de alta calidad.",
    },
    {
      id: "5",
      name: "Panadería Artesanal",
      category: "panaderia",
      lat: -34.6048,
      lng: -58.3918,
      distance: "1.2 km",
      address: "Av. Callao 348, Balvanera",
      rating: 4.6,
      reviewCount: 94,
      discount: 65,
      originalPrice: 2800,
      discountedPrice: 980,
      pickupTime: "18:30 - 20:00",
      available: 6,
      description: "Bolsa sorpresa con pan artesanal, masas dulces y productos de pastelería. Todo elaborado con masa madre y productos naturales.",
    },
  ];

  // Reviews por comercio
  const allReviews: Record<string, any[]> = {
    "1": [
      {
        id: "1",
        userName: "María González",
        rating: 5,
        comment: "Excelente calidad y variedad. Las medialunas estaban perfectas!",
        date: "Hace 2 días",
      },
      {
        id: "2",
        userName: "Carlos Pérez",
        rating: 4,
        comment: "Muy buena relación precio-calidad. Repetiré seguro.",
        date: "Hace 5 días",
      },
    ],
    "2": [
      {
        id: "1",
        userName: "Laura Martínez",
        rating: 4,
        comment: "Buena variedad de productos frescos. El precio es excelente.",
        date: "Hace 1 día",
      },
      {
        id: "2",
        userName: "Diego Rodríguez",
        rating: 5,
        comment: "Siempre encuentro productos de calidad. Muy recomendable.",
        date: "Hace 3 días",
      },
    ],
    "3": [
      {
        id: "1",
        userName: "Ana López",
        rating: 5,
        comment: "Las frutas y verduras están súper frescas. Volveré!",
        date: "Hace 1 día",
      },
      {
        id: "2",
        userName: "Roberto Sánchez",
        rating: 5,
        comment: "Productos de primera calidad a excelente precio.",
        date: "Hace 4 días",
      },
    ],
    "4": [
      {
        id: "1",
        userName: "Silvia Fernández",
        rating: 5,
        comment: "La comida es deliciosa! Como si fuera casera.",
        date: "Hace 2 días",
      },
      {
        id: "2",
        userName: "Pablo Torres",
        rating: 4,
        comment: "Muy buenas porciones y sabor excelente.",
        date: "Hace 1 semana",
      },
    ],
    "5": [
      {
        id: "1",
        userName: "Gabriela Ruiz",
        rating: 5,
        comment: "El mejor pan artesanal del barrio. Vale la pena!",
        date: "Hace 1 día",
      },
      {
        id: "2",
        userName: "Martín Castro",
        rating: 5,
        comment: "La masa madre es espectacular. Todo súper fresco.",
        date: "Hace 5 días",
      },
    ],
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
          const popup = new mapboxgl.Popup({ 
            offset: 25,
            closeButton: false,
            className: 'mapbox-popup-custom'
          }).setHTML(
            `<div style="padding: 12px; min-width: 200px; cursor: pointer; font-family: system-ui, -apple-system, sans-serif; background-color: ${isDarkMode ? '#3e4345' : '#f5f5dc'}; color: ${isDarkMode ? '#ede8e4' : '#1a1a1a'};" class="store-popup" data-store-id="${store.id}">
              <h3 style="font-weight: 600; font-size: 14px; margin: 0 0 8px 0;">${store.name}</h3>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="color: #407b41; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 3px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                    <polyline points="16 17 22 17 22 11"></polyline>
                  </svg>
                  ${store.discount}%
                </span>
                <span style="font-size: 12px; color: ${isDarkMode ? '#b5b0a9' : '#666'}; display: flex; align-items: center; gap: 2px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  ${store.rating}
                </span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: ${isDarkMode ? '#b5b0a9' : '#666'};">
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

          markersRef.current.push(marker);

          // Agregar evento click al popup cuando se abre
          popup.on('open', () => {
            const popupElement = document.querySelector(`[data-store-id="${store.id}"]`);
            if (popupElement) {
              popupElement.addEventListener('click', () => {
                setSelectedStore(store.id);
                popup.remove(); // Cerrar el popup cuando se abre el drawer
              });
            }
          });
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

  const selectedStoreData = stores.find(s => s.id === selectedStore);
  const baseReviews = selectedStoreData ? (allReviews[selectedStoreData.id] || []) : [];
  const reviews = [...localReviews, ...baseReviews];

  // Verificar si el usuario ha reservado en este comercio
  const hasReserved = (storeId: string | null) => {
    if (!storeId) return false;
    const ordersData = localStorage.getItem("orders");
    if (!ordersData) return false;
    
    const orders = JSON.parse(ordersData);
    const storeData = stores.find(s => s.id === storeId);
    return orders.some((order: any) => storeData && order.storeName === storeData.name);
  };

  const handleReserve = () => {
    if (!selectedStoreData) return;

    const newOrder = {
      id: Date.now().toString(),
      storeName: selectedStoreData.name,
      status: "pending",
      pickupTime: selectedStoreData.pickupTime,
      address: selectedStoreData.address,
      total: selectedStoreData.discountedPrice * quantity,
      items: quantity,
      date: "Hoy",
    };

    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Reserva confirmada!", {
      description: `Retirá tu pedido hoy entre ${selectedStoreData.pickupTime}`,
    });

    setQuantity(1);
  };

  const handleAddReview = () => {
    if (!newReviewComment.trim()) {
      toast.error("Por favor escribí un comentario");
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userName: "Usuario Actual",
      rating: newReviewRating,
      comment: newReviewComment,
      date: "Ahora",
    };

    setLocalReviews([newReview, ...localReviews]);
    setNewReviewComment("");
    setNewReviewRating(5);
    
    toast.success("¡Reseña agregada con éxito!");
  };

  const handleToggleFavorite = () => {
    if (!selectedStore) return;
    
    const favorites = localStorage.getItem("favorites");
    let favArray: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favArray = favArray.filter(favId => favId !== selectedStore);
      toast.success("Eliminado de favoritos");
    } else {
      favArray.push(selectedStore);
      toast.success("Agregado a favoritos");
    }
    
    localStorage.setItem("favorites", JSON.stringify(favArray));
    setIsFavorite(!isFavorite);
  };

  // Actualizar isFavorite cuando cambia el comercio seleccionado
  useEffect(() => {
    if (selectedStore) {
      const favorites = localStorage.getItem("favorites");
      if (favorites) {
        const favArray = JSON.parse(favorites);
        setIsFavorite(favArray.includes(selectedStore));
      } else {
        setIsFavorite(false);
      }
      // Resetear cantidad al cambiar de comercio
      setQuantity(1);
    }
  }, [selectedStore]);

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
              {selectedStoreData?.name}
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto pb-6">
            {selectedStoreData && (
              <>
                {/* Header con imagen */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <ShoppingBag className="w-20 h-20 text-primary/40" />
                  </div>
                </div>

                <div className="px-4">
                  {/* Info Card */}
                  <Card className="p-4 mb-4 shadow-card-hover">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h1 className="text-xl font-bold mb-1">{selectedStoreData.name}</h1>
                        <p className="text-sm text-muted-foreground capitalize">{selectedStoreData.category}</p>
                      </div>
                      <button
                        onClick={handleToggleFavorite}
                        className="flex-shrink-0 text-success hover:scale-110 transition-transform"
                      >
                        <Heart className={`w-6 h-6 ${isFavorite ? 'fill-success' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{selectedStoreData.rating}</span>
                      <span className="text-sm text-muted-foreground">({selectedStoreData.reviewCount} reseñas)</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{selectedStoreData.address} · {selectedStoreData.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Retiro hoy: {selectedStoreData.pickupTime}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Descripción */}
                  <Card className="p-4 mb-4">
                    <h2 className="font-semibold mb-2">¿Qué incluye?</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedStoreData.description}
                    </p>
                  </Card>

                  {/* Precio y cantidad */}
                  <Card className="p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground line-through">
                          ${selectedStoreData.originalPrice.toLocaleString()} aprox.
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ${selectedStoreData.discountedPrice.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="font-semibold w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.min(selectedStoreData.available, quantity + 1))}
                          disabled={quantity >= selectedStoreData.available}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground text-center mb-3">
                      {selectedStoreData.available} unidades disponibles
                    </p>

                    <Button className="w-full" size="lg" onClick={handleReserve}>
                      Reservar por ${(selectedStoreData.discountedPrice * quantity).toLocaleString()}
                    </Button>
                  </Card>

                  {/* Reseñas */}
                  <Card className="p-4">
                    <h2 className="font-semibold mb-4">Reseñas</h2>
                    
                    <ReviewSection
                      reviews={reviews}
                      averageRating={selectedStoreData.rating}
                      totalReviews={selectedStoreData.reviewCount + localReviews.length}
                    />

                    {/* Formulario para agregar reseña */}
                    {hasReserved(selectedStore) ? (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-medium mb-3">Dejá tu reseña</h3>
                        
                        <div className="mb-3">
                          <Label className="mb-2 block text-sm">Calificación</Label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setNewReviewRating(rating)}
                                className="focus:outline-none transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    rating <= newReviewRating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="review-comment" className="mb-2 block text-sm">
                            Comentario
                          </Label>
                          <Textarea
                            id="review-comment"
                            placeholder="Contanos tu experiencia..."
                            value={newReviewComment}
                            onChange={(e) => setNewReviewComment(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>

                        <Button onClick={handleAddReview} className="w-full">
                          Publicar reseña
                        </Button>
                      </div>
                    ) : (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">
                          Necesitás reservar en este comercio para poder dejar una reseña
                        </p>
                      </div>
                    )}
                  </Card>
                </div>
              </>
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
