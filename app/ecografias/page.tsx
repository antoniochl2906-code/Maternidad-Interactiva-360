"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Baby, 
  Heart, 
  Eye, 
  TrendingUp, 
  CheckCircle2, 
  Calendar,
  X,
  Stethoscope,
  Activity,
  Sparkles,
  Info
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";
import { cn } from "@/lib/utils";

interface Ecografia {
  id: number;
  week: string;
  weekRange: string;
  title: string;
  shortDescription: string;
  image: string;
  icon: typeof Baby;
  color: string;
  details: {
    queSeVe: string[];
    queSeEvalua: string[];
    importancia: string;
  };
  extendedInfo: string;
}

const ecografias: Ecografia[] = [
  {
    id: 1,
    week: "6-8",
    weekRange: "Semana 6-8",
    title: "Ecografía de Confirmación",
    shortDescription: "Confirma presencia del embarazo, localización intrauterina y latido cardíaco",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&h=240&fit=crop&q=80",
    icon: Heart,
    color: "from-pink-200 to-rose-200",
    details: {
      queSeVe: [
        "Saco gestacional",
        "Embrión en desarrollo",
        "Latido cardíaco fetal",
        "Localización intrauterina"
      ],
      queSeEvalua: [
        "Presencia del embarazo",
        "Número de embriones",
        "Viabilidad inicial",
        "Edad gestacional temprana"
      ],
      importancia: "Esta primera ecografía es fundamental para confirmar que el embarazo está en el lugar correcto (intrauterino) y que hay actividad cardíaca, lo cual indica que el embarazo es viable."
    },
    extendedInfo: "La ecografía de confirmación es la primera ventana al desarrollo de tu bebé. Permite verificar que el embarazo se está desarrollando correctamente dentro del útero, descartando embarazos ectópicos. El latido cardíaco, visible desde la semana 6, es uno de los signos más importantes de viabilidad fetal."
  },
  {
    id: 2,
    week: "11-14",
    weekRange: "Semana 11-14",
    title: "Ecografía del Primer Trimestre (Translucencia Nucal)",
    shortDescription: "Mide translucencia nucal, evalúa desarrollo fetal y riesgo cromosómico",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=900&h=240&fit=crop&q=80",
    icon: Eye,
    color: "from-purple-200 to-violet-200",
    details: {
      queSeVe: [
        "Translucencia nucal",
        "Hueso nasal",
        "Perfil del bebé",
        "Movimientos fetales"
      ],
      queSeEvalua: [
        "Medición de translucencia nucal",
        "Edad gestacional exacta",
        "Riesgo cromosómico",
        "Desarrollo inicial del bebé"
      ],
      importancia: "Esta ecografía permite detectar tempranamente posibles anomalías cromosómicas como el síndrome de Down. La medición de la translucencia nucal, combinada con análisis de sangre, proporciona una evaluación de riesgo no invasiva."
    },
    extendedInfo: "La ecografía de translucencia nucal es parte del tamizaje del primer trimestre. Evalúa el espacio de líquido en la parte posterior del cuello del bebé, que puede indicar riesgo de anomalías cromosómicas. Es un momento emocionante porque puedes ver el perfil completo de tu bebé por primera vez."
  },
  {
    id: 3,
    week: "18-22",
    weekRange: "Semana 18-22",
    title: "Ecografía Morfológica",
    shortDescription: "Evaluación anatómica completa - La MÁS importante del embarazo",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&h=240&fit=crop&q=80",
    icon: Baby,
    color: "from-blue-200 to-cyan-200",
    details: {
      queSeVe: [
        "Anatomía completa del bebé",
        "Órganos internos",
        "Extremidades y dedos",
        "Rasgos faciales"
      ],
      queSeEvalua: [
        "Estructura del cerebro",
        "Corazón y sus cámaras",
        "Columna vertebral",
        "Órganos abdominales",
        "Extremidades y dedos",
        "Marcadores de anomalías"
      ],
      importancia: "Esta es la ecografía más importante del embarazo. Permite una evaluación detallada de toda la anatomía fetal, detectando posibles malformaciones o anomalías. Es el momento en que puedes ver con mayor claridad a tu bebé y conocer su sexo si lo deseas."
    },
    extendedInfo: "La ecografía morfológica es un examen exhaustivo que evalúa cada parte del cuerpo del bebé. El médico revisa sistemáticamente el cerebro, cara, corazón, pulmones, estómago, riñones, columna vertebral y extremidades. Es una oportunidad única para asegurar que todo se está desarrollando correctamente y, si hay alguna preocupación, planificar el seguimiento adecuado."
  },
  {
    id: 4,
    week: "28-32",
    weekRange: "Semana 28-32",
    title: "Ecografía de Crecimiento",
    shortDescription: "Evalúa crecimiento fetal, movimientos, líquido amniótico y bienestar",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&h=240&fit=crop&q=80",
    icon: TrendingUp,
    color: "from-green-200 to-emerald-200",
    details: {
      queSeVe: [
        "Tamaño y peso estimado",
        "Movimientos fetales",
        "Líquido amniótico",
        "Placenta"
      ],
      queSeEvalua: [
        "Curvas de crecimiento",
        "Bienestar fetal",
        "Cantidad de líquido amniótico",
        "Flujo sanguíneo (Doppler si aplica)",
        "Posición fetal"
      ],
      importancia: "Esta ecografía monitorea el crecimiento adecuado del bebé y evalúa su bienestar. Permite detectar problemas como restricción de crecimiento o exceso de líquido amniótico, que pueden requerir seguimiento especial."
    },
    extendedInfo: "En el tercer trimestre, el crecimiento del bebé es crucial. Esta ecografía mide la cabeza, abdomen y fémur para estimar el peso y compararlo con las curvas normales. También evalúa el flujo sanguíneo a través del cordón umbilical y la placenta, asegurando que el bebé reciba los nutrientes necesarios."
  },
  {
    id: 5,
    week: "36-38",
    weekRange: "Semana 36-38",
    title: "Ecografía Final",
    shortDescription: "Evalúa posición fetal, peso estimado y preparación para el parto",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&h=240&fit=crop&q=80",
    icon: CheckCircle2,
    color: "from-amber-200 to-orange-200",
    details: {
      queSeVe: [
        "Posición del bebé",
        "Tamaño final estimado",
        "Líquido amniótico",
        "Placenta"
      ],
      queSeEvalua: [
        "Presentación fetal (cefálica, podálica)",
        "Peso estimado al nacer",
        "Cantidad de líquido amniótico",
        "Ubicación de la placenta",
        "Preparación para el parto"
      ],
      importancia: "Esta última ecografía antes del parto verifica que el bebé esté en la posición correcta (cabeza abajo) y estima su peso. Esta información es crucial para planificar el tipo de parto y prepararse para el nacimiento."
    },
    extendedInfo: "La ecografía final es el último chequeo antes de conocer a tu bebé. Confirma que está en posición cefálica (cabeza abajo), ideal para un parto vaginal. El peso estimado ayuda a tu médico a planificar el parto y estar preparado para cualquier eventualidad. Es un momento emocionante porque estás muy cerca de conocer a tu bebé."
  }
];

