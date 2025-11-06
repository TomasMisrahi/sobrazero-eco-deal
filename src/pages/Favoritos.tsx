import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import StoreCard from "@/components/StoreCard";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { stores as allStoresData } from "@/data/mockStores";

const Favoritos = () => {
  const navigate = useNavigate();

  const [favoriteStores, setFavoriteStores] = useState<typeof allStoresData>([]);

  const loadFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    if (favorites) {
      const favIds = JSON.parse(favorites);
      const favStores = allStoresData.filter(store => favIds.includes(store.id));
      setFavoriteStores(favStores);
    }
  };

  useEffect(() => {
    loadFavorites();

    // Escuchar eventos de reserva para actualizar el contador
    const handleStoreReserved = (e: any) => {
      const { storeId, newAvailable } = e.detail;
      setFavoriteStores(prev => 
        prev.map(store => 
          store.id === storeId 
            ? { ...store, available: newAvailable }
            : store
        )
      );
    };

    window.addEventListener('storeReserved', handleStoreReserved);
    return () => window.removeEventListener('storeReserved', handleStoreReserved);
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
              onClick={() => navigate(`/comercio/${store.id}`)}
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
