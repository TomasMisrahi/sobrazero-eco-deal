import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, ShoppingBag, Camera } from "lucide-react";
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
  originalPrice: number;
  discountedPrice: number;
}

interface StoreData {
  storeName: string;
  storeType?: string;
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

interface ProductError {
  [productId: string]: {
    name?: string;
    stock?: string;
    originalPrice?: string;
    discountedPrice?: string;
  };
}

type EditingField = 'info' | 'description' | 'pricing' | 'pickupTime' | 'contact' | 'products' | null;

const EditarComercio = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [showNoStoreDialog, setShowNoStoreDialog] = useState(false);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estados para edición
  const [editedName, setEditedName] = useState("");
  const [editedStoreType, setEditedStoreType] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPickupStart, setEditedPickupStart] = useState("");
  const [editedPickupEnd, setEditedPickupEnd] = useState("");
  const [editedOriginalPrice, setEditedOriginalPrice] = useState("");
  const [editedDiscountedPrice, setEditedDiscountedPrice] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedProducts, setEditedProducts] = useState<Product[]>([]);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [productErrors, setProductErrors] = useState<ProductError>({});

  const storeTypes = [
    { id: "panaderia", label: "Panadería" },
    { id: "supermercado", label: "Supermercado" },
    { id: "verduleria", label: "Verdulería" },
    { id: "restaurante", label: "Restaurante" },
  ];

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
    setEditedStoreType(store.storeType || "");
    setEditedAddress(store.address || "");
    setEditedDescription(store.description || "Bolsa sorpresa con productos variados del comercio");
    const pickupTime = store.pickupTime || "18:00 - 20:00";
    const [start, end] = pickupTime.split(" - ");
    setEditedPickupStart(start || "18:00");
    setEditedPickupEnd(end || "20:00");
    setEditedOriginalPrice(store.originalPrice?.toString() || "3000");
    setEditedDiscountedPrice(store.discountedPrice?.toString() || "1000");
    setEditedPhone(store.phone || "");
    setEditedEmail(store.email || "");
    setEditedProducts(store.products || []);
  }, []);

  const handleImageClick = () => {
    setShowImageDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const updatedStore = { ...storeData!, imageUrl };
        localStorage.setItem("registeredStore", JSON.stringify(updatedStore));
        setStoreData(updatedStore);
        setShowImageDialog(false);
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
      originalPrice: 0,
      discountedPrice: 0,
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
      case 'info':
        updatedStore.storeName = editedName;
        updatedStore.storeType = editedStoreType;
        updatedStore.address = editedAddress;
        updatedStore.pickupTime = `${editedPickupStart} - ${editedPickupEnd}`;
        break;
      case 'description':
        updatedStore.description = editedDescription;
        break;
      case 'pickupTime':
        updatedStore.pickupTime = `${editedPickupStart} - ${editedPickupEnd}`;
        break;
      case 'pricing':
        updatedStore.originalPrice = parseFloat(editedOriginalPrice);
        updatedStore.discountedPrice = parseFloat(editedDiscountedPrice);
        break;
      case 'contact':
        updatedStore.phone = editedPhone;
        updatedStore.email = editedEmail;
        break;
      case 'products':
        // Validar que todos los productos tengan nombre, stock, precio original y precio con descuento
        const errors: ProductError = {};
        let hasErrors = false;
        
        editedProducts.forEach(product => {
          const productError: any = {};
          
          if (!product.name.trim()) {
            productError.name = "El nombre es obligatorio";
            hasErrors = true;
          }
          if (product.stock <= 0) {
            productError.stock = "El stock debe ser mayor a 0";
            hasErrors = true;
          }
          if (!product.originalPrice || product.originalPrice <= 0) {
            productError.originalPrice = "El precio original es obligatorio";
            hasErrors = true;
          }
          if (!product.discountedPrice || product.discountedPrice <= 0) {
            productError.discountedPrice = "El precio con descuento es obligatorio";
            hasErrors = true;
          }
          
          if (Object.keys(productError).length > 0) {
            errors[product.id] = productError;
          }
        });
        
        if (hasErrors) {
          setProductErrors(errors);
          return;
        }
        
        setProductErrors({});
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
    setEditedStoreType(storeData.storeType || "");
    setEditedAddress(storeData.address || "");
    setEditedDescription(storeData.description || "");
    const pickupTime = storeData.pickupTime || "18:00 - 20:00";
    const [start, end] = pickupTime.split(" - ");
    setEditedPickupStart(start || "18:00");
    setEditedPickupEnd(end || "20:00");
    setEditedOriginalPrice(storeData.originalPrice?.toString() || "");
    setEditedDiscountedPrice(storeData.discountedPrice?.toString() || "");
    setEditedPhone(storeData.phone || "");
    setEditedEmail(storeData.email || "");
    setEditedProducts(storeData.products || []);
    setProductErrors({});
    
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
            onClick={handleImageClick}
            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <Camera className="w-12 h-12 text-white" />
          </button>
        </div>

        {/* Dialog de recomendación de imagen */}
        <AlertDialog open={showImageDialog} onOpenChange={setShowImageDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cambiar imagen del comercio</AlertDialogTitle>
              <AlertDialogDescription>
                Para obtener los mejores resultados, te recomendamos usar una imagen en formato horizontal de medidas cercanas a 1920 x 1080 píxeles.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setShowImageDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                fileInputRef.current?.click();
              }}>
                Seleccionar imagen
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Nombre y Dirección */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">{storeData.storeName}</h1>
            {editingField !== 'info' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingField('info')}
              >
                Editar
              </Button>
            )}
          </div>

          {editingField === 'info' ? (
            <div className="space-y-3">
              <div>
                <Label>Nombre del comercio</Label>
                <Input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Nombre del comercio"
                />
              </div>
              <div>
                <Label>Tipo de comercio</Label>
                <div className="grid grid-cols-2 gap-3">
                  {storeTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setEditedStoreType(type.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        editedStoreType === type.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Dirección</Label>
                <Input
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  placeholder="Dirección del comercio"
                />
              </div>
              <div>
                <Label>Horario de retiro - Inicio</Label>
                <Input
                  type="time"
                  value={editedPickupStart}
                  onChange={(e) => setEditedPickupStart(e.target.value)}
                />
              </div>
              <div>
                <Label>Horario de retiro - Fin</Label>
                <Input
                  type="time"
                  value={editedPickupEnd}
                  onChange={(e) => setEditedPickupEnd(e.target.value)}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => handleSaveField('info')}>
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <ShoppingBag className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {storeTypes.find(t => t.id === storeData.storeType)?.label || "Tipo no especificado"}
                </span>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{storeData.address}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Retiro hoy: {storeData.pickupTime || "18:00 - 20:00"}</span>
              </div>
            </div>
          )}
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
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
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
                        ×
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
                        {productErrors[product.id]?.name && (
                          <p className="text-xs text-destructive mt-1">{productErrors[product.id].name}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs">Stock</Label>
                          <Input
                            type="number"
                            value={product.stock || ""}
                            onChange={(e) => handleUpdateProduct(product.id, 'stock', parseInt(e.target.value) || 0)}
                            placeholder=""
                            className="h-8"
                          />
                          {productErrors[product.id]?.stock && (
                            <p className="text-xs text-destructive mt-1">{productErrors[product.id].stock}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs">Peso en kilos (opcional)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            value={product.weight !== undefined ? product.weight : ""}
                            onChange={(e) => handleUpdateProduct(product.id, 'weight', e.target.value ? parseFloat(e.target.value) : undefined)}
                            placeholder=""
                            className="h-8"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div>
                          <Label className="text-xs">Precio original</Label>
                          <Input
                            type="number"
                            value={product.originalPrice || ""}
                            onChange={(e) => handleUpdateProduct(product.id, 'originalPrice', parseInt(e.target.value) || 0)}
                            placeholder=""
                            className="h-8"
                          />
                          {productErrors[product.id]?.originalPrice && (
                            <p className="text-xs text-destructive mt-1">{productErrors[product.id].originalPrice}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-xs">Precio con descuento</Label>
                          <Input
                            type="number"
                            value={product.discountedPrice || ""}
                            onChange={(e) => handleUpdateProduct(product.id, 'discountedPrice', parseInt(e.target.value) || 0)}
                            placeholder=""
                            className="h-8"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Este es el precio que se cobrará al público
                          </p>
                          {productErrors[product.id]?.discountedPrice && (
                            <p className="text-xs text-destructive mt-1">{productErrors[product.id].discountedPrice}</p>
                          )}
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
                  Agregar producto
                </Button>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" onClick={() => handleSaveField('products')}>
                    Guardar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
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
                      {product.weight && ` - Peso: ${product.weight}kg`} - ${product.discountedPrice}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No hay productos individuales registrados</p>
                )}
              </div>
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
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
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