export default function EcografiasPage() {
  const [selectedEcografia, setSelectedEcografia] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "calendar">("cards");

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedEcografia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEcografia]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header con ilustración */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 float-animation">
            <Baby className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10 float-animation" style={{ animationDelay: "2s" }}>
            <Heart className="w-24 h-24 text-secondary" />
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
                  <Stethoscope className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Ecografías del Embarazo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Guía completa sobre las ecografías recomendadas durante tu embarazo
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Imagen de Ecografías */}
        <ScrollReveal delay={0.05}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/ECOGRAFIAS.jpg"
              title="Ecografías del Embarazo"
              description="Guía completa sobre las ecografías recomendadas durante tu embarazo"
            />
          </div>
        </ScrollReveal>
        {/* Toggle de vista */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg bg-white/80 backdrop-blur-sm p-1 shadow-md">
              <button
                onClick={() => setViewMode("cards")}
                className={cn(
                  "px-6 py-2 rounded-md transition-all",
                  viewMode === "cards"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                Vista de Tarjetas
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={cn(
                  "px-6 py-2 rounded-md transition-all",
                  viewMode === "calendar"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                Vista Calendario
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Vista de Tarjetas */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {ecografias.map((eco, index) => (
              <ScrollReveal key={eco.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm">
                    {/* Imagen */}
                    <div className={cn("relative h-48 bg-gradient-to-br", eco.color)}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <eco.icon className="w-24 h-24 text-white/80" />
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                        <span className="text-sm font-bold text-primary">Semana {eco.week}</span>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl mb-2">{eco.title}</CardTitle>
                      <CardDescription className="text-sm">{eco.shortDescription}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">¿Qué se ve?</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {eco.details.queSeVe.slice(0, 2).map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link href={`/ecografias/${eco.id}`}>
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        >
                          Ver más detalles
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Vista Calendario */}
        {viewMode === "calendar" && (
          <div className="space-y-6">
            {ecografias.map((eco, index) => (
              <ScrollReveal key={eco.id} delay={index * 0.1} direction="left">
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden border-l-4 border-l-primary shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row">
                      {/* Semana */}
                      <div className={cn("md:w-32 p-6 bg-gradient-to-br", eco.color, "flex items-center justify-center")}>
                        <div className="text-center">
                          <Calendar className="w-8 h-8 text-white mx-auto mb-2" />
                          <p className="text-white font-bold text-lg">{eco.weekRange}</p>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{eco.title}</h3>
                            <p className="text-muted-foreground">{eco.shortDescription}</p>
                          </div>
                          <eco.icon className="w-12 h-12 text-primary/50 flex-shrink-0 ml-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-semibold mb-2 text-primary">¿Qué se ve?</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {eco.details.queSeVe.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <Activity className="w-3 h-3 text-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-semibold mb-2 text-secondary">¿Qué se evalúa?</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {eco.details.queSeEvalua.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-secondary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-primary/5 rounded-lg p-4 mb-4">
                          <p className="text-sm">
                            <span className="font-semibold text-primary">Importancia: </span>
                            <span className="text-muted-foreground">{eco.details.importancia}</span>
                          </p>
                        </div>

                        <Link href={`/ecografias/${eco.id}`}>
                          <Button
                            variant="outline"
                            className="w-full md:w-auto"
                          >
                            Ver información completa
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Panel de información extendida */}
        <AnimatePresence>
          {selectedEcografia && (
            <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelectedEcografia(null);
                  document.body.style.overflow = 'unset';
                }}
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-3xl max-h-[90vh] overflow-y-auto z-50"
              >
                <Card className="shadow-2xl bg-white">
                    {ecografias
                      .filter((e) => e.id === selectedEcografia)
                      .map((eco) => (
                        <div key={eco.id}>
                          {/* Imagen de ecografía arriba del título */}
                          <div className="relative w-full h-[240px] flex-shrink-0 overflow-hidden rounded-t-xl">
                            <img
                              src={eco.image}
                              alt={eco.title}
                              className="w-full h-full object-cover"
                              style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                              onError={(e) => {
                                // Fallback si la imagen no carga
                                const target = e.target as HTMLImageElement;
                                target.src = `https://via.placeholder.com/900x240/cccccc/ffffff?text=${encodeURIComponent(eco.title)}`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            
                            {/* Botón cerrar */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-4 right-4 bg-white/95 hover:bg-white shadow-lg z-10 rounded-full"
                              onClick={() => {
                                setSelectedEcografia(null);
                                document.body.style.overflow = 'unset';
                              }}
                            >
                              <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                            </Button>
                            
                            {/* Badge de semana */}
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                              <p className="text-sm font-semibold text-primary">{eco.weekRange}</p>
                            </div>
                          </div>

                          {/* Contenido scrolleable con scroll suave */}
                          <div className="p-6 space-y-6 pb-8">
                              <div>
                                <CardTitle className="text-3xl mb-2">{eco.title}</CardTitle>
                                <CardDescription className="text-base">{eco.shortDescription}</CardDescription>
                              </div>

                              <div>
                                <h4 className="font-semibold text-lg mb-3 text-primary">Información detallada</h4>
                                <p className="text-muted-foreground leading-relaxed text-base">{eco.extendedInfo}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-primary/5 rounded-lg p-4">
                                  <h5 className="font-semibold mb-3 text-primary flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    ¿Qué se ve?
                                  </h5>
                                  <ul className="space-y-2 text-sm text-muted-foreground">
                                    {eco.details.queSeVe.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-secondary/5 rounded-lg p-4">
                                  <h5 className="font-semibold mb-3 text-secondary flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    ¿Qué se evalúa?
                                  </h5>
                                  <ul className="space-y-2 text-sm text-muted-foreground">
                                    {eco.details.queSeEvalua.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                                <h5 className="font-semibold mb-2 text-lg">¿Por qué es importante?</h5>
                                <p className="text-muted-foreground leading-relaxed">{eco.details.importancia}</p>
                              </div>
                              
                              {/* Indicador visual de scroll (opcional) */}
                              <div className="text-center pt-4">
                                <p className="text-xs text-muted-foreground">
                                  Desliza hacia arriba para ver más información
                                </p>
                              </div>
                            </div>
                        </div>
                      ))}
                  </Card>
                </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Información adicional */}
        <ScrollReveal delay={0.3}>
          <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Info className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Información importante sobre ecografías</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Las ecografías son seguras cuando se realizan por profesionales capacitados.</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>La ecografía morfológica (18-22 semanas) es la más detallada e importante.</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Ecografías adicionales se recomiendan según necesidades específicas.</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Las ecografías 3D/4D son opcionales y no reemplazan las estándar.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}

