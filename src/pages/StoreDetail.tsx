import { useParams } from "react-router-dom";
import StoreDetailContent from "@/components/StoreDetailContent";
import BottomNavigation from "@/components/BottomNavigation";
import { stores, allReviews } from "@/data/mockStores";

const StoreDetail = () => {
  const { id } = useParams();

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
        stores={stores}
        allReviews={allReviews}
        showBackButton={true}
      />
      <BottomNavigation />
    </div>
  );
};

export default StoreDetail;
