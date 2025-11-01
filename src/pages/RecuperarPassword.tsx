import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const resetPasswordSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255, "Máximo 255 caracteres"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    toast.success("Se ha enviado un correo con las instrucciones para restablecer tu contraseña");
    setTimeout(() => navigate("/auth"), 2000);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkModeEnabled = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkModeEnabled);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/auth")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a iniciar sesión
        </Button>

        <Card className="p-6">
          <div className="text-center mb-6">
            <img 
              src={isDarkMode ? logoDark : logo} 
              alt="SobraZero" 
              className="w-24 h-24 mx-auto my-6" 
              loading="eager"
              fetchPriority="high"
            />
            <h1 className="text-2xl font-bold mb-2">Recuperar contraseña</h1>
            <p className="text-sm text-muted-foreground">
              Ingresá tu email y te enviaremos instrucciones para restablecer tu contraseña
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="tu@email.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Enviar instrucciones
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default RecuperarPassword;
