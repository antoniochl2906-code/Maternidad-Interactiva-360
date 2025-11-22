"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  ArrowLeft,
  Sparkles,
  Info,
  Image as ImageIcon
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

interface EcografiaDetail {
  id: number;
  week: string;
  weekRange: string;
  title: string;
  shortDescription: string;
  images: string[];
  icon: typeof Baby;
  color: string;
  details: {
    queSeVe: string[];
    queSeEvalua: string[];
    importancia: string;
  };
  extendedInfo: string;
  desarrolloFetal: string;
  consejosMama: string[];
  evaluacionDetallada: {
    titulo: string;
    descripcion: string;
  }[];
}

const ecografiasDetalle: EcografiaDetail[] = [
  {
    id: 1,
    week: "6-8",
    weekRange: "Semana 6-8",
    title: "Ecografía de Confirmación",
    shortDescription: "Confirma presencia del embarazo, localización intrauterina y latido cardíaco",
    images: [
      "/ecografias/confirmacion-1.jpg",
      "/ecografias/confirmacion-2.jpg",
      "/ecografias/confirmacion-3.jpg"
    ],
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
    extendedInfo: "La ecografía de confirmación es la primera ventana al desarrollo de tu bebé. Permite verificar que el embarazo se está desarrollando correctamente dentro del útero, descartando embarazos ectópicos. El latido cardíaco, visible desde la semana 6, es uno de los signos más importantes de viabilidad fetal.",
    desarrolloFetal: "En esta etapa, el embrión mide aproximadamente 5-8 mm. El corazón comienza a latir y se pueden observar las estructuras básicas. El saco gestacional es visible y el embrión muestra actividad cardíaca temprana, un signo muy positivo de desarrollo saludable.",
    consejosMama: [
      "Es normal sentir ansiedad antes de esta primera ecografía",
      "El latido cardíaco es un excelente signo de viabilidad",
      "Si el médico no puede ver el latido aún, puede ser muy temprano",
      "Mantén la calma y sigue las recomendaciones de tu médico"
    ],
    evaluacionDetallada: [
      {
        titulo: "Saco Gestacional",
        descripcion: "Se evalúa su tamaño, forma y localización. Debe estar dentro del útero."
      },
      {
        titulo: "Actividad Cardíaca",
        descripcion: "El latido cardíaco fetal es visible desde la semana 6 y es un signo crucial de viabilidad."
      },
      {
        titulo: "Medición de la Edad Gestacional",
        descripcion: "Se mide la longitud cráneo-caudal (LCC) para determinar con precisión la edad gestacional."
      }
    ]
  },
  {
    id: 2,
    week: "11-14",
    weekRange: "Semana 11-14",
    title: "Ecografía del Primer Trimestre (Translucencia Nucal)",
    shortDescription: "Mide translucencia nucal, evalúa desarrollo fetal y riesgo cromosómico",
    images: [
      "/ecografias/translucencia-1.jpg",
      "/ecografias/translucencia-2.jpg",
      "/ecografias/translucencia-3.jpg",
    ],
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
    extendedInfo: "La ecografía de translucencia nucal es parte del tamizaje del primer trimestre. Evalúa el espacio de líquido en la parte posterior del cuello del bebé, que puede indicar riesgo de anomalías cromosómicas. Es un momento emocionante porque puedes ver el perfil completo de tu bebé por primera vez.",
    desarrolloFetal: "El bebé mide aproximadamente 4-8 cm. Ya tiene forma humana reconocible, con cabeza, tronco y extremidades. Los órganos principales están formándose y el bebé puede realizar movimientos espontáneos. El perfil facial es visible y el hueso nasal puede evaluarse.",
    consejosMama: [
      "Esta ecografía puede generar ansiedad, pero recuerda que es un tamizaje, no un diagnóstico",
      "La mayoría de los resultados son normales",
      "Si hay algún hallazgo, tu médico te explicará las opciones",
      "Disfruta ver el perfil de tu bebé por primera vez"
    ],
    evaluacionDetallada: [
      {
        titulo: "Translucencia Nucal",
        descripcion: "Medición del espacio de líquido en la nuca del bebé. Valores normales: < 3mm."
      },
      {
        titulo: "Hueso Nasal",
        descripcion: "Presencia y tamaño del hueso nasal. Su ausencia puede indicar mayor riesgo."
      },
      {
        titulo: "Flujo del Ducto Venoso",
        descripcion: "Evaluación del flujo sanguíneo que puede indicar problemas cardíacos tempranos."
      }
    ]
  },
  {
    id: 3,
    week: "18-22",
    weekRange: "Semana 18-22",
    title: "Ecografía Morfológica",
    shortDescription: "Evaluación anatómica completa - La MÁS importante del embarazo",
    images: [
      "/ecografias/morfologica-1.jpg",
      "/ecografias/morfologica-2.jpg",
      "/ecografias/morfologica-3.jpg",
    ],
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
    extendedInfo: "La ecografía morfológica es un examen exhaustivo que evalúa cada parte del cuerpo del bebé. El médico revisa sistemáticamente el cerebro, cara, corazón, pulmones, estómago, riñones, columna vertebral y extremidades. Es una oportunidad única para asegurar que todo se está desarrollando correctamente y, si hay alguna preocupación, planificar el seguimiento adecuado.",
    desarrolloFetal: "El bebé mide aproximadamente 20-25 cm y pesa alrededor de 300-500 gramos. Todos los órganos están formados y funcionando. El bebé puede chuparse el dedo, hacer muecas y moverse activamente. Los rasgos faciales son claramente visibles y puedes ver si tiene el sexo masculino o femenino.",
    consejosMama: [
      "Esta es la ecografía más detallada, puede durar 30-45 minutos",
      "Es normal sentir nervios, pero la mayoría de los hallazgos son normales",
      "Puedes conocer el sexo del bebé si lo deseas",
      "Trae a tu pareja o un acompañante para compartir este momento especial"
    ],
    evaluacionDetallada: [
      {
        titulo: "Cerebro y Cráneo",
        descripcion: "Se evalúa la estructura cerebral, los ventrículos y la integridad del cráneo."
      },
      {
        titulo: "Cara y Perfil",
        descripcion: "Revisión de labios, paladar, nariz, ojos y perfil facial completo."
      },
      {
        titulo: "Corazón",
        descripcion: "Evaluación de las 4 cámaras cardíacas, válvulas y grandes vasos."
      },
      {
        titulo: "Abdomen",
        descripcion: "Revisión de estómago, intestinos, hígado, riñones y vejiga."
      },
      {
        titulo: "Columna Vertebral",
        descripcion: "Evaluación completa de la columna para detectar espina bífida u otras anomalías."
      },
      {
        titulo: "Extremidades",
        descripcion: "Conteo de dedos de manos y pies, evaluación de brazos y piernas."
      }
    ]
  },
  {
    id: 4,
    week: "28-32",
    weekRange: "Semana 28-32",
    title: "Ecografía de Crecimiento",
    shortDescription: "Evalúa crecimiento fetal, movimientos, líquido amniótico y bienestar",
    images: [
      "/ecografias/crecimiento-1.jpg",
      "/ecografias/crecimiento-2.jpg",
      "/ecografias/crecimiento-3.jpg",
    ],
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
    extendedInfo: "En el tercer trimestre, el crecimiento del bebé es crucial. Esta ecografía mide la cabeza, abdomen y fémur para estimar el peso y compararlo con las curvas normales. También evalúa el flujo sanguíneo a través del cordón umbilical y la placenta, asegurando que el bebé reciba los nutrientes necesarios.",
    desarrolloFetal: "El bebé mide aproximadamente 35-40 cm y pesa entre 1,000-1,800 gramos. Está ganando peso rápidamente y desarrollando grasa subcutánea. Los órganos están madurando, especialmente los pulmones. El bebé puede abrir y cerrar los ojos y responde a estímulos externos.",
    consejosMama: [
      "El crecimiento del bebé es muy importante en esta etapa",
      "Si hay alguna preocupación sobre el tamaño, tu médico te explicará",
      "Los movimientos del bebé son más notorios ahora",
      "Esta ecografía ayuda a planificar el parto"
    ],
    evaluacionDetallada: [
      {
        titulo: "Mediciones Fetales",
        descripcion: "Circunferencia cefálica (CC), circunferencia abdominal (CA) y longitud del fémur (LF) para estimar peso."
      },
      {
        titulo: "Doppler Umbilical",
        descripcion: "Evalúa el flujo sanguíneo del cordón umbilical para asegurar que el bebé recibe nutrientes adecuados."
      },
      {
        titulo: "Líquido Amniótico",
        descripcion: "Se mide el índice de líquido amniótico (ILA) para detectar oligohidramnios o polihidramnios."
      },
      {
        titulo: "Placenta",
        descripcion: "Se evalúa la ubicación, grosor y grado de madurez de la placenta."
      }
    ]
  },
  {
    id: 5,
    week: "36-38",
    weekRange: "Semana 36-38",
    title: "Ecografía Final",
    shortDescription: "Evalúa posición fetal, peso estimado y preparación para el parto",
    images: [
      "/ecografias/final-1.jpg",
      "/ecografias/final-2.jpg",
      "/ecografias/final-3.jpg",
    ],
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
    extendedInfo: "La ecografía final es el último chequeo antes de conocer a tu bebé. Confirma que está en posición cefálica (cabeza abajo), ideal para un parto vaginal. El peso estimado ayuda a tu médico a planificar el parto y estar preparado para cualquier eventualidad. Es un momento emocionante porque estás muy cerca de conocer a tu bebé.",
    desarrolloFetal: "El bebé está casi listo para nacer. Mide aproximadamente 45-50 cm y pesa entre 2,500-3,500 gramos (o más). Todos los órganos están completamente desarrollados y funcionando. El bebé está ganando peso final y preparándose para la vida fuera del útero.",
    consejosMama: [
      "Estás muy cerca del final de tu embarazo",
      "La posición del bebé es importante para el parto",
      "El peso estimado puede variar, no te preocupes si es aproximado",
      "Prepárate emocionalmente para el parto"
    ],
    evaluacionDetallada: [
      {
        titulo: "Presentación Fetal",
        descripcion: "Se confirma si el bebé está en posición cefálica (cabeza abajo), podálica (pies abajo) o transversa."
      },
      {
        titulo: "Peso Estimado",
        descripcion: "Cálculo del peso fetal basado en mediciones. Puede variar ±10-15% del peso real."
      },
      {
        titulo: "Engagement",
        descripcion: "Evaluación de si la cabeza del bebé está encajada en la pelvis materna."
      },
      {
        titulo: "Placenta Previa",
        descripcion: "Confirmación de que la placenta no está bloqueando el cuello uterino."
      }
    ]
  }
];

