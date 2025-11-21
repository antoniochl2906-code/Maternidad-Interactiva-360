"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Phone, 
  Calendar,
  Sparkles,
  Loader2,
  Navigation,
  MapPin,
  SkipForward
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  actions?: MessageAction[];
}

interface MessageAction {
  label: string;
  action: () => void;
  variant?: "primary" | "secondary";
}

interface TourStep {
  id: string;
  section: string;
  description: string;
  route: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "controles",
    section: "Controles Prenatales",
    description: "Aquí encontrarás información sobre los controles médicos durante tu embarazo, qué se hace en cada uno y cuándo asistir.",
    route: "/controles-prenatales",
  },
  {
    id: "ecografias",
    section: "Ecografías",
    description: "Descubre todas las ecografías recomendadas durante el embarazo y qué información proporciona cada una.",
    route: "/ecografias",
  },
  {
    id: "laboratorios",
    section: "Laboratorios",
    description: "Conoce los exámenes de laboratorio necesarios en cada trimestre de tu embarazo.",
    route: "/laboratorios",
  },
  {
    id: "signos",
    section: "Signos de Alarma",
    description: "Identifica los signos de alarma que requieren atención médica inmediata.",
    route: "/signos-de-alarma",
  },
  {
    id: "calculadoras",
    section: "Calculadoras",
    description: "Utiliza nuestras calculadoras interactivas para evaluar riesgos y llevar el seguimiento de tu embarazo.",
    route: "/calculadoras",
  },
  {
    id: "discusion",
    section: "Discusión Científica",
    description: "Accede a artículos científicos y actualizaciones en salud materno-infantil.",
    route: "/discusion-cientifica",
  },
  {
    id: "contacto",
    section: "Contacto / Equipo",
    description: "Conoce nuestro equipo médico y cómo contactarnos en caso de emergencia.",
    route: "/contacto",
  },
];

