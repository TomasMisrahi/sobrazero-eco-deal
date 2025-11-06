import { useParams } from "react-router-dom";
import StoreDetailContent from "@/components/StoreDetailContent";
import BottomNavigation from "@/components/BottomNavigation";
import { stores, allReviews } from "@/data/mockStores";
import { useState, useEffect } from "react";

const StoreDetail = () => {
  const { id } = useParams();
  const [localStores, setLocalStores] = useState(stores);

  // Escuchar eventos de reserva para actualizar contadores
  useEffect(() => {
    const handleStoreReserved = (e: any) => {
      const { storeId, newAvailable } = e.detail;
      setLocalStores(prev => 
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

  if (!id) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Comercio no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <StoreDetailContent 
        storeId={id}
        stores={localStores}
        allReviews={allReviews}
        showBackButton={true}
      />
      <BottomNavigation />
    </div>
  );
};

export default StoreDetail;
