import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Star, TrendingDown, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ReviewSection from "@/components/ReviewSection";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "sonner";

const StoreDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Mock data - en producción vendría de una API
  const store = {
    id: id || "1",
    name: "Panadería Don Juan",
    category: "panadería",
    address: "Av. Corrientes 1234, Balvanera",
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
  };

  const reviews = [
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
    {
      id: "3",
      userName: "Ana Martínez",
      rating: 5,
      comment: "Perfecto! Evité el desperdicio y ahorré dinero.",
      date: "Hace 1 semana",
    },
  ];

  const handleReserve = () => {
    toast.success("Reserva confirmada!", {
      description: `Retirá tu pedido hoy entre ${store.pickupTime}`,
    });
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
          onClick={() => navigate("/")}
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
            <Badge className="bg-success-light text-success border-0 text-lg px-3 py-1">
              <TrendingDown className="w-4 h-4 mr-1" />
              {store.discount}%
            </Badge>
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
            totalReviews={store.reviewCount}
          />
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default StoreDetail;
