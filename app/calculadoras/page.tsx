"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ImageCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Calculator, 
  Calendar, 
  Scale, 
  AlertTriangle, 
  Heart, 
  Droplet,
  Baby
} from "lucide-react";

export default function CalculadorasPage() {
  const calculators = [
    {
      icon: Calendar,
      title: "Semanas de Gestación",
      description: "Calcula las semanas de gestación usando FUM o fecha de ecografía",
      href: "/calculadoras/semanas-gestacion",
      color: "text-primary",
    },
    {
      icon: Scale,
      title: "Aumento de Peso por Mes",
      description: "Calcula el aumento de peso recomendado según tu IMC inicial",
      href: "/calculadoras/aumento-peso",
      color: "text-secondary",
    },
    {
      icon: AlertTriangle,
      title: "Riesgo de Preeclampsia",
      description: "Evaluación orientativa de factores de riesgo de preeclampsia",
      href: "/calculadoras/riesgo-preeclampsia",
      color: "text-destructive",
    },
    {
      icon: Heart,
      title: "Riesgo de Hipertensión Gestacional",
      description: "Clasificador de riesgo de hipertensión en el embarazo",
      href: "/calculadoras/riesgo-hipertension",
      color: "text-primary",
    },
    {
      icon: Droplet,
      title: "Riesgo de Diabetes Gestacional",
      description: "Test de riesgo básico para diabetes gestacional",
      href: "/calculadoras/riesgo-diabetes",
      color: "text-secondary",
    },
    {
      icon: Baby,
      title: "Riesgo de Parto Prematuro",
      description: "Evaluación de factores de riesgo de parto prematuro",
      href: "/calculadoras/riesgo-parto-prematuro",
      color: "text-primary",
    },
    {
      icon: AlertTriangle,
      title: "Riesgo de Hemorragia",
      description: "Evaluación de factores de riesgo de hemorragia en el embarazo",
      href: "/calculadoras/riesgo-hemorragia",
      color: "text-destructive",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Calculadoras Interactivas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas para calcular semanas de gestación, evaluar riesgos y monitorear tu embarazo
          </p>
        </motion.div>

        {/* Imagen de Calculadoras */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/CALCULADORAS.jpg"
              title="Calculadoras Interactivas"
              description="Herramientas para calcular y evaluar tu embarazo"
            />
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-2">
                    Importante:
                  </p>
                  <p className="text-sm text-amber-800">
                    Estas calculadoras son herramientas orientativas y educativas. 
                    <strong> NO reemplazan la consulta médica.</strong> Siempre consulta 
                    con tu médico para diagnóstico y tratamiento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link href={calc.href}>
                  <Card className="h-full hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                      <div className={`mb-4 ${calc.color}`}>
                        <Icon className="h-10 w-10" />
                      </div>
                      <CardTitle>{calc.title}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full">
                        Usar Calculadora →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}







