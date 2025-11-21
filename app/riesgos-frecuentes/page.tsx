"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ImageCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Heart, Activity, Droplet, Baby, Stethoscope } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

export default function RiesgosFrecuentesPage() {
  const riesgos = [
    {
      title: "Preeclampsia",
      description: "Hipertensión y proteinuria después de las 20 semanas de gestación.",
      href: "/preeclampsia",
      calculator: "/calculadoras/riesgo-preeclampsia",
      color: "bg-red-50 border-red-200",
      textColor: "text-red-900",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
      icon: Activity,
      gradient: "from-red-100 to-orange-100",
    },
    {
      title: "Hipertensión del Embarazo (HTA)",
      description: "Presión arterial alta que aparece durante el embarazo.",
      href: "/hta-embarazo",
      calculator: "/calculadoras/riesgo-hipertension",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-900",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
      icon: Heart,
      gradient: "from-orange-100 to-amber-100",
    },
    {
      title: "Diabetes Gestacional",
      description: "Diabetes que se desarrolla durante el embarazo.",
      href: "/diabetes-gestacional",
      calculator: "/calculadoras/riesgo-diabetes",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-900",
      image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&h=400&fit=crop&q=80",
      icon: Activity,
      gradient: "from-blue-100 to-cyan-100",
    },
    {
      title: "Parto Prematuro",
      description: "Nacimiento antes de las 37 semanas de gestación.",
      href: "/parto-prematuro",
      calculator: "/calculadoras/riesgo-parto-prematuro",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-900",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
      icon: Baby,
      gradient: "from-purple-100 to-pink-100",
    },
    {
      title: "Hemorragia en el Embarazo",
      description: "Sangrado anormal durante el embarazo.",
      href: "/hemorragia-embarazo",
      calculator: "/calculadoras/riesgo-hemorragia",
      color: "bg-pink-50 border-pink-200",
      textColor: "text-pink-900",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
      icon: Droplet,
      gradient: "from-pink-100 to-rose-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50/50 to-secondary/5 relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Stethoscope className="w-64 h-64 text-primary" />
        </div>
        <div className="absolute bottom-20 right-20">
          <AlertTriangle className="w-64 h-64 text-secondary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="inline-block mb-6"
            >
              <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm shadow-lg">
                <AlertTriangle className="w-16 h-16 text-primary" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Riesgos Frecuentes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Información completa sobre las complicaciones más comunes durante el embarazo
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Imagen de Riesgos Frecuentes */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/RIESGOS FRECUENTES.jpg"
              title="Riesgos Frecuentes en el Embarazo"
              description="Información sobre las complicaciones más comunes y cómo prevenirlas"
            />
          </div>
        </ScrollReveal>

        {/* Risks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {riesgos.map((riesgo, index) => {
            const Icon = riesgo.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className={`h-full ${riesgo.color} hover:shadow-xl transition-all border-2 overflow-hidden`}>
                    {/* Imagen */}
                    <div className={`relative h-48 bg-gradient-to-br ${riesgo.gradient} overflow-hidden`}>
                      <img
                        src={riesgo.image}
                        alt={riesgo.title}
                        className="w-full h-full object-cover opacity-40"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <Icon className={`w-24 h-24 ${riesgo.textColor}`} />
                        </motion.div>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <AlertTriangle className={`h-6 w-6 ${riesgo.textColor}`} />
                        <CardTitle className={`${riesgo.textColor} text-xl`}>{riesgo.title}</CardTitle>
                      </div>
                      <CardDescription className={riesgo.textColor}>
                        {riesgo.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href={riesgo.href}>
                        <Button variant="outline" className="w-full border-2 hover:bg-white/80">
                          Ver Información Completa
                        </Button>
                      </Link>
                      <Link href={riesgo.calculator}>
                        <Button variant="ghost" className="w-full hover:bg-white/50">
                          <Calculator className="mr-2 h-4 w-4" />
                          Usar Calculadora de Riesgo
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Información importante</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-amber-800">
                <p>
                  • La información proporcionada es educativa y orientativa.
                </p>
                <p>
                  • Si tienes factores de riesgo o síntomas, consulta con tu médico.
                </p>
                <p>
                  • Las calculadoras de riesgo son herramientas orientativas, no diagnósticas.
                </p>
                <p>
                  • El seguimiento médico regular es la mejor forma de prevenir complicaciones.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}







