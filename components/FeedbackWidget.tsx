"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, X, Check, Send } from "lucide-react";

interface FeedbackData {
  id: string;
  name?: string;
  email?: string;
  rating: number;
  comment: string;
  page: string;
  date: string;
  honeypot?: string; // Anti-spam field
}

interface FeedbackWidgetProps {
  onClose?: () => void;
  page?: string;
  showAsModal?: boolean;
}

export default function FeedbackWidget({ onClose, page, showAsModal = false }: FeedbackWidgetProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  // Rate limiting: max 3 submissions per 10 minutes (client-side)
  const RATE_LIMIT_MS = 10 * 60 * 1000; // 10 minutes
  const MAX_SUBMISSIONS = 3;

  const getCurrentPage = () => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return page || "/";
  };

  const saveFeedback = (feedbackData: FeedbackData) => {
    try {
      const existing = localStorage.getItem("mi360_feedback");
      const feedbacks = existing ? JSON.parse(existing) : [];
      feedbacks.push(feedbackData);
      localStorage.setItem("mi360_feedback", JSON.stringify(feedbacks));
      console.log("Feedback guardado en localStorage:", feedbackData);
    } catch (error) {
      console.error("Error al guardar feedback:", error);
    }
  };

  const checkRateLimit = (): boolean => {
    const now = Date.now();
    const recentFeedbacks = getRecentFeedbacks(now);
    
    if (recentFeedbacks.length >= MAX_SUBMISSIONS) {
      alert(`Has enviado ${MAX_SUBMISSIONS} evaluaciones recientemente. Por favor espera unos minutos antes de enviar otra.`);
      return false;
    }
    
    return true;
  };

  const getRecentFeedbacks = (timestamp: number): FeedbackData[] => {
    try {
      const existing = localStorage.getItem("mi360_feedback");
      if (!existing) return [];
      
      const feedbacks: FeedbackData[] = JSON.parse(existing);
      return feedbacks.filter(
        (f) => timestamp - new Date(f.date).getTime() < RATE_LIMIT_MS
      );
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (rating === 0) {
      alert("Por favor selecciona una calificación.");
      return;
    }

    if (comment.length > 1000) {
      alert("El comentario no puede exceder 1000 caracteres.");
      return;
    }

    // Anti-spam: si el campo honeypot tiene valor, es un bot
    if (honeypot) {
      console.warn("Spam detectado (honeypot)");
      return;
    }

    // Rate limiting
    if (!checkRateLimit()) {
      return;
    }

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      rating,
      comment: comment.trim(),
      page: getCurrentPage(),
      date: new Date().toISOString(),
    };

    // Intentar enviar a API si existe
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error("API no disponible");
      }
    } catch (error) {
      // Si no hay API o falla, guardar en localStorage
      saveFeedback(feedbackData);
    }

    setLastSubmitTime(Date.now());
    setSubmitted(true);
    setIsSubmitting(false);

    // Reset después de 3 segundos si es modal
    if (showAsModal) {
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment("");
        setName("");
        setEmail("");
        if (onClose) onClose();
      }, 3000);
    } else {
      // Si no es modal, mantener el estado de éxito
      setTimeout(() => {
        setRating(0);
        setComment("");
        setName("");
        setEmail("");
      }, 3000);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-2 justify-center" role="radiogroup" aria-label="Calificación">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
            aria-label={`Calificar con ${star} ${star === 1 ? "estrella" : "estrellas"}`}
            aria-pressed={rating >= star}
          >
            <Star
              className={`w-10 h-10 transition-all duration-200 ${
                (hoveredRating >= star || rating >= star)
                  ? "fill-yellow-400 text-yellow-400 scale-110"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const content = (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Evalúanos / Ayúdanos a mejorar
          </CardTitle>
          {showAsModal && onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Tu opinión es muy importante para nosotros. Comparte tu experiencia.
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-block mb-4"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center mx-auto">
                  <Check className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Gracias por tu evaluación!
              </h3>
              <p className="text-muted-foreground">
                Tu feedback nos ayuda a mejorar continuamente.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Honeypot field (oculto para humanos, visible para bots) */}
              <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                <Label htmlFor="honeypot">No llenar este campo</Label>
                <Input
                  id="honeypot"
                  name="honeypot"
                  type="text"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Rating Stars */}
              <div>
                <Label className="text-base font-semibold mb-4 block text-center">
                  ¿Qué tan satisfecho estás con tu experiencia? *
                </Label>
                {renderStars()}
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-3 text-sm text-muted-foreground"
                  >
                    {rating === 5 && "¡Excelente! 😊"}
                    {rating === 4 && "Muy bien 👍"}
                    {rating === 3 && "Bien 🙂"}
                    {rating === 2 && "Regular 😐"}
                    {rating === 1 && "Necesita mejorar 😕"}
                  </motion.p>
                )}
              </div>

              {/* Comment */}
              <div>
                <Label htmlFor="comment" className="text-base font-semibold">
                  Comentarios (opcional, máx. 1000 caracteres)
                </Label>
                <Textarea
                  id="comment"
                  ref={commentRef}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Comparte tus comentarios, sugerencias o experiencias..."
                  maxLength={1000}
                  className="mt-2 min-h-[120px] resize-none"
                  aria-label="Campo de comentarios"
                />
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  {comment.length}/1000
                </p>
              </div>

              {/* Optional fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre (opcional)</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="mt-1"
                    aria-label="Nombre opcional"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email (opcional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="mt-1"
                    aria-label="Email opcional"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Evaluación
                    </>
                  )}
                </Button>
                {showAsModal && onClose && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
              <p className="text-xs text-center text-muted-foreground">
                * Campos obligatorios
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );

  if (showAsModal) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="feedback-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl"
          >
            {content}
          </motion.div>
        </motion.div>
      </>
    );
  }

  return <div className="container mx-auto px-4 py-12">{content}</div>;
}

