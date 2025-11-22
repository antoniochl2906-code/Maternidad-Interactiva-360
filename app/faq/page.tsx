"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle, MessageSquare, Send, Mail, Phone, User, Star, ExternalLink, ThumbsUp, ThumbsDown, Calendar, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";
import Link from "next/link";

interface Comment {
  id: number;
  name: string;
  email: string;
  comment: string;
  date: string;
  rating?: number;
  helpful?: number;
  notHelpful?: number;
}

interface FAQItem {
  question: string;
  answer: string;
  relatedLink?: string;
  comments: Comment[];
  averageRating: number;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "¿Cuántos controles prenatales necesito?",
      answer: "Generalmente se requieren 8-12 controles durante el embarazo. La frecuencia aumenta hacia el final del embarazo: cada 4 semanas hasta la 28, cada 2 semanas hasta la 36, y semanalmente después de la semana 36.",
      relatedLink: "/controles-prenatales",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Es normal tener náuseas durante el embarazo?",
      answer: "Sí, las náuseas son comunes, especialmente en el primer trimestre. Si son muy severas o te impiden comer o beber, consulta con tu médico.",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Cuánto peso debo aumentar durante el embarazo?",
      answer: "El aumento de peso recomendado depende de tu IMC inicial. Generalmente: IMC normal (18.5-24.9): 11-16 kg, IMC bajo (<18.5): 12-18 kg, IMC alto (25-29.9): 7-11 kg, IMC obeso (≥30): 5-9 kg.",
      relatedLink: "/calculadoras/aumento-peso",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Puedo hacer ejercicio durante el embarazo?",
      answer: "Sí, el ejercicio moderado es beneficioso durante el embarazo, a menos que tu médico te indique lo contrario. Evita deportes de contacto o de alto impacto.",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Cuándo debo preocuparme por los movimientos del bebé?",
      answer: "Debes sentir movimientos regulares a partir de las 18-20 semanas. Si notas una disminución significativa en los movimientos, especialmente después de las 28 semanas, consulta con tu médico.",
      relatedLink: "/signos-de-alarma",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Qué alimentos debo evitar durante el embarazo?",
      answer: "Evita pescado crudo, carnes poco cocidas, huevos crudos, lácteos no pasteurizados, alcohol y exceso de cafeína. Consulta con tu médico sobre una dieta balanceada.",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Es seguro viajar durante el embarazo?",
      answer: "Generalmente es seguro viajar durante el segundo trimestre. Evita viajes largos en el tercer trimestre y consulta con tu médico antes de viajar.",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Qué es la preeclampsia?",
      answer: "La preeclampsia es una complicación caracterizada por presión arterial alta y proteinuria después de las 20 semanas. Requiere monitoreo médico cercano.",
      relatedLink: "/preeclampsia",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Cuántas ecografías necesito?",
      answer: "Generalmente se realizan 3-5 ecografías durante un embarazo normal: confirmación (6-8 semanas), translucencia nucal (11-14 semanas), morfológica (18-22 semanas), crecimiento (28-32 semanas) y final (36-38 semanas).",
      relatedLink: "/ecografias",
      comments: [],
      averageRating: 0,
    },
    {
      question: "¿Cuándo debo acudir a emergencias?",
      answer: "Acude a emergencias si tienes sangrado vaginal, dolor abdominal intenso, dolor de cabeza severo, visión borrosa, fiebre alta, pérdida de líquido, o disminución de movimientos fetales.",
      relatedLink: "/signos-de-alarma",
      comments: [],
      averageRating: 0,
    },
  ]);

  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number | null>(null);
  const [newComment, setNewComment] = useState({ name: "", email: "", comment: "", rating: 0 });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [showCommentSuccess, setShowCommentSuccess] = useState(false);

  const handleSubmitComment = (faqIndex: number) => {
    if (newComment.name.trim() && newComment.comment.trim() && newComment.email.trim()) {
      const comment: Comment = {
        id: Date.now(),
        name: newComment.name,
        email: newComment.email,
        comment: newComment.comment,
        rating: newComment.rating,
        date: new Date().toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        helpful: 0,
        notHelpful: 0,
      };
      
      const updatedFaqs = [...faqs];
      updatedFaqs[faqIndex].comments.push(comment);
      if (comment.rating) {
        const ratings = updatedFaqs[faqIndex].comments.filter(c => c.rating).map(c => c.rating!);
        updatedFaqs[faqIndex].averageRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      }
      setFaqs(updatedFaqs);
      setNewComment({ name: "", email: "", comment: "", rating: 0 });
      setShowCommentSuccess(true);
      setTimeout(() => setShowCommentSuccess(false), 3000);
    }
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name.trim() && contactForm.email.trim() && contactForm.message.trim()) {
      // Aquí normalmente enviarías el formulario a un servidor
      console.log("Formulario de contacto:", contactForm);
      setContactForm({ name: "", email: "", message: "" });
      setShowContactSuccess(true);
      setTimeout(() => setShowContactSuccess(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-primary/10">
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Preguntas Frecuentes (FAQ)
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Respuestas a las preguntas más comunes sobre el embarazo
          </p>
        </motion.div>

        {/* Imagen de FAQ */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/FAQ.jpg"
              title="Preguntas Frecuentes"
              description="Respuestas a las preguntas más comunes sobre el embarazo"
            />
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Haz clic en cada pregunta para ver la respuesta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center justify-between w-full pr-4">
                        <span>{faq.question}</span>
                        {faq.averageRating > 0 && (
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{faq.averageRating.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        
                        {faq.relatedLink && (
                          <Link href={faq.relatedLink}>
                            <Button variant="outline" size="sm" className="mt-2">
                              ¿Quieres saber más?
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        )}

                        {/* Evaluación con estrellas */}
                        <div className="border-t pt-4 mt-4">
                          <Label className="mb-2 block">¿Te fue útil esta respuesta?</Label>
                          <div className="flex items-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => {
                                  setSelectedFaqIndex(index);
                                  setNewComment({ ...newComment, rating: star });
                                }}
                                className={`${
                                  newComment.rating >= star
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                } hover:text-yellow-500 transition-colors`}
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    newComment.rating >= star ? "fill-current" : ""
                                  }`}
                                />
                              </button>
                            ))}
                            {newComment.rating > 0 && (
                              <span className="text-sm text-muted-foreground ml-2">
                                {newComment.rating}/5
                              </span>
                            )}
                          </div>

                          {/* Formulario de comentario */}
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor={`comment-name-${index}`}>Tu nombre</Label>
                                <Input
                                  id={`comment-name-${index}`}
                                  placeholder="Escribe tu nombre"
                                  value={selectedFaqIndex === index ? newComment.name : ""}
                                  onChange={(e) => {
                                    setSelectedFaqIndex(index);
                                    setNewComment({ ...newComment, name: e.target.value });
                                  }}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`comment-email-${index}`}>Tu email</Label>
                                <Input
                                  id={`comment-email-${index}`}
                                  type="email"
                                  placeholder="tu@email.com"
                                  value={selectedFaqIndex === index ? newComment.email : ""}
                                  onChange={(e) => {
                                    setSelectedFaqIndex(index);
                                    setNewComment({ ...newComment, email: e.target.value });
                                  }}
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor={`comment-text-${index}`}>Tu comentario (opcional)</Label>
                              <textarea
                                id={`comment-text-${index}`}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Escribe tu comentario aquí..."
                                value={selectedFaqIndex === index ? newComment.comment : ""}
                                onChange={(e) => {
                                  setSelectedFaqIndex(index);
                                  setNewComment({ ...newComment, comment: e.target.value });
                                }}
                              />
                            </div>
                            <Button
                              onClick={() => handleSubmitComment(index)}
                              size="sm"
                              className="w-full sm:w-auto"
                            >
                              <Send className="mr-2 h-4 w-4" />
                              Enviar Evaluación
                            </Button>
                          </div>

                          {/* Comentarios anteriores */}
                          {faq.comments.length > 0 && (
                            <div className="mt-6 space-y-3 border-t pt-4">
                              <h4 className="font-semibold text-sm mb-3">
                                Comentarios ({faq.comments.length})
                              </h4>
                              {faq.comments.map((comment) => (
                                <Card key={comment.id} className="bg-muted/30">
                                  <CardContent className="pt-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-primary" />
                                        <span className="font-semibold text-sm">{comment.name}</span>
                                        {comment.rating && (
                                          <div className="flex items-center gap-1 text-yellow-500 ml-2">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-xs">{comment.rating}</span>
                                          </div>
                                        )}
                                      </div>
                                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                                    </div>
                                    {comment.comment && (
                                      <p className="text-sm text-muted-foreground mb-2">{comment.comment}</p>
                                    )}
                                    <div className="flex gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs"
                                        onClick={() => {
                                          const updated = [...faqs];
                                          updated[index].comments.find(c => c.id === comment.id)!.helpful = (comment.helpful || 0) + 1;
                                          setFaqs(updated);
                                        }}
                                      >
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        Útil ({comment.helpful || 0})
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 text-xs"
                                        onClick={() => {
                                          const updated = [...faqs];
                                          updated[index].comments.find(c => c.id === comment.id)!.notHelpful = (comment.notHelpful || 0) + 1;
                                          setFaqs(updated);
                                        }}
                                      >
                                        <ThumbsDown className="w-3 h-3 mr-1" />
                                        No útil ({comment.notHelpful || 0})
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>


        {/* Sección de Contacto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-secondary/10 border-secondary/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-secondary" />
                <CardTitle>Contáctanos</CardTitle>
              </div>
              <CardDescription>
                ¿Tienes una pregunta específica? Envíanos un mensaje y te responderemos pronto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Nombre</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder="Tu nombre"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">Mensaje</Label>
                  <textarea
                    id="contact-message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Escribe tu mensaje aquí..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto">
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
                {showContactSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-800">
                    ¡Mensaje enviado exitosamente! Te responderemos pronto.
                  </div>
                )}
              </form>

              {/* Información de contacto adicional */}
              <div className="mt-6 pt-6 border-t space-y-3">
                <h4 className="font-semibold text-sm mb-3">O contáctanos directamente:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>maternidadinteractiva306@outlook.es</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <a 
                      href="https://wa.me/59176284890" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-semibold"
                    >
                      +591 76284890
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>🕒 Todos los días los 365 días del año</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}



