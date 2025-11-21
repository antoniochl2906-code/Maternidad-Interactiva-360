"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, AlertCircle, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FeedbackWidget from "@/components/FeedbackWidget";

export default function Footer() {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  return (
    <footer className="bg-muted/50 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Maternidad Interactiva 360
            </h3>
            <p className="text-sm text-muted-foreground">
              Guía digital inteligente para el control prenatal. 
              Recursos, calculadoras e información para acompañarte en tu embarazo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/signos-de-alarma" className="text-muted-foreground hover:text-primary transition-colors">
                  Signos de Alarma
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-primary transition-colors">
                  Contacto / Emergencias
                </Link>
              </li>
              <li>
                <Link href="/calculadoras" className="text-muted-foreground hover:text-primary transition-colors">
                  Calculadoras
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Emergencias
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              En caso de emergencia, acude inmediatamente a tu centro de salud más cercano.
            </p>
            <Link href="/contacto">
              <button className="text-sm font-medium text-primary hover:underline">
                Ver información de contacto →
              </button>
            </Link>
          </div>

          {/* Feedback Link */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">
              Ayúdanos a Mejorar
            </h3>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <Star className="w-4 h-4" />
              Evalúanos
            </button>
            <Link
              href="/evaluanos"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Ver página de evaluación →
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 font-semibold">
            Aviso Importante
          </AlertTitle>
          <AlertDescription className="text-amber-800 text-sm mt-2">
            <strong>Este sistema NO reemplaza la consulta médica.</strong> La información y 
            calculadoras proporcionadas son orientativas y educativas. Siempre consulta con 
            tu médico o profesional de la salud para diagnóstico, tratamiento y seguimiento 
            de tu embarazo. En caso de emergencia, acude inmediatamente a un centro de salud.
          </AlertDescription>
        </Alert>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 pt-8 border-t relative overflow-hidden"
        >
          {/* Fondo con patrón suave y animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50">
            <motion.div
              animate={{
                x: [0, 100, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </div>
          
          {/* Ondas decorativas */}
          <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <motion.path
                d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
                fill="url(#wave-gradient)"
                animate={{
                  d: [
                    "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                    "M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z",
                    "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <defs>
                <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-base font-bold text-gray-900 mb-3"
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Hecho con
              </motion.span>
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              </motion.div>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                para futuras mamás
              </motion.span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-sm font-bold text-gray-800"
            >
              © 2025 Maternidad Interactiva 360. Todos los derechos reservados.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackWidget
          showAsModal
          onClose={() => setShowFeedbackModal(false)}
          page={typeof window !== "undefined" ? window.location.pathname : "/"}
        />
      )}
    </footer>
  );
}







