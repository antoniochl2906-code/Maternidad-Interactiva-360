"use client";

import Hero from "@/components/Hero";
import ImageCard from "@/components/ImageCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { 
  Calculator, 
  Calendar, 
  Stethoscope, 
  TestTube, 
  AlertTriangle,
  Heart,
  Baby,
  BookOpen,
  Shield,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Calculator,
      title: "Calculadoras Interactivas",
      description: "Herramientas para calcular semanas de gestación, aumento de peso, y evaluar riesgos.",
      href: "/calculadoras",
      color: "text-primary",
    },
    {
      icon: Calendar,
      title: "Controles Prenatales",
      description: "Información sobre cuántos controles necesitas y qué se hace en cada uno.",
      href: "/controles-prenatales",
      color: "text-secondary",
    },
    {
      icon: Stethoscope,
      title: "Ecografías",
      description: "Guía sobre las ecografías recomendadas durante el embarazo.",
      href: "/ecografias",
      color: "text-primary",
    },
    {
      icon: TestTube,
      title: "Laboratorios",
      description: "Información sobre los exámenes de laboratorio durante el embarazo.",
      href: "/laboratorios",
      color: "text-secondary",
    },
    {
      icon: AlertTriangle,
      title: "Signos de Alarma",
      description: "Reconoce los signos de alarma y cuándo acudir a emergencias.",
      href: "/signos-de-alarma",
      color: "text-destructive",
    },
    {
      icon: BookOpen,
      title: "Riesgos Frecuentes",
      description: "Información sobre preeclampsia, diabetes gestacional y otros riesgos.",
      href: "/riesgos-frecuentes",
      color: "text-primary",
    },
  ];

  return (
    <div>
      <Hero />

      {/* Imagen de Inicio */}
      <section className="py-12 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <ImageCard
              imageSrc="/INICIO PAGINA.jpg"
              title="Bienvenida a tu embarazo"
              description="Tu compañera digital durante esta hermosa etapa"
              delay={0.1}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Todo lo que necesitas saber
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recursos completos y herramientas interactivas para acompañarte 
              en cada etapa de tu embarazo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className={`mb-4 ${feature.color}`}>
                        <Icon className="h-10 w-10" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full">
                        Explorar →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sección: ¿Qué son los controles prenatales? */}
      <section className="py-20 bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-6"
              >
                <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm shadow-lg">
                  <Stethoscope className="w-16 h-16 text-primary" />
                </div>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                ¿Qué son los controles prenatales y por qué son importantes?
              </h2>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-primary/20 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Ilustración animada */}
                  <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center min-h-[300px]">
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                      <Baby className="w-32 h-32 text-primary relative z-10" />
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Heart className="w-24 h-24 text-secondary/30" />
                    </motion.div>
                  </div>

                  {/* Contenido de texto */}
                  <div className="p-8">
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p className="text-lg">
                        Los <strong className="text-primary">controles prenatales</strong> son consultas médicas regulares 
                        que se realizan durante el embarazo para monitorear la salud de la madre y del bebé en desarrollo. 
                        Estas visitas son fundamentales para detectar y prevenir complicaciones tempranamente.
                      </p>
                      <p>
                        Son <strong className="text-secondary">esenciales</strong> porque permiten identificar factores de riesgo, 
                        monitorear el crecimiento fetal, evaluar la salud materna y proporcionar educación sobre el embarazo, 
                        el parto y el cuidado del recién nacido.
                      </p>
                      <p>
                        Los controles prenatales <strong className="text-primary">reducen significativamente los riesgos</strong> 
                        de complicaciones como preeclampsia, diabetes gestacional, parto prematuro y bajo peso al nacer. 
                        Además, facilitan la detección temprana de problemas que pueden tratarse efectivamente.
                      </p>
                      <p>
                        Los <strong className="text-secondary">beneficios</strong> son múltiples: para la mamá, incluyen mejor 
                        preparación física y emocional, detección temprana de condiciones de salud, y reducción de ansiedad. 
                        Para el bebé, significan mejor desarrollo, menor riesgo de complicaciones y mayor probabilidad de un 
                        parto saludable.
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="mt-8"
                    >
                      <Link href="/controles-prenatales">
                        <Button 
                          size="lg" 
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-lg px-8 py-6"
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Ver calendario de controles
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Acceso Rápido
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link href="/signos-de-alarma">
              <Card className="bg-red-50 border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-red-900">Signos de Alarma</CardTitle>
                  </div>
                  <CardDescription className="text-red-800">
                    Si experimentas alguno de estos signos, busca atención médica inmediata.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    Ver Signos de Alarma
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/contacto">
              <Card className="bg-primary/10 border-primary/30 hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                    <CardTitle className="text-primary">Contacto / Emergencias</CardTitle>
                  </div>
                  <CardDescription>
                    Información de contacto y qué hacer en caso de emergencia.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Ver Información de Contacto
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}







