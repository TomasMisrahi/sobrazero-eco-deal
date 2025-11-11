import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, ShoppingBag, Edit2, Check, X, Plus, Trash2, Camera } from "lucide-react";
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

interface Product {
  id: string;
  name: string;
  stock: number;
  weight?: number;
}

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
  imageUrl?: string;
  products?: Product[];
}

type EditingField = 'name' | 'address' | 'description' | 'pricing' | 'pickupTime' | 'available' | 'contact' | 'products' | null;

const EditarComercio = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [showNoStoreDialog, setShowNoStoreDialog] = useState(false);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para edición
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPickupTime, setEditedPickupTime] = useState("");
  const [editedOriginalPrice, setEditedOriginalPrice] = useState("");
  const [editedDiscountedPrice, setEditedDiscountedPrice] = useState("");
  const [editedAvailable, setEditedAvailable] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedProducts, setEditedProducts] = useState<Product[]>([]);

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
    setEditedPhone(store.phone || "");
    setEditedEmail(store.email || "");
    setEditedProducts(store.products || []);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const updatedStore = { ...storeData!, imageUrl };
        localStorage.setItem("registeredStore", JSON.stringify(updatedStore));
        setStoreData(updatedStore);
        toast.success("Imagen actualizada");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      stock: 0,
      weight: undefined,
    };
    setEditedProducts([...editedProducts, newProduct]);
  };

  const handleUpdateProduct = (id: string, field: keyof Product, value: string | number) => {
    setEditedProducts(editedProducts.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setEditedProducts(editedProducts.filter(p => p.id !== id));
  };

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
      case 'contact':
        updatedStore.phone = editedPhone;
        updatedStore.email = editedEmail;
        break;
      case 'products':
        updatedStore.products = editedProducts;
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
    setEditedPhone(storeData.phone || "");
    setEditedEmail(storeData.email || "");
    setEditedProducts(storeData.products || []);
    
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
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden group">
          {storeData.imageUrl ? (
            <img src={storeData.imageUrl} alt={storeData.storeName} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <ShoppingBag className="w-20 h-20 text-primary/40" />
            </div>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <Camera className="w-12 h-12 text-white" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Nombre y Dirección */}
        <Card className="p-4">
          {editingField === 'name' ? (
            <div className="space-y-2 mb-4">
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
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">{storeData.storeName}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('name')}
              >
                Editar
              </Button>
            </div>
          )}

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

          {/* Productos individuales */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Productos individuales</h3>
              {editingField !== 'products' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingField('products')}
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Editar
                </Button>
              )}
            </div>

            {editingField === 'products' ? (
              <div className="space-y-4">
                {editedProducts.map((product, index) => (
                  <Card key={product.id} className="p-3 bg-muted/50">
                    <div className="flex items-start justify-between mb-2">
                      <Label className="text-xs text-muted-foreground">Producto {index + 1}</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs">Nombre</Label>
                        <Input
                          value={product.name}
                          onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                          placeholder="Nombre del producto"
                          className="h-8"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Stock</Label>
                          <Input
                            type="number"
                            value={product.stock}
                            onChange={(e) => handleUpdateProduct(product.id, 'stock', parseInt(e.target.value) || 0)}
                            placeholder="0"
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Peso (kg, opcional)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={product.weight || ""}
                            onChange={(e) => handleUpdateProduct(product.id, 'weight', e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder="0.0"
                            className="h-8"
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddProduct}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Agregar producto
                </Button>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => handleSaveField('products')}>
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
              <div className="space-y-2">
                {storeData.products && storeData.products.length > 0 ? (
                  storeData.products.map((product, index) => (
                    <div key={product.id} className="text-sm text-muted-foreground">
                      <span className="font-medium">Producto {index + 1}:</span> {product.name} - Stock: {product.stock}
                      {product.weight && ` - Peso: ${product.weight}kg`}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay productos individuales registrados</p>
                )}
              </div>
            )}
          </div>
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
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Información de contacto</h2>
            {editingField !== 'contact' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('contact')}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Editar
              </Button>
            )}
          </div>

          {editingField === 'contact' ? (
            <div className="space-y-3">
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  placeholder="Número de teléfono"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleSaveField('contact')}>
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
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Teléfono: </span>
                <span className="font-medium">{storeData.phone}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Email: </span>
                <span className="font-medium">{storeData.email}</span>
              </div>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground pt-3 border-t border-border mt-3">
            <strong>Nota:</strong> Esta información no se visualizará públicamente. Solo quedará en registro personal de SobraZero para resolver cualquier inconveniente.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default EditarComercio;
