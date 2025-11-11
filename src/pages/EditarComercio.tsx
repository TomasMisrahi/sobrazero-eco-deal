import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, ShoppingBag, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DecorativeShapes from "@/components/DecorativeShapes";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StoreData {
  storeName: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  pickupTime?: string;
  originalPrice?: number;
  discountedPrice?: number;
  available?: number;
}

type EditingField = 'name' | 'address' | 'description' | 'pricing' | 'pickupTime' | 'available' | null;

const EditarComercio = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [showNoStoreDialog, setShowNoStoreDialog] = useState(false);
  const [editingField, setEditingField] = useState<EditingField>(null);
  
  // Estados para edición
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPickupTime, setEditedPickupTime] = useState("");
  const [editedOriginalPrice, setEditedOriginalPrice] = useState("");
  const [editedDiscountedPrice, setEditedDiscountedPrice] = useState("");
  const [editedAvailable, setEditedAvailable] = useState("");

  useEffect(() => {
    const registeredStore = localStorage.getItem("registeredStore");
    
    if (!registeredStore) {
      setShowNoStoreDialog(true);
      return;
    }

    const store = JSON.parse(registeredStore);
    setStoreData(store);
    
    // Inicializar valores editables
    setEditedName(store.storeName || "");
    setEditedAddress(store.address || "");
    setEditedDescription(store.description || "Bolsa sorpresa con productos variados del comercio");
    setEditedPickupTime(store.pickupTime || "18:00 - 20:00");
    setEditedOriginalPrice(store.originalPrice?.toString() || "3000");
    setEditedDiscountedPrice(store.discountedPrice?.toString() || "1000");
    setEditedAvailable(store.available?.toString() || "5");
  }, []);

  const handleSaveField = (field: EditingField) => {
    if (!storeData) return;

    const updatedStore = { ...storeData };

    switch (field) {
      case 'name':
        updatedStore.storeName = editedName;
        break;
      case 'address':
        updatedStore.address = editedAddress;
        break;
      case 'description':
        updatedStore.description = editedDescription;
        break;
      case 'pickupTime':
        updatedStore.pickupTime = editedPickupTime;
        break;
      case 'pricing':
        updatedStore.originalPrice = parseFloat(editedOriginalPrice);
        updatedStore.discountedPrice = parseFloat(editedDiscountedPrice);
        break;
      case 'available':
        updatedStore.available = parseInt(editedAvailable);
        break;
    }

    localStorage.setItem("registeredStore", JSON.stringify(updatedStore));
    setStoreData(updatedStore);
    setEditingField(null);
    toast.success("Cambios guardados");
  };

  const handleCancelEdit = () => {
    if (!storeData) return;

    // Restaurar valores originales
    setEditedName(storeData.storeName || "");
    setEditedAddress(storeData.address || "");
    setEditedDescription(storeData.description || "");
    setEditedPickupTime(storeData.pickupTime || "");
    setEditedOriginalPrice(storeData.originalPrice?.toString() || "");
    setEditedDiscountedPrice(storeData.discountedPrice?.toString() || "");
    setEditedAvailable(storeData.available?.toString() || "");
    
    setEditingField(null);
  };

  if (showNoStoreDialog) {
    return (
      <AlertDialog open={showNoStoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>No hay comercio registrado</AlertDialogTitle>
            <AlertDialogDescription>
              No podés acceder a esta sección porque no hay ningún comercio registrado y con una solicitud aceptada en esta cuenta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => navigate("/perfil")}>Volver</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-6 relative">
      <DecorativeShapes />
      
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate("/perfil")}
            className="hover:bg-muted rounded-full p-1 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Editar tu comercio</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4 relative z-10">
        {/* Header con imagen */}
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <ShoppingBag className="w-20 h-20 text-primary/40" />
          </div>
        </div>

        {/* Nombre y Dirección */}
        <Card className="p-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              {editingField === 'name' ? (
                <div className="space-y-2">
                  <Label>Nombre del comercio</Label>
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Nombre del comercio"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSaveField('name')}>
                      <Check className="w-4 h-4 mr-1" />
                      Guardar
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-xl font-bold mb-1">{storeData.storeName}</h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingField('name')}
                    className="text-xs text-muted-foreground"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Editar nombre
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            {editingField === 'address' ? (
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  placeholder="Dirección del comercio"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSaveField('address')}>
                    <Check className="w-4 h-4 mr-1" />
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <span>{storeData.address}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingField('address')}
                    className="ml-2 text-xs"
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                </div>
              </div>
            )}

            {editingField === 'pickupTime' ? (
              <div className="space-y-2 pt-2">
                <Label>Horario de retiro</Label>
                <Input
                  value={editedPickupTime}
                  onChange={(e) => setEditedPickupTime(e.target.value)}
                  placeholder="Ej: 18:00 - 20:00"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSaveField('pickupTime')}>
                    <Check className="w-4 h-4 mr-1" />
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Retiro hoy: {storeData.pickupTime || "18:00 - 20:00"}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingField('pickupTime')}
                  className="text-xs"
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Editar
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Descripción */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">¿Qué incluye?</h2>
            {editingField !== 'description' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('description')}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Editar
              </Button>
            )}
          </div>

          {editingField === 'description' ? (
            <div className="space-y-3">
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Descripción de lo que incluye la bolsa sorpresa"
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSaveField('description')}>
                  <Check className="w-4 h-4 mr-1" />
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {storeData.description || "Bolsa sorpresa con productos variados del comercio"}
            </p>
          )}
        </Card>

        {/* Precio y disponibilidad */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Precios</h2>
            {editingField !== 'pricing' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('pricing')}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Editar
              </Button>
            )}
          </div>

          {editingField === 'pricing' ? (
            <div className="space-y-3">
              <div>
                <Label>Precio original</Label>
                <Input
                  type="number"
                  value={editedOriginalPrice}
                  onChange={(e) => setEditedOriginalPrice(e.target.value)}
                  placeholder="3000"
                />
              </div>
              <div>
                <Label>Precio con descuento</Label>
                <Input
                  type="number"
                  value={editedDiscountedPrice}
                  onChange={(e) => setEditedDiscountedPrice(e.target.value)}
                  placeholder="1000"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSaveField('pricing')}>
                  <Check className="w-4 h-4 mr-1" />
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground line-through">
                ${(storeData.originalPrice || 3000).toLocaleString()} aprox.
              </p>
              <p className="text-2xl font-bold text-primary">
                ${(storeData.discountedPrice || 1000).toLocaleString()}
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Disponibilidad</h3>
              {editingField !== 'available' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingField('available')}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              )}
            </div>

            {editingField === 'available' ? (
              <div className="space-y-3">
                <div>
                  <Label>Unidades disponibles</Label>
                  <Input
                    type="number"
                    value={editedAvailable}
                    onChange={(e) => setEditedAvailable(e.target.value)}
                    placeholder="5"
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSaveField('available')}>
                    <Check className="w-4 h-4 mr-1" />
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    <X className="w-4 h-4 mr-1" />
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {storeData.available || 5} unidades disponibles
              </p>
            )}
          </div>
        </Card>

        {/* Información de contacto */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3">Información de contacto</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Teléfono: </span>
              <span className="font-medium">{storeData.phone}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Email: </span>
              <span className="font-medium">{storeData.email}</span>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              Para cambiar estos datos, por favor contactá con soporte
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditarComercio;
