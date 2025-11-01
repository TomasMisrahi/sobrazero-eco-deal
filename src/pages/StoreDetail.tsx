import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReviewSection from "@/components/ReviewSection";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<any[]>([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favArray = JSON.parse(favorites);
      return favArray.includes(id);
    }
    return false;
  });

  // Verificar si el usuario ha reservado en este comercio
  const hasReserved = () => {
    const ordersData = localStorage.getItem("orders");
    if (!ordersData) return false;
    
    const orders = JSON.parse(ordersData);
    return orders.some((order: any) => {
      // Verificar si hay alguna orden para este comercio
      const storeData = allStores[id as keyof typeof allStores];
      return storeData && order.storeName === storeData.name;
    });
  };

  // Mock data - en producción vendría de una API
  const allStores = {
    "1": {
      id: "1",
      name: "Panadería Don Juan",
      category: "panadería",
      address: "Av. Corrientes 2850, Balvanera",
      distance: "0.8 km",
      rating: 4.5,
      reviewCount: 127,
      discount: 60,
      originalPrice: 2500,
      discountedPrice: 1000,
      pickupTime: "18:00 - 20:00",
      available: 5,
      description: "Bolsa sorpresa con productos de panadería frescos del día: pan, facturas, medialunas y más. Todos los productos están en perfecto estado.",
      imageUrl: "",
    },
    "2": {
      id: "2",
      name: "Supermercado Express",
      category: "supermercado",
      address: "Av. Pueyrredón 258, Balvanera",
      distance: "1.2 km",
      rating: 4.2,
      reviewCount: 89,
      discount: 50,
      originalPrice: 3000,
      discountedPrice: 1500,
      pickupTime: "19:00 - 21:00",
      available: 8,
      description: "Bolsa sorpresa con variedad de productos: verduras, frutas, lácteos y otros productos frescos. Perfecto para abastecer tu hogar.",
      imageUrl: "",
    },
    "3": {
      id: "3",
      name: "Verdulería Los Andes",
      category: "verdulería",
      address: "Av. Córdoba 2645, Balvanera",
      distance: "1.5 km",
      rating: 4.7,
      reviewCount: 156,
      discount: 55,
      originalPrice: 2000,
      discountedPrice: 900,
      pickupTime: "17:00 - 19:00",
      available: 3,
      description: "Bolsa sorpresa con frutas y verduras frescas de estación. Productos de excelente calidad directos de la quinta.",
      imageUrl: "",
    },
    "4": {
      id: "4",
      name: "Restaurante La Estancia",
      category: "restaurante",
      address: "Av. Rivadavia 2380, Balvanera",
      distance: "0.5 km",
      rating: 4.8,
      reviewCount: 203,
      discount: 70,
      originalPrice: 5000,
      discountedPrice: 1500,
      pickupTime: "20:00 - 21:30",
      available: 4,
      description: "Bolsa sorpresa con platos de restaurante preparados del día: minutas, guarniciones y postres. Comida casera de alta calidad.",
      imageUrl: "",
    },
    "5": {
      id: "5",
      name: "Panadería Artesanal",
      category: "panadería",
      address: "Av. Callao 348, Balvanera",
      distance: "2.1 km",
      rating: 4.6,
      reviewCount: 94,
      discount: 65,
      originalPrice: 2800,
      discountedPrice: 980,
      pickupTime: "18:30 - 20:00",
      available: 6,
      description: "Bolsa sorpresa con pan artesanal, masas dulces y productos de pastelería. Todo elaborado con masa madre y productos naturales.",
      imageUrl: "",
    },
  };

  const store = allStores[id as keyof typeof allStores] || allStores["1"];

  // Reviews personalizadas según el store
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

  const baseReviews = allReviews[id as string] || allReviews["1"];
  const reviews = [...localReviews, ...baseReviews];

  const handleReserve = () => {
    // Crear el nuevo pedido
    const newOrder = {
      id: Date.now().toString(),
      storeName: store.name,
      status: "pending",
      pickupTime: store.pickupTime,
      address: store.address,
      total: store.discountedPrice * quantity,
      items: quantity,
      date: "Hoy",
    };

    // Obtener pedidos existentes del localStorage
    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    
    // Agregar el nuevo pedido
    orders.unshift(newOrder);
    
    // Guardar en localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Reserva confirmada!", {
      description: `Retirá tu pedido hoy entre ${store.pickupTime}`,
    });

    // Resetear cantidad
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
    const favorites = localStorage.getItem("favorites");
    let favArray: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      // Remove from favorites
      favArray = favArray.filter(favId => favId !== id);
      toast.success("Eliminado de favoritos");
    } else {
      // Add to favorites
      favArray.push(id as string);
      toast.success("Agregado a favoritos");
    }
    
    localStorage.setItem("favorites", JSON.stringify(favArray));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header con imagen */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ShoppingBag className="w-20 h-20 text-primary/40" />
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

      </div>

      <div className="px-4 -mt-6">
        {/* Info Card */}
        <Card className="p-4 mb-4 shadow-card-hover">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <h1 className="text-xl font-bold mb-1">{store.name}</h1>
              <p className="text-sm text-muted-foreground capitalize">{store.category}</p>
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
            <span className="font-medium">{store.rating}</span>
            <span className="text-sm text-muted-foreground">({store.reviewCount} reseñas)</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{store.address} · {store.distance}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Retiro hoy: {store.pickupTime}</span>
            </div>
          </div>
        </Card>

        {/* Descripción */}
        <Card className="p-4 mb-4">
          <h2 className="font-semibold mb-2">¿Qué incluye?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {store.description}
          </p>
        </Card>

        {/* Precio y cantidad */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground line-through">
                ${store.originalPrice.toLocaleString()} aprox.
              </p>
              <p className="text-2xl font-bold text-primary">
                ${store.discountedPrice.toLocaleString()}
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
                onClick={() => setQuantity(Math.min(store.available, quantity + 1))}
                disabled={quantity >= store.available}
              >
                +
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mb-3">
            {store.available} unidades disponibles
          </p>

          <Button className="w-full" size="lg" onClick={handleReserve}>
            Reservar por ${(store.discountedPrice * quantity).toLocaleString()}
          </Button>
        </Card>

        {/* Reseñas */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Reseñas</h2>
          
          <ReviewSection
            reviews={reviews}
            averageRating={store.rating}
            totalReviews={store.reviewCount + localReviews.length}
          />

          {/* Formulario para agregar reseña */}
          {hasReserved() ? (
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

      <BottomNavigation />
    </div>
  );
};

export default StoreDetail;
