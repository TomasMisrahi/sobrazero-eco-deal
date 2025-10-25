import { ShoppingBag, Salad, Croissant, Store, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoreFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Todos", icon: Store },
  { id: "panaderia", label: "Panadería", icon: Croissant },
  { id: "supermercado", label: "Supermercado", icon: ShoppingBag },
  { id: "verduleria", label: "Verdulería", icon: Salad },
  { id: "restaurante", label: "Restaurante", icon: UtensilsCrossed },
];

const StoreFilters = ({ selectedCategory, onCategoryChange }: StoreFiltersProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex-shrink-0 gap-2"
          >
            <Icon className="w-4 h-4" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};

export default StoreFilters;
