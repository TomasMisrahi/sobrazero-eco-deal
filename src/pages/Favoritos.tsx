import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import StoreCard from "@/components/StoreCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Favoritos = () => {
  const navigate = useNavigate();

  // Todos los comercios disponibles
  const allStores = [
    {
      id: "1",
      name: "Panadería Don Juan",
      category: "panaderia",
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
      category: "panadería",
      distance: "2.1 km",
      rating: 4.6,
      reviewCount: 94,
      discount: 65,
      pickupTime: "18:30 - 20:00",
      available: 6,
    },
  ];

  const [favoriteStores, setFavoriteStores] = useState<typeof allStores>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favIds = JSON.parse(favorites);
      const favStores = allStores.filter(store => favIds.includes(store.id));
      setFavoriteStores(favStores);
    }
  }, []);

  const handleRemoveFavorite = (storeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Remove from state
    setFavoriteStores(favoriteStores.filter(store => store.id !== storeId));
    // Remove from localStorage
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      let favArray = JSON.parse(favorites);
      favArray = favArray.filter((id: string) => id !== storeId);
      localStorage.setItem("favorites", JSON.stringify(favArray));
    }
  };

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
            <StoreCard
              key={store.id}
              {...store}
              onClick={() => navigate(`/store/${store.id}`)}
              isFavorite={true}
              onFavoriteClick={(e) => handleRemoveFavorite(store.id, e)}
            />
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Favoritos;
