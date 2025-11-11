import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import StoreDetail from "./pages/StoreDetail";
import Pedidos from "./pages/Pedidos";
import Perfil from "./pages/Perfil";
import EditarPerfil from "./pages/EditarPerfil";
import Favoritos from "./pages/Favoritos";
import Configuracion from "./pages/Configuracion";
import Notificaciones from "./pages/Notificaciones";
import CentroAyuda from "./pages/CentroAyuda";
import ChatEnVivo from "./pages/ChatEnVivo";
import RegistrarTienda from "./pages/RegistrarTienda";
import Auth from "./pages/Auth";
import RecuperarPassword from "./pages/RecuperarPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/comercio/:id" element={<StoreDetail />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfil/editar" element={<EditarPerfil />} />
          <Route path="/perfil/configuracion" element={<Configuracion />} />
          <Route path="/perfil/notificaciones" element={<Notificaciones />} />
          <Route path="/perfil/centro-ayuda" element={<CentroAyuda />} />
          <Route path="/perfil/centro-ayuda/chat" element={<ChatEnVivo />} />
          <Route path="/perfil/registrar-comercio" element={<RegistrarTienda />} />
          <Route path="/autenticacion" element={<Auth />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
