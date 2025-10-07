import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import MapView from "@/components/MapView";
import StoreFilters from "@/components/StoreFilters";
import StoreCard from "@/components/StoreCard";
import logo from "@/assets/logo.png";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - en producción vendría de una API
  const stores = [
    {
      id: "1",
      name: "Panadería Don Juan",
      category: "panaderia",
      lat: -34.603722,
      lng: -58.381592,
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
      lat: -34.605722,
      lng: -58.383592,
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
      lat: -34.607722,
      lng: -58.379592,
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
      category: "restaurant",
      lat: -34.601722,
      lng: -58.385592,
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
      category: "panaderia",
      lat: -34.609722,
      lng: -58.377592,
      distance: "2.1 km",
      rating: 4.6,
      reviewCount: 94,
      discount: 65,
      pickupTime: "18:30 - 20:00",
      available: 6,
    },
  ];

  const filteredStores = stores.filter((store) => {
    const matchesCategory = selectedCategory === "all" || store.category === selectedCategory;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <img src={logo} alt="SobraZero" className="h-10 w-auto" />
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar comercios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Balvanera, CABA</span>
        </div>

        {/* Map */}
        <MapView stores={filteredStores} onStoreClick={(id) => navigate(`/store/${id}`)} />

        {/* Filters */}
        <div>
          <h2 className="text-sm font-semibold mb-3">Categorías</h2>
          <StoreFilters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Stores List */}
        <div>
          <h2 className="text-sm font-semibold mb-3">
            {filteredStores.length} comercios cercanos
          </h2>
          <div className="space-y-3">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                {...store}
                onClick={() => navigate(`/store/${store.id}`)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
