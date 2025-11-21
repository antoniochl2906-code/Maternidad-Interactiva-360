"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageCard from "@/components/ImageCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/Timeline";
import { Calendar, Calculator, Info } from "lucide-react";
import { differenceInWeeks, addWeeks, format } from "date-fns";
import ScrollReveal from "@/components/ScrollReveal";

export default function ControlesPrenatalesPage() {
  const [fum, setFum] = useState("");
  const [calculatedWeeks, setCalculatedWeeks] = useState<number | null>(null);
  const [nextControls, setNextControls] = useState<Date[]>([]);

  const calculateControls = () => {
    if (!fum) return;
    
    const fumDate = new Date(fum);
    const today = new Date();
    const weeks = differenceInWeeks(today, fumDate);
    
    setCalculatedWeeks(weeks);
    
    // Calcular próximos controles (cada 4 semanas hasta la 28, luego cada 2 semanas hasta la 36, luego semanal)
    const controls: Date[] = [];
    let currentWeek = weeks;
    
    if (currentWeek < 28) {
      // Cada 4 semanas
      for (let i = Math.ceil(currentWeek / 4) * 4; i <= 28; i += 4) {
        if (i > currentWeek) {
          controls.push(addWeeks(fumDate, i));
        }
      }
    }
    
    if (currentWeek < 36) {
      // Cada 2 semanas de 28 a 36
      for (let i = 30; i <= 36; i += 2) {
        if (i > currentWeek) {
          controls.push(addWeeks(fumDate, i));
        }
      }
    }
    
    // Semanal de 36 en adelante
    for (let i = 37; i <= 40; i++) {
      if (i > currentWeek) {
        controls.push(addWeeks(fumDate, i));
      }
    }
    
    setNextControls(controls.slice(0, 5)); // Mostrar próximos 5 controles
  };

  const timelineItems = [
    {
      week: "Semana 0-12",
      title: "Primer Trimestre",
      description: "Control inicial. Confirmación de embarazo, evaluación de riesgo, exámenes básicos.",
    },
    {
      week: "Semana 12-28",
      title: "Segundo Trimestre",
      description: "Controles cada 4 semanas. Ecografías, laboratorios de segundo trimestre, evaluación de crecimiento.",
    },
    {
      week: "Semana 28-36",
      title: "Tercer Trimestre (Inicio)",
      description: "Controles cada 2 semanas. Monitoreo más frecuente, evaluación de posición fetal.",
    },
    {
      week: "Semana 36-40",
      title: "Tercer Trimestre (Final)",
      description: "Controles semanales. Preparación para el parto, monitoreo cercano.",
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
            Controles Prenatales
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre cuántos controles necesitas y cuándo realizarlos
          </p>
        </motion.div>

        {/* Imagen de Controles Prenatales */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/CONTROLES PRENATALES.jpg"
              title="Controles Prenatales"
              description="Seguimiento médico regular para tu salud y la de tu bebé"
            />
          </div>
        </ScrollReveal>

        {/* What are prenatal controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Info className="h-6 w-6 text-primary" />
                <CardTitle>¿Qué son los controles prenatales?</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Los controles prenatales son visitas médicas programadas durante el embarazo 
                para monitorear tu salud y la de tu bebé. Permiten detectar tempranamente 
                cualquier complicación y asegurar un embarazo saludable.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Objetivos principales:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Monitorear el crecimiento y desarrollo del bebé</li>
                  <li>Detectar y prevenir complicaciones</li>
                  <li>Evaluar tu salud general</li>
                  <li>Proporcionar educación y orientación</li>
                  <li>Prepararte para el parto y puerperio</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* How many controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>¿Cuántos controles necesitas?</CardTitle>
              <CardDescription>
                Según las recomendaciones, se requieren aproximadamente 8-12 controles durante el embarazo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1-3</div>
                  <div className="text-sm text-muted-foreground">Primer Trimestre</div>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">4-6</div>
                  <div className="text-sm text-muted-foreground">Segundo Trimestre</div>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">6-8</div>
                  <div className="text-sm text-muted-foreground">Tercer Trimestre</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Calculadora de Controles</CardTitle>
              </div>
              <CardDescription>
                Ingresa tu FUM (Fecha de Última Menstruación) para calcular tus próximos controles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fum">Fecha de Última Menstruación (FUM)</Label>
                <Input
                  id="fum"
                  type="date"
                  value={fum}
                  onChange={(e) => setFum(e.target.value)}
                  className="mt-2"
                />
              </div>
              <Button onClick={calculateControls} className="w-full">
                Calcular Controles
              </Button>

              {calculatedWeeks !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 space-y-4"
                >
                  <div className="bg-primary/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Semanas de gestación actuales</p>
                    <p className="text-2xl font-bold text-primary">{calculatedWeeks} semanas</p>
                  </div>

                  {nextControls.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Próximos controles recomendados:</h3>
                      <div className="space-y-2">
                        {nextControls.map((date, index) => {
                          const week = differenceInWeeks(date, new Date(fum));
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-card border rounded-lg p-3"
                            >
                              <div>
                                <p className="font-medium">Control {index + 1}</p>
                                <p className="text-sm text-muted-foreground">
                                  Semana {week} de gestación
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-primary">
                                  {format(date, "dd/MM/yyyy")}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Controles por Trimestre</CardTitle>
              <CardDescription>
                Línea de tiempo de los controles prenatales durante el embarazo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline items={timelineItems} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

