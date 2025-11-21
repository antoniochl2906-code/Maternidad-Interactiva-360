"use client";

import { motion } from "framer-motion";
import { Heart, Baby, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-muted/20 py-20 md:py-32">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/FONDO 1 PAGINA.jpg"
          alt="Fondo"
          className="w-full h-full object-cover opacity-20"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-muted/20" />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-flex items-center justify-center space-x-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Guía Digital Inteligente</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
          >
            <span className="text-primary">Maternidad</span>{" "}
            <span className="text-secondary">Interactiva 360</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Tu compañera digital durante el embarazo. Calculadoras, información 
            y recursos para un control prenatal informado y seguro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/calculadoras">
              <Button size="lg" className="text-lg px-8 py-6">
                <Baby className="mr-2 h-5 w-5" />
                Explorar Calculadoras
              </Button>
            </Link>
            <Link href="/controles-prenatales">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Heart className="mr-2 h-5 w-5" />
                Controles Prenatales
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}







