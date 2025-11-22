"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import FeedbackWidget from "@/components/FeedbackWidget";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

      {/* Info Section - Mejorado con mejor diseño */}
      <div className="container mx-auto px-4 pb-12">
        <ScrollReveal delay={0.2}>
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/30 shadow-2xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-4"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm shadow-lg">
                  <Heart className="w-12 h-12 text-primary fill-primary" />
                </div>
              </motion.div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                ¿Por qué tu opinión es importante?
              </CardTitle>
              <div className="text-lg text-muted-foreground">
                Tu feedback es fundamental para mejorar Maternidad Interactiva 360
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 rounded-lg p-6 border-2 border-primary/20 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Mejora Continua</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nos ayuda a mejorar continuamente la experiencia de todas las futuras mamás.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 rounded-lg p-6 border-2 border-secondary/20 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-full bg-secondary/20">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Identificación de Áreas</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Identificamos áreas de mejora en la información y recursos que ofrecemos.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 rounded-lg p-6 border-2 border-primary/20 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-primary">Priorización</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Tu feedback nos permite priorizar nuevas funcionalidades y contenido útil.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/80 rounded-lg p-6 border-2 border-secondary/20 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-full bg-secondary/20">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-bold text-secondary">Revisión Seria</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Todos tus comentarios son revisados y considerados seriamente.
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}

