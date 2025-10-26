import { ArrowLeft, Moon, Lock, CreditCard, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Configuracion = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleDarkModeToggle = (checked: boolean) => {
    setDarkMode(checked);
    toast.success(checked ? "Modo oscuro activado" : "Modo claro activado");
  };

  const handleDeleteAccount = () => {
    toast.success("Cuenta eliminada correctamente");
    setShowDeleteDialog(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/perfil")}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Configuración</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {/* Appearance */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Apariencia
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="cursor-pointer">
                Modo oscuro
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Métodos de pago
          </h2>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
            <span className="text-sm">Tarjetas guardadas</span>
            <span className="text-xs text-muted-foreground">2</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
            <span className="text-sm">Agregar método de pago</span>
          </button>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacidad y seguridad
          </h2>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
            <span className="text-sm">Cambiar contraseña</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
            <span className="text-sm">Verificación en dos pasos</span>
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors">
            <span className="text-sm">Datos personales</span>
          </button>
        </Card>

        {/* Danger Zone */}
        <Card className="p-4 border-destructive/50">
          <h2 className="font-semibold mb-4 flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Zona de peligro
          </h2>
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => setShowDeleteDialog(true)}
          >
            Eliminar cuenta
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Esta acción no se puede deshacer
          </p>
        </Card>
      </main>

      {/* Delete Account Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro que desea eliminar la cuenta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se podrá deshacer. Se perderán todos tus datos, pedidos y estadísticas de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Configuracion;
