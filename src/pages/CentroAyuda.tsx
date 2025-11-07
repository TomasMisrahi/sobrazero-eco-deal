import { ArrowLeft, HelpCircle, MessageCircle, Mail, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DecorativeShapes from "@/components/DecorativeShapes";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";

const feedbackSchema = z.object({
  feedback: z.string().trim().min(10, "El comentario debe tener al menos 10 caracteres").max(1000, "Máximo 1000 caracteres"),
});

const CentroAyuda = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  const handleSubmitFeedback = () => {
    try {
      feedbackSchema.parse({ feedback });
      toast.success("¡Gracias por tus comentarios!");
      setFeedback("");
      setFeedbackError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFeedbackError(error.errors[0].message);
      }
    }
  };

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
      question: "¿Puedo pedir un reembolso?",
      answer: "Los reembolsos se procesan solo si el comercio cancela el pedido o no tiene stock disponible. En otros casos, contacta a nuestro equipo de soporte.",
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Chat en vivo",
      description: "Respuesta en minutos",
      action: () => navigate("/perfil/centro-ayuda/chat"),
    },
    {
      icon: Mail,
      title: "Email",
      description: "soporte@sobrazero.com",
      action: () => window.location.href = "mailto:soporte@sobrazero.com?subject=Consulta%20desde%20SobraZero&body=Hola%20SobraZero.%20Tengo%20un%20problema%20con%20lo%20siguiente%3A",
    },
  ];

  const resourcesItems = [
    {
      title: "Guía de uso para principiantes",
      content: "Con este video interactivo vas a entender a la perfección cómo funciona nuestra app: (próximamente disponible)",
    },
    {
      title: "Términos y condiciones",
      content: "Bienvenido a SobraZero. Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones. SobraZero actúa como intermediario entre comercios y usuarios para facilitar la venta de alimentos a precios reducidos. Los usuarios deben tener al menos 18 años o contar con autorización parental. Las reservas son vinculantes y están sujetas a las políticas de cancelación establecidas. SobraZero se reserva el derecho de modificar estos términos en cualquier momento, notificando a los usuarios con antelación razonable. El uso continuado de la aplicación implica la aceptación de los términos modificados.",
    },
    {
      title: "Política de privacidad",
      content: "En SobraZero valoramos tu privacidad. Recopilamos información personal como nombre, correo electrónico, ubicación y datos de pago únicamente para facilitar las transacciones y mejorar nuestros servicios. No compartimos tu información con terceros sin tu consentimiento, excepto cuando sea necesario para procesar pagos o cumplir con requisitos legales. Utilizamos medidas de seguridad estándar de la industria para proteger tus datos. Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier momento contactando a nuestro equipo de soporte.",
    },
    {
      title: "Sobre nosotros",
      content: "SobraZero nació como un proyecto final de tres jóvenes estudiantes de la escuela Da Vinci: Tomás, Blas y Santiago. Unidos por la pasión de combatir el desperdicio de alimentos y ayudar a nuestra comunidad, desarrollamos esta aplicación con el objetivo de conectar comercios locales con usuarios conscientes del medio ambiente. Nuestro sueño es que ningún alimento en buen estado termine en la basura, mientras ayudamos a las personas a ahorrar dinero y disfrutar de comida deliciosa. Cada pack sorpresa es un paso hacia un futuro más sostenible.",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <DecorativeShapes />
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
      <main className="px-4 py-4 space-y-4 relative z-10">
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
        <div>
          <h2 className="font-semibold mb-3 px-1 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Recursos adicionales
          </h2>
          <Card>
            <Accordion type="single" collapsible className="w-full">
              {resourcesItems.map((item, index) => (
                <AccordionItem key={index} value={`resource-${index}`}>
                  <AccordionTrigger className="px-4 text-left">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-muted-foreground">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>

        {/* Feedback */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2 text-center">¿No encontraste lo que buscabas?</h3>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Ayúdanos a mejorar nuestro centro de ayuda
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="feedback">Tu comentario</Label>
              <Textarea
                id="feedback"
                placeholder="Cuéntanos qué podemos mejorar..."
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                  setFeedbackError("");
                }}
                className="mt-1 min-h-[100px]"
              />
              {feedbackError && (
                <p className="text-sm text-destructive mt-1">{feedbackError}</p>
              )}
            </div>
            <Button onClick={handleSubmitFeedback} className="w-full">
              Enviar comentarios
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default CentroAyuda;