export default function EcografiaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const id = parseInt(params.id as string);
  const ecografia = ecografiasDetalle.find(e => e.id === id);

  if (!ecografia) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p>Ecografía no encontrada</p>
            <Button onClick={() => router.push("/ecografias")} className="mt-4">
              Volver a Ecografías
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const Icon = ecografia.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="container mx-auto px-4 relative z-10">
          <Button
            variant="ghost"
            onClick={() => router.push("/ecografias")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Ecografías
          </Button>
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-4"
              >
                <div className={cn("p-4 rounded-full bg-gradient-to-br", ecografia.color, "backdrop-blur-sm shadow-lg")}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                {ecografia.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {ecografia.weekRange} - {ecografia.shortDescription}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Galería de Imágenes */}
        <ScrollReveal delay={0.1}>
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-primary" />
                Galería de Imágenes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ecografia.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className="relative cursor-pointer overflow-hidden rounded-lg"
                  >
                    <img
                      src={image}
                      alt={`Ecografía ${ecografia.title} ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Información Detallada */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Desarrollo Fetal */}
          <ScrollReveal delay={0.2}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="w-6 h-6 text-primary" />
                  Desarrollo Fetal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {ecografia.desarrolloFetal}
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Consejos para la Mamá */}
          <ScrollReveal delay={0.3}>
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-secondary" />
                  Consejos para la Mamá
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {ecografia.consejosMama.map((consejo, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{consejo}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Evaluación Detallada */}
        <ScrollReveal delay={0.4}>
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                ¿Qué se Evalúa en Detalle?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ecografia.evaluacionDetallada.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20"
                  >
                    <h4 className="font-semibold text-primary mb-2">{item.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Información Extendida */}
        <ScrollReveal delay={0.5}>
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle>Información Completa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {ecografia.extendedInfo}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    ¿Qué se ve?
                  </h4>
                  <ul className="space-y-2">
                    {ecografia.details.queSeVe.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-secondary flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    ¿Qué se evalúa?
                  </h4>
                  <ul className="space-y-2">
                    {ecografia.details.queSeEvalua.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-secondary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-lg">¿Por qué es importante?</h4>
                <p className="text-muted-foreground">{ecografia.details.importancia}</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Modal de Imagen Ampliada */}
      <AnimatePresence>
        {selectedImage !== null && (
          <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-4xl max-h-[90vh] overflow-y-auto z-50"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/95 hover:bg-white shadow-lg z-10 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </Button>
              <img
                src={ecografia.images[selectedImage]}
                alt={`Ecografía ampliada ${selectedImage + 1}`}
                className="w-full h-auto rounded-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

