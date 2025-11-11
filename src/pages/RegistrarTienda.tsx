import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import DecorativeShapes from "@/components/DecorativeShapes";

const storeSchema = z.object({
  storeName: z.string().min(1, "El nombre del comercio es requerido").max(100),
  storeType: z.string().min(1, "Debes seleccionar un tipo de comercio"),
  address: z.string().min(1, "La dirección es requerida").max(200),
  phone: z.string().min(1, "El celular es requerido").regex(/^[^a-zA-Z]+$/, "Solo se permiten números y carácteres especiales").max(20),
  email: z.string().email("Email inválido"),
  hasLocalRegistry: z.boolean().refine((val) => val === true, {
    message: "Debes marcar esta opción para continuar"
  }),
  hasPhysicalStore: z.boolean().refine((val) => val === true, {
    message: "Debes marcar esta opción para continuar"
  }),
});

type StoreFormData = z.infer<typeof storeSchema>;

const RegistrarTienda = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "",
      storeType: "",
      address: "",
      phone: "",
      email: "",
      hasLocalRegistry: false,
      hasPhysicalStore: false,
    },
  });

  const hasLocalRegistry = watch("hasLocalRegistry");
  const hasPhysicalStore = watch("hasPhysicalStore");
  const storeType = watch("storeType");

  const storeTypes = [
    { id: "panaderia", label: "Panadería" },
    { id: "supermercado", label: "Supermercado" },
    { id: "verduleria", label: "Verdulería" },
    { id: "restaurante", label: "Restaurante" },
  ];

  const onSubmit = (data: StoreFormData) => {
    // Guardar los datos del comercio en localStorage
    const storeData = {
      storeName: data.storeName,
      storeType: data.storeType,
      address: data.address,
      phone: data.phone,
      email: data.email,
      hasLocalRegistry: data.hasLocalRegistry,
      hasPhysicalStore: data.hasPhysicalStore,
      description: "Bolsa sorpresa con productos variados del comercio",
      pickupTime: "18:00 - 20:00",
      originalPrice: 3000,
      discountedPrice: 1000,
      available: 5,
    };
    
    localStorage.setItem("registeredStore", JSON.stringify(storeData));
    
    toast.success("Solicitud enviada exitosamente. Te contactaremos pronto.");
    navigate("/perfil");
  };

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
          <h1 className="text-2xl font-bold">Registrá tu comercio</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 space-y-6 relative z-10">
        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Store Name */}
            <div className="space-y-2">
              <Label htmlFor="storeName">Nombre del comercio</Label>
              <Input
                id="storeName"
                type="text"
                placeholder="Ingresá el nombre de tu comercio"
                {...register("storeName")}
              />
              {errors.storeName && (
                <p className="text-sm text-destructive">{errors.storeName.message}</p>
              )}
            </div>

            {/* Store Type */}
            <div className="space-y-2">
              <Label>Tipo de comercio</Label>
              <div className="grid grid-cols-2 gap-3">
                {storeTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setValue("storeType", type.id, { shouldValidate: true })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      storeType === type.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
              {errors.storeType && (
                <p className="text-sm text-destructive">{errors.storeType.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Dirección y número del comercio</Label>
              <Input
                id="address"
                type="text"
                placeholder="Ingresá tu dirección y número de tu comercio"
                {...register("address")}
              />
              <p className="text-xs text-muted-foreground">
                Solo direcciones dentro de Capital Federal, Buenos Aires, Argentina
              </p>
              {errors.address && (
                <p className="text-sm text-destructive">{errors.address.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Número de celular</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Ingresá tu número de celular"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email con el que accedes a SobraZero</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresá tu email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="hasLocalRegistry"
                    checked={hasLocalRegistry}
                    onCheckedChange={(checked) =>
                      setValue("hasLocalRegistry", checked as boolean, { shouldValidate: true })
                    }
                  />
                  <label
                    htmlFor="hasLocalRegistry"
                    className="text-sm leading-tight cursor-pointer"
                  >
                    Cuento con una empresa con registro local vigente
                  </label>
                </div>
                {errors.hasLocalRegistry && (
                  <p className="text-sm text-destructive ml-7">{errors.hasLocalRegistry.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="hasPhysicalStore"
                    checked={hasPhysicalStore}
                    onCheckedChange={(checked) =>
                      setValue("hasPhysicalStore", checked as boolean, { shouldValidate: true })
                    }
                  />
                  <label
                    htmlFor="hasPhysicalStore"
                    className="text-sm leading-tight cursor-pointer"
                  >
                    Cuento con un local físico abierto al público
                  </label>
                </div>
                {errors.hasPhysicalStore && (
                  <p className="text-sm text-destructive ml-7">{errors.hasPhysicalStore.message}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full">
              Registrar mi comercio
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default RegistrarTienda;
