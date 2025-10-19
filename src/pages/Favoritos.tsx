import { Heart, MapPin, Clock, Euro } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const navigate = useNavigate();

  // Mock data - en producción vendría de una API
  const favoriteStores = [
    {
      id: 1,
      name: "Panadería Don José",
      category: "Panadería",
      distance: "0.3 km",
      discount: "50%",
      price: "€3.99",
      originalPrice: "€7.99",
      available: 3,
      closesAt: "21:00",
      image: "🥖",
    },
    {
      id: 2,
      name: "Frutas del Huerto",
      category: "Verdulería",
      distance: "0.5 km",
      discount: "40%",
      price: "€2.99",
      originalPrice: "€4.99",
      available: 5,
      closesAt: "20:00",
      image: "🍎",
    },
    {
      id: 3,
      name: "Sushi Express",
      category: "Restaurante",
      distance: "0.8 km",
      discount: "60%",
      price: "€5.99",
      originalPrice: "€14.99",
      available: 2,
      closesAt: "22:30",
      image: "🍱",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Comercios Favoritos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {favoriteStores.length} comercios guardados
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-3">
        {favoriteStores.length === 0 ? (
          <Card className="p-8 text-center">
            <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No hay favoritos aún</h3>
            <p className="text-sm text-muted-foreground">
              Toca el ícono de corazón en cualquier comercio para guardarlo aquí
            </p>
          </Card>
        ) : (
          favoriteStores.map((store) => (
            <Card
              key={store.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/store/${store.id}`)}
            >
              <div className="flex gap-3 p-3">
                {/* Store Image */}
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-3xl flex-shrink-0">
                  {store.image}
                </div>

                {/* Store Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {store.name}
                    </h3>
                    <Heart className="w-5 h-5 fill-primary text-primary flex-shrink-0" />
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    {store.category}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{store.distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Hasta {store.closesAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{store.price}</span>
                      <span className="text-xs text-muted-foreground line-through">
                        {store.originalPrice}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {store.available} disponibles
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Favoritos;
