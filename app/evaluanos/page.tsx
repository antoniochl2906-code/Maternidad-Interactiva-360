"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import FeedbackWidget from "@/components/FeedbackWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { Heart } from "lucide-react";

export default function EvaluanosPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 float-animation">
            <Heart className="w-32 h-32 text-primary" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-4"
              >
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                  <Heart className="w-12 h-12 text-primary fill-primary" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Evalúanos / Ayúdanos a mejorar
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Tu opinión es muy importante para nosotros. Ayúdanos a mejorar
                Maternidad Interactiva 360 compartiendo tu experiencia.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Feedback Widget */}
      <div className="container mx-auto px-4 py-12">
        <FeedbackWidget page="/evaluanos" />
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 pb-12">
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              ¿Por qué tu opinión es importante?
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>
                  Nos ayuda a mejorar continuamente la experiencia de todas las
                  futuras mamás.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>
                  Identificamos áreas de mejora en la información y recursos
                  que ofrecemos.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>
                  Tu feedback nos permite priorizar nuevas funcionalidades y
                  contenido útil.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span>
                  Todos tus comentarios son revisados y considerados
                  seriamente.
                </span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

