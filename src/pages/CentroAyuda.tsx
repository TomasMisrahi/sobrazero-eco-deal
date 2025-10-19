import { ArrowLeft, HelpCircle, MessageCircle, Mail, Phone, BookOpen, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CentroAyuda = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "¿Cómo funciona la app?",
      answer: "Nuestra app conecta comercios locales con usuarios para reducir el desperdicio de alimentos. Los comercios publican packs sorpresa con comida del día a precios reducidos, y tú puedes reservarlos y recogerlos en el horario indicado.",
    },
    {
      question: "¿Cómo reservo un pack sorpresa?",
      answer: "Busca comercios cerca de ti, selecciona el que te interese, elige un pack disponible y confirma tu reserva. Recibirás una notificación con los detalles de recogida.",
    },
    {
      question: "¿Puedo cancelar mi reserva?",
      answer: "Sí, puedes cancelar tu reserva hasta 2 horas antes del horario de recogida sin costo. Después de ese tiempo, se aplicará un cargo del 50% del valor del pack.",
    },
    {
      question: "¿Qué pasa si llego tarde a recoger mi pedido?",
      answer: "Te recomendamos llegar dentro del horario indicado. Si llegas tarde, el comercio puede haber donado el pack o no estar disponible. En ese caso, no podremos reembolsar el pago.",
    },
    {
      question: "¿Los packs son siempre diferentes?",
      answer: "Sí, los packs sorpresa varían según la disponibilidad del día en cada comercio. Es parte de la experiencia de ayudar a reducir el desperdicio de alimentos.",
    },
    {
      question: "¿Cómo funcionan los pagos?",
      answer: "Puedes pagar con tarjeta de crédito, débito o métodos de pago digital. El pago se procesa al momento de confirmar la reserva.",
    },
    {
      question: "¿Puedo pedir un reembolso?",
      answer: "Los reembolsos se procesan solo si el comercio cancela el pedido o no tiene stock disponible. En otros casos, contacta a nuestro equipo de soporte.",
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Chat en vivo",
      description: "Respuesta en minutos",
      action: () => toast.info("Abriendo chat en vivo..."),
    },
    {
      icon: Mail,
      title: "Email",
      description: "soporte@foodsave.com",
      action: () => toast.info("Abriendo cliente de email..."),
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "+54 11 1234-5678",
      action: () => toast.info("Llamando a soporte..."),
    },
  ];

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
          <h1 className="text-2xl font-bold">Centro de Ayuda</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-4 space-y-4">
        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en ayuda..."
              className="pl-9"
            />
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="font-semibold mb-3 px-1">Contacto rápido</h2>
          <div className="space-y-2">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={option.action}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{option.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {option.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="font-semibold mb-3 px-1 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Preguntas frecuentes
          </h2>
          <Card>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-4 text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        {/* Resources */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Recursos adicionales
          </h2>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors text-left">
              <span className="text-sm">Guía de uso para principiantes</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors text-left">
              <span className="text-sm">Términos y condiciones</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors text-left">
              <span className="text-sm">Política de privacidad</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors text-left">
              <span className="text-sm">Sobre nosotros</span>
            </button>
          </div>
        </Card>

        {/* Feedback */}
        <Card className="p-4 text-center">
          <h3 className="font-semibold mb-2">¿No encontraste lo que buscabas?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ayúdanos a mejorar nuestro centro de ayuda
          </p>
          <Button variant="outline" className="w-full">
            Enviar comentarios
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default CentroAyuda;
