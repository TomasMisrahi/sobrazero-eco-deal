import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ReviewSection from "@/components/ReviewSection";
import { toast } from "sonner";

interface Store {
  id: string;
  name: string;
  category: string;
  address: string;
  distance: string;
  rating: number;
  reviewCount: number;
  discount: number;
  originalPrice: number;
  discountedPrice: number;
  pickupTime: string;
  available: number;
  description: string;
  imageUrl?: string;
  lat?: number;
  lng?: number;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface StoreDetailContentProps {
  storeId: string;
  stores: Store[];
  allReviews: Record<string, Review[]>;
  showBackButton?: boolean;
  onClose?: () => void;
}

const StoreDetailContent = ({ 
  storeId, 
  stores, 
  allReviews, 
  showBackButton = false,
  onClose 
}: StoreDetailContentProps) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");
  const [localReviews, setLocalReviews] = useState<Review[]>([]);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favArray = JSON.parse(favorites);
      return favArray.includes(storeId);
    }
    return false;
  });

  const store = stores.find(s => s.id === storeId);

  // Verificar si el usuario ha reservado en este comercio
  const hasReserved = () => {
    const ordersData = localStorage.getItem("orders");
    if (!ordersData) return false;
    
    const orders = JSON.parse(ordersData);
    return orders.some((order: any) => {
      return store && order.storeName === store.name;
    });
  };

  const baseReviews = allReviews[storeId] || [];
  const reviews = [...localReviews, ...baseReviews];

  const handleReserve = () => {
    if (!store) return;

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

    const existingOrders = localStorage.getItem("orders");
    const orders = existingOrders ? JSON.parse(existingOrders) : [];
    orders.unshift(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    toast.success("Reserva confirmada!", {
      description: `Retirá tu pedido hoy entre ${store.pickupTime}`,
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
    const favorites = localStorage.getItem("favorites");
    let favArray: string[] = favorites ? JSON.parse(favorites) : [];
    
    if (isFavorite) {
      favArray = favArray.filter(favId => favId !== storeId);
      toast.success("Eliminado de favoritos");
    } else {
      favArray.push(storeId);
      toast.success("Agregado a favoritos");
    }
    
    localStorage.setItem("favorites", JSON.stringify(favArray));
    setIsFavorite(!isFavorite);
  };

  // Actualizar isFavorite cuando cambia el storeId
  useEffect(() => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favArray = JSON.parse(favorites);
      setIsFavorite(favArray.includes(storeId));
    } else {
      setIsFavorite(false);
    }
    setQuantity(1);
  }, [storeId]);

  if (!store) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Comercio no encontrado</p>
      </div>
    );
  }

  return (
    <>
      {/* Header con imagen */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <ShoppingBag className="w-20 h-20 text-primary/40" />
        </div>
        
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => onClose ? onClose() : navigate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="px-4">
        {/* Info Card */}
        <Card className="p-4 mb-4 shadow-card-hover -mt-24 relative z-10">
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
    </>
  );
};

export default StoreDetailContent;