export default function Chatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [hasSeenTour, setHasSeenTour] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Check if user has seen tour
  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = localStorage.getItem("mi360_seen_tour");
      setHasSeenTour(!!seen);
    }
  }, []);

  // Initialize messages with tour if first visit
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      if (!hasSeenTour) {
        // Show tour introduction message
        setMessages([
          {
            id: 1,
            text: "¡Hola! Soy tu asistente virtual. ¿Quieres un tour rápido por Maternidad Interactiva 360? Puedo mostrarte: Controles Prenatales, Ecografías, Laboratorios, Signos de Alarma, Calculadoras, Discusión Científica y Contacto. ¿Quieres que empiece?",
            sender: "bot",
            timestamp: new Date(),
            actions: [
              {
                label: "¡Sí, empieza el tour!",
                action: () => startTour(),
                variant: "primary",
              },
              {
                label: "Saltar tour",
                action: () => skipTour(),
                variant: "secondary",
              },
            ],
          },
        ]);
      } else {
        // Regular greeting
        setMessages([
          {
            id: 1,
            text: "¡Hola! 👋 Soy tu asistente virtual de Maternidad Interactiva 360. ¿En qué puedo ayudarte hoy? Puedo explicarte sobre controles prenatales, ecografías, laboratorios, signos de alarma, o ayudarte a programar una cita.",
            sender: "bot",
            timestamp: new Date(),
            actions: [
              {
                label: "Repetir Tour",
                action: () => startTour(),
                variant: "secondary",
              },
            ],
          },
        ]);
      }
    }
  }, [isOpen, hasSeenTour]);

  const startTour = () => {
    setTourActive(true);
    setTourStep(0);
    localStorage.setItem("mi360_seen_tour", "true");
    setHasSeenTour(true);
    showTourStep(0);
  };

  const skipTour = () => {
    localStorage.setItem("mi360_seen_tour", "true");
    setHasSeenTour(true);
    setMessages([
      {
        id: Date.now(),
        text: "¡Hola! 👋 Soy tu asistente virtual de Maternidad Interactiva 360. ¿En qué puedo ayudarte hoy? Puedo explicarte sobre controles prenatales, ecografías, laboratorios, signos de alarma, o ayudarte a programar una cita.",
        sender: "bot",
        timestamp: new Date(),
        actions: [
          {
            label: "Repetir Tour",
            action: () => startTour(),
            variant: "secondary",
          },
        ],
      },
    ]);
  };

  const showTourStep = (stepIndex: number) => {
    if (stepIndex >= TOUR_STEPS.length) {
      endTour();
      return;
    }

    const step = TOUR_STEPS[stepIndex];
    const isLast = stepIndex === TOUR_STEPS.length - 1;

    const stepMessage: Message = {
      id: Date.now(),
      text: `${stepIndex + 1}/${TOUR_STEPS.length}: ${step.section}\n\n${step.description}`,
      sender: "bot",
      timestamp: new Date(),
      actions: [
        {
          label: "Ir a esta sección",
          action: () => {
            router.push(step.route);
            setTimeout(() => {
              nextTourStep();
            }, 500);
          },
          variant: "primary",
        },
        {
          label: isLast ? "Finalizar" : "Siguiente",
          action: () => nextTourStep(),
          variant: "secondary",
        },
        {
          label: "Saltar tour",
          action: () => skipTour(),
          variant: "secondary",
        },
      ],
    };

    setMessages([stepMessage]);
  };

  const nextTourStep = () => {
    const next = tourStep + 1;
    setTourStep(next);
    showTourStep(next);
  };

  const endTour = () => {
    setTourActive(false);
    setMessages([
      {
        id: Date.now(),
        text: "¡Tour completado! 🎉 Ya conoces las principales secciones de Maternidad Interactiva 360. ¿En qué más puedo ayudarte?",
        sender: "bot",
        timestamp: new Date(),
        actions: [
          {
            label: "Repetir Tour",
            action: () => startTour(),
            variant: "secondary",
          },
        ],
      },
    ]);
  };

  const addBotMessage = (text: string, actions?: MessageAction[]) => {
    const botMessage: Message = {
      id: Date.now(),
      text,
      sender: "bot",
      timestamp: new Date(),
      actions,
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const navigateToSection = (route: string) => {
    router.push(route);
    const sectionName = TOUR_STEPS.find((s) => s.route === route)?.section || "esta sección";
    addBotMessage(`Te estoy llevando a ${sectionName}. ¡Explora la información disponible!`);
  };

  // Simulación de respuestas de IA
  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Respuestas sobre controles prenatales
    if (lowerMessage.includes("control") || lowerMessage.includes("prenatal")) {
      return "Los controles prenatales son consultas médicas regulares durante el embarazo. Generalmente se requieren 8-12 controles: cada 4 semanas hasta la 28, cada 2 semanas hasta la 36, y semanalmente después. ¿Te gustaría ver el calendario completo?";
    }

    // Respuestas sobre ecografías
    if (lowerMessage.includes("ecografía") || lowerMessage.includes("ultrasonido")) {
      return "Las ecografías recomendadas son: Confirmación (6-8 semanas), Translucencia Nucal (11-14 semanas), Morfológica (18-22 semanas - la más importante), Crecimiento (28-32 semanas) y Final (36-38 semanas). ¿Quieres más detalles sobre alguna?";
    }

    // Respuestas sobre laboratorios
    if (lowerMessage.includes("laboratorio") || lowerMessage.includes("examen") || lowerMessage.includes("análisis")) {
      return "Los exámenes de laboratorio varían por trimestre. En el primero: hemograma, grupo sanguíneo, VDRL, VIH, hepatitis B, glicemia, orina completa y TSH. ¿Te muestro el calendario completo de laboratorios?";
    }

    // Respuestas sobre signos de alarma
    if (lowerMessage.includes("signo") || lowerMessage.includes("alarma") || lowerMessage.includes("emergencia")) {
      return "Los signos de alarma incluyen: sangrado vaginal, dolor abdominal intenso, dolor de cabeza severo, visión borrosa, dificultad para respirar, fiebre alta, vómitos persistentes, pérdida de líquido, disminución de movimientos fetales, hinchazón súbita, dolor al orinar o contracciones antes de tiempo. Si tienes alguno, busca atención inmediata. ¿Quieres más información sobre algún signo específico?";
    }

    // Programar cita
    if (lowerMessage.includes("cita") || lowerMessage.includes("agendar") || lowerMessage.includes("programar")) {
      return "Para programar una cita, necesito algunos datos. Por favor, comparte tu nombre, semana gestacional actual y número de WhatsApp. También puedo conectarte directamente con nuestro equipo médico.";
    }

    // Respuestas generales
    if (lowerMessage.includes("hola") || lowerMessage.includes("buenos días") || lowerMessage.includes("buenas tardes")) {
      return "¡Hola! 😊 Estoy aquí para ayudarte con cualquier pregunta sobre tu embarazo. ¿Qué te gustaría saber?";
    }

    if (lowerMessage.includes("gracias") || lowerMessage.includes("muchas gracias")) {
      return "¡De nada! 😊 Estoy aquí siempre que me necesites. ¿Hay algo más en lo que pueda ayudarte?";
    }

    // Navegación a secciones
    if (lowerMessage.includes("ir a") || lowerMessage.includes("mostrar") || lowerMessage.includes("ver")) {
      if (lowerMessage.includes("control") || lowerMessage.includes("prenatal")) {
        setTimeout(() => navigateToSection("/controles-prenatales"), 500);
        return "Te llevo a la sección de Controles Prenatales...";
      }
      if (lowerMessage.includes("ecografía") || lowerMessage.includes("ultrasonido")) {
        setTimeout(() => navigateToSection("/ecografias"), 500);
        return "Te llevo a la sección de Ecografías...";
      }
      if (lowerMessage.includes("laboratorio") || lowerMessage.includes("examen")) {
        setTimeout(() => navigateToSection("/laboratorios"), 500);
        return "Te llevo a la sección de Laboratorios...";
      }
      if (lowerMessage.includes("signo") || lowerMessage.includes("alarma")) {
        setTimeout(() => navigateToSection("/signos-de-alarma"), 500);
        return "Te llevo a la sección de Signos de Alarma...";
      }
      if (lowerMessage.includes("calculadora")) {
        setTimeout(() => navigateToSection("/calculadoras"), 500);
        return "Te llevo a la sección de Calculadoras...";
      }
      if (lowerMessage.includes("discusión") || lowerMessage.includes("científica") || lowerMessage.includes("artículo")) {
        setTimeout(() => navigateToSection("/discusion-cientifica"), 500);
        return "Te llevo a la sección de Discusión Científica...";
      }
      if (lowerMessage.includes("contacto") || lowerMessage.includes("equipo")) {
        setTimeout(() => navigateToSection("/contacto"), 500);
        return "Te llevo a la sección de Contacto...";
      }
    }

    // Respuesta por defecto
    return "Entiendo tu pregunta. Te recomiendo revisar nuestra sección de información completa. ¿Te gustaría que te guíe a alguna sección específica como controles prenatales, ecografías, laboratorios o signos de alarma?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Controles prenatales", action: () => setInputValue("¿Qué son los controles prenatales?") },
    { text: "Ecografías", action: () => setInputValue("¿Cuántas ecografías necesito?") },
    { text: "Signos de alarma", action: () => setInputValue("¿Cuáles son los signos de alarma?") },
    { text: "Programar cita", action: () => setInputValue("Quiero programar una cita") },
  ];

  return (
    <>
      {/* Botón flotante */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="rounded-full w-16 h-16 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Ventana del chatbot */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[600px] z-50 flex flex-col"
            >
              <Card className="flex flex-col h-full shadow-2xl border-2 border-primary/20 bg-white/95 backdrop-blur-md">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Bot className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-white">Asistente Virtual</h3>
                      <p className="text-xs text-white/80">Maternidad Interactiva 360</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-primary/5">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col gap-2 ${message.sender === "user" ? "items-end" : "items-start"}`}
                    >
                      <div className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {message.sender === "bot" && (
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0"
                          >
                            <Bot className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-primary to-secondary text-white"
                              : "bg-white border border-primary/20 text-gray-800"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString("es-ES", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </motion.div>
                        {message.sender === "user" && (
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        )}
                      </div>
                      {/* Message Actions */}
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 max-w-[80%]">
                          {message.actions.map((action, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant={action.variant === "primary" ? "default" : "outline"}
                              onClick={action.action}
                              className="text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-primary/20 rounded-2xl px-4 py-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="px-4 py-2 border-t border-primary/10 bg-white/50">
                    <p className="text-xs text-muted-foreground mb-2">Acciones rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            action.action();
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className="text-xs"
                        >
                          {action.text}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-primary/10 bg-white">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-primary to-secondary"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-2 flex gap-2 text-xs text-muted-foreground flex-wrap">
                    {!tourActive && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setInputValue("Quiero programar una cita");
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className="h-6 text-xs"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Cita
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                          className="h-6 text-xs"
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startTour()}
                          className="h-6 text-xs"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Tour
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

