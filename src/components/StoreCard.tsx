import { MapPin, Clock, Star, TrendingDown, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StoreCardProps {
  id: string;
  name: string;
  category: string;
  distance: string;
  rating: number;
  reviewCount: number;
  discount: number;
  pickupTime: string;
  available: number;
  imageUrl?: string;
  onClick?: () => void;
  isFavorite?: boolean;
  onFavoriteClick?: (e: React.MouseEvent) => void;
}

const StoreCard = ({
  name,
  category,
  distance,
  rating,
  reviewCount,
  discount,
  pickupTime,
  available,
  imageUrl,
  onClick,
  isFavorite,
  onFavoriteClick,
}: StoreCardProps) => {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all hover:shadow-card-hover active:scale-[0.98]"
      onClick={onClick}
    >
      <div className="flex gap-3 p-3">
        {/* Imagen */}
        <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-muted overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Store className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            {isFavorite ? (
              <button
                onClick={onFavoriteClick}
                className="flex-shrink-0 text-success hover:scale-110 transition-transform"
              >
                <Heart className="w-6 h-6 fill-success" />
              </button>
            ) : (
              <Badge variant="secondary" className="flex-shrink-0 bg-success-light text-success border-0">
                <TrendingDown className="w-3 h-3 mr-1" />
                {discount}%
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 capitalize">{category}</p>
          
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {distance}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {rating} ({reviewCount})
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {pickupTime}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            {available} unidades disponibles
          </p>
        </div>
      </div>
    </Card>
  );
};

const Store = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
    <path d="M12 3v6" />
  </svg>
);

export default StoreCard;
