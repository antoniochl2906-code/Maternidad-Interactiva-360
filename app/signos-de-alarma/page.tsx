"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
  AlertTriangle, 
  Phone, 
  ArrowRight, 
  X, 
  Calculator,
  History,
  Ambulance,
  MessageCircle,
  CheckCircle2,
  Info,
  ExternalLink
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";

interface Signo {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  queEs: string;
  porQueOcurre: string;
  queHacerPrimero: string;
  urgent: boolean;
}

interface EvaluacionResult {
  id: number;
  signo: string;
  fecha: string;
  severidad: "leve" | "moderado" | "grave";
  recomendacion: string;
}

const signos: Signo[] = [
  {
    id: 1,
    title: "Sangrado vaginal",
    description: "Cualquier cantidad de sangrado durante el embarazo requiere atención inmediata.",
    icon: "🩸",
    image: "/SA_1.png",
    queEs: "El sangrado vaginal durante el embarazo puede variar desde manchas leves hasta sangrado abundante. Puede ocurrir en cualquier momento del embarazo.",
    porQueOcurre: "Las causas pueden incluir: desprendimiento de placenta, placenta previa, amenaza de aborto, o causas benignas como sangrado de implantación o cambios cervicales. Es importante evaluar la causa específica.",
    queHacerPrimero: "1. Mantén la calma y acuéstate. 2. No uses tampones. 3. Observa la cantidad y color del sangrado. 4. Contacta inmediatamente a tu médico o acude a emergencias. 5. Si el sangrado es abundante o acompañado de dolor, ve directamente a emergencias.",
    urgent: true,
  },
  {
    id: 2,
    title: "Dolor abdominal intenso",
    description: "Dolor constante o cólicos severos que no mejoran con reposo.",
    icon: "😣",
    image: "/SA_2.png",
    queEs: "Dolor abdominal persistente, agudo o cólicos que no se alivian con reposo o cambios de posición. Puede estar localizado o ser generalizado.",
    porQueOcurre: "Puede deberse a: desprendimiento de placenta, trabajo de parto prematuro, problemas digestivos, infecciones urinarias, o causas relacionadas con el embarazo que requieren evaluación médica.",
    queHacerPrimero: "1. Evalúa la intensidad del dolor (escala 1-10). 2. Observa si hay otros síntomas acompañantes (fiebre, sangrado, etc.). 3. Si el dolor es severo (7/10 o más) o persistente, busca atención médica inmediata. 4. No tomes medicamentos sin consultar a tu médico.",
    urgent: true,
  },
  {
    id: 3,
    title: "Dolor de cabeza severo",
    description: "Dolor de cabeza intenso que no cede con analgésicos comunes.",
    icon: "🤕",
    image: "/SA_3.jpg",
    queEs: "Dolor de cabeza intenso y persistente que no responde a analgésicos comunes o que aparece de forma súbita y severa.",
    porQueOcurre: "Puede estar relacionado con preeclampsia, hipertensión gestacional, migrañas, o tensión. Es especialmente preocupante si se acompaña de visión borrosa o hinchazón.",
    queHacerPrimero: "1. Descansa en un lugar tranquilo y oscuro. 2. Hidrátate adecuadamente. 3. Si el dolor es muy intenso o se acompaña de visión borrosa, hinchazón o presión alta, acude inmediatamente a emergencias. 4. No ignores este síntoma si es persistente.",
    urgent: true,
  },
  {
    id: 4,
    title: "Visión borrosa o ver luces",
    description: "Cambios visuales, ver luces o puntos, visión borrosa.",
    icon: "👁️",
    image: "/SA_4.jpg",
    queEs: "Cambios en la visión que incluyen visión borrosa, ver luces o destellos, puntos flotantes, o pérdida parcial de la visión.",
    porQueOcurre: "Estos síntomas pueden ser signos de preeclampsia severa, que es una complicación seria del embarazo relacionada con presión arterial alta. Requiere atención médica inmediata.",
    queHacerPrimero: "1. Este es un signo de ALARMA. 2. Acude inmediatamente a emergencias. 3. No esperes ni intentes manejarlo en casa. 4. Informa a tu médico de inmediato. 5. Puede estar relacionado con preeclampsia que requiere tratamiento urgente.",
    urgent: true,
  },
  {
    id: 5,
    title: "Dificultad para respirar",
    description: "Falta de aire severa o dificultad para respirar en reposo.",
    icon: "😮‍💨",
    image: "/SA_5.jpg",
    queEs: "Dificultad para respirar que ocurre en reposo, sensación de falta de aire, o incapacidad para completar frases sin jadear.",
    porQueOcurre: "Puede deberse a: embolia pulmonar (raro pero grave), asma, neumonía, o en algunos casos, presión del útero sobre el diafragma. La dificultad severa en reposo siempre requiere evaluación.",
    queHacerPrimero: "1. Siéntate en posición erguida. 2. Si la dificultad es severa o empeora, busca atención médica inmediata. 3. Si se acompaña de dolor en el pecho, acude a emergencias de inmediato. 4. No ignores este síntoma.",
    urgent: true,
  },
  {
    id: 6,
    title: "Fiebre alta (>38°C)",
    description: "Fiebre persistente que no baja con medicamentos.",
    icon: "🌡️",
    image: "/SA_6.jpg",
    queEs: "Temperatura corporal elevada por encima de 38°C que persiste o no responde a medicamentos antipiréticos seguros durante el embarazo.",
    porQueOcurre: "La fiebre puede indicar una infección (urinaria, respiratoria, u otra) que requiere tratamiento. Las infecciones durante el embarazo pueden afectar al bebé si no se tratan adecuadamente.",
    queHacerPrimero: "1. Toma la temperatura con un termómetro. 2. Hidrátate bien. 3. Consulta con tu médico sobre medicamentos seguros. 4. Si la fiebre es alta (>38.5°C) o persistente, busca atención médica. 5. Observa otros síntomas acompañantes.",
    urgent: true,
  },
  {
    id: 7,
    title: "Vómitos persistentes",
    description: "Vómitos que no permiten ingerir líquidos o alimentos.",
    icon: "🤢",
    image: "/SA_7.jpg",
    queEs: "Vómitos frecuentes que impiden mantener líquidos o alimentos, llevando a deshidratación y pérdida de peso.",
    porQueOcurre: "Puede ser hiperémesis gravídica (náuseas y vómitos severos del embarazo) o estar relacionado con otras condiciones. La deshidratación puede ser peligrosa.",
    queHacerPrimero: "1. Intenta tomar pequeños sorbos de líquidos claros. 2. Si no puedes retener nada, busca atención médica. 3. La deshidratación puede requerir líquidos intravenosos. 4. No esperes demasiado si los vómitos son persistentes.",
    urgent: true,
  },
  {
    id: 8,
    title: "Pérdida de líquido",
    description: "Pérdida de líquido por la vagina (puede ser rotura de membranas).",
    icon: "💧",
    image: "/SA_8.jpg",
    queEs: "Pérdida de líquido claro por la vagina, que puede ser constante o intermitente. Puede indicar rotura de membranas (bolsa de agua).",
    porQueOcurre: "La rotura prematura de membranas puede ocurrir antes del término del embarazo. Requiere evaluación médica para prevenir infecciones y complicaciones.",
    queHacerPrimero: "1. Observa el color y cantidad del líquido. 2. Si es antes de las 37 semanas, acude inmediatamente a emergencias. 3. No uses tampones ni tengas relaciones sexuales. 4. Contacta a tu médico de inmediato.",
    urgent: true,
  },
  {
    id: 9,
    title: "Disminución de movimientos fetales",
    description: "Notas que tu bebé se mueve mucho menos de lo habitual.",
    icon: "👶",
    image: "/SA_9.jpg",
    queEs: "Notable reducción en la frecuencia o intensidad de los movimientos fetales que normalmente sientes.",
    porQueOcurre: "Puede ser normal (el bebé duerme) o puede indicar problemas con el bienestar fetal. Después de las 28 semanas, los movimientos deben ser regulares.",
    queHacerPrimero: "1. Acuéstate de lado izquierdo. 2. Cuenta los movimientos durante 1-2 horas. 3. Si no sientes al menos 10 movimientos en 2 horas, o si los movimientos han disminuido significativamente, contacta a tu médico. 4. No esperes hasta el próximo control.",
    urgent: true,
  },
  {
    id: 10,
    title: "Hinchazón súbita de cara y manos",
    description: "Hinchazón que aparece rápidamente, especialmente en cara y manos.",
    icon: "👋",
    image: "/SA_10.jpg",
    queEs: "Hinchazón que aparece rápidamente en la cara (especialmente alrededor de los ojos) y en las manos, diferente a la hinchazón leve normal del embarazo.",
    porQueOcurre: "Puede ser un signo de preeclampsia, especialmente si se acompaña de presión arterial alta, proteína en orina, o dolor de cabeza. Requiere evaluación médica urgente.",
    queHacerPrimero: "1. Este síntoma, especialmente si es súbito, requiere atención médica. 2. Si se acompaña de dolor de cabeza, visión borrosa o presión alta, acude a emergencias. 3. No ignores este signo. 4. Contacta a tu médico inmediatamente.",
    urgent: true,
  },
  {
    id: 11,
    title: "Dolor al orinar",
    description: "Dolor intenso al orinar acompañado de fiebre o escalofríos.",
    icon: "🚽",
    image: "/SA_11.jpg",
    queEs: "Dolor, ardor o molestia al orinar, especialmente si se acompaña de fiebre, escalofríos, o necesidad frecuente de orinar.",
    porQueOcurre: "Generalmente indica una infección urinaria, que es común en el embarazo pero requiere tratamiento con antibióticos seguros para evitar complicaciones.",
    queHacerPrimero: "1. Hidrátate bien. 2. Consulta con tu médico para evaluación y tratamiento. 3. Las infecciones urinarias no tratadas pueden causar parto prematuro. 4. No te automediques.",
    urgent: true,
  },
  {
    id: 12,
    title: "Contracciones antes de tiempo",
    description: "Contracciones regulares antes de las 37 semanas.",
    icon: "⏰",
    image: "/SA_12.jpg",
    queEs: "Contracciones regulares, rítmicas y frecuentes antes de las 37 semanas de gestación, que pueden indicar trabajo de parto prematuro.",
    porQueOcurre: "Puede ser trabajo de parto prematuro, que requiere intervención médica para intentar detenerlo o preparar para un parto prematuro controlado.",
    queHacerPrimero: "1. Cronometra las contracciones (frecuencia y duración). 2. Si son regulares (cada 10 minutos o menos) y antes de las 37 semanas, acude inmediatamente a emergencias. 3. No esperes. 4. El tiempo es crucial para prevenir o manejar un parto prematuro.",
    urgent: true,
  },
];

export default function SignosDeAlarmaPage() {
  const [selectedSigno, setSelectedSigno] = useState<Signo | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historial, setHistorial] = useState<EvaluacionResult[]>([]);
  const [calculatorData, setCalculatorData] = useState({
    signo: "",
    intensidad: 5,
    duracion: "",
    acompanantes: [] as string[],
    antecedentes: "",
  });

  useEffect(() => {
    // Cargar historial del localStorage
    const saved = localStorage.getItem("signosAlarmaHistorial");
    if (saved) {
      setHistorial(JSON.parse(saved));
    }
  }, []);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedSigno || showCalculator || showHistory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSigno, showCalculator, showHistory]);

  const calcularSeveridad = () => {
    let score = 0;
    
    // Intensidad (1-10)
    score += calculatorData.intensidad;
    
    // Duración
    if (calculatorData.duracion === "horas") score += 3;
    if (calculatorData.duracion === "dias") score += 5;
    
    // Acompañantes
    score += calculatorData.acompanantes.length * 2;
    
    // Antecedentes
    if (calculatorData.antecedentes === "si") score += 3;
    
    let severidad: "leve" | "moderado" | "grave" = "leve";
    let recomendacion = "";
    
    if (score <= 8) {
      severidad = "leve";
      recomendacion = "El síntoma parece ser leve. Monitorea tu condición y consulta con tu médico en el próximo control. Si empeora, busca atención médica.";
    } else if (score <= 15) {
      severidad = "moderado";
      recomendacion = "El síntoma requiere atención médica. Contacta a tu médico hoy o acude a un centro de salud. No esperes hasta el próximo control.";
    } else {
      severidad = "grave";
      recomendacion = "URGENTE: Este síntoma requiere atención médica inmediata. Acude a emergencias de inmediato o llama a una ambulancia. No esperes.";
    }
    
    const resultado: EvaluacionResult = {
      id: Date.now(),
      signo: calculatorData.signo,
      fecha: new Date().toLocaleString("es-ES"),
      severidad,
      recomendacion,
    };
    
    const nuevoHistorial = [resultado, ...historial];
    setHistorial(nuevoHistorial);
    localStorage.setItem("signosAlarmaHistorial", JSON.stringify(nuevoHistorial));
    
    return { severidad, recomendacion };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
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
              <div className="p-4 rounded-full bg-red-100 shadow-lg">
                <AlertTriangle className="h-16 w-16 text-red-600" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Signos de Alarma
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Si experimentas alguno de estos signos, busca atención médica inmediata
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Imagen de Signos de Alarma */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/SIGNOS DE ALARMA.jpg"
              title="Signos de Alarma"
              description="Reconoce los signos que requieren atención médica inmediata"
            />
          </div>
        </ScrollReveal>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/contacto">
              <Button size="lg" variant="destructive" className="text-lg px-8 py-6 animate-pulse">
                <Phone className="mr-2 h-5 w-5" />
                NECESITO ATENCIÓN AHORA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={() => setShowCalculator(true)}
              className="text-lg px-8 py-6 bg-gradient-to-r from-orange-500 to-red-500"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculadora de Severidad
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="text-lg px-8 py-6"
            >
              <History className="mr-2 h-5 w-5" />
              Ver Historial
            </Button>
          </motion.div>
        </div>

        {/* Signos Cards - Grid con imágenes profesionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {signos.map((signo, index) => (
            <ScrollReveal key={signo.id} delay={index * 0.05}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="h-full group"
              >
                <Card className="h-full overflow-hidden bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out rounded-2xl">
                  {/* Imagen */}
                  <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-red-100 to-orange-100">
                    <img
                      src={signo.image}
                      alt={signo.title}
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 relative z-10"
                      loading="lazy"
                      decoding="async"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        const placeholder = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'none';
                        }
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.parentElement?.querySelector('.fallback-placeholder') as HTMLElement;
                        if (placeholder) {
                          placeholder.style.display = 'flex';
                          const icon = placeholder.querySelector('span');
                          if (icon) {
                            icon.classList.remove('opacity-30');
                            icon.classList.add('opacity-100');
                          }
                        }
                      }}
                    />
                    {/* Fallback mientras carga o si falla */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100 fallback-placeholder pointer-events-none z-0">
                      <span className="text-6xl opacity-30">{signo.icon}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-20" />
                  </div>

                  {/* Contenido */}
                  <CardHeader className="p-5">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 text-center">
                      {signo.title}
                    </CardTitle>
                    {signo.description && (
                      <CardDescription className="text-sm text-muted-foreground text-center leading-relaxed">
                        {signo.description}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        className="flex-1 rounded-full"
                        onClick={() => {
                          setSelectedSigno(signo);
                          document.body.style.overflow = 'hidden';
                        }}
                      >
                        Ver más
                      </Button>
                      <Link href="/contacto">
                        <Button variant="outline" className="flex-1 rounded-full">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Modal de Detalle del Signo */}
        <AnimatePresence>
          {selectedSigno && (
            <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelectedSigno(null);
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
                {/* Botón de Cerrar */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedSigno(null);
                    document.body.style.overflow = 'unset';
                  }}
                  className="absolute top-4 right-4 bg-white/95 hover:bg-white shadow-lg z-10 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
                </Button>

                {/* Header con imagen */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-red-100 to-orange-100 overflow-hidden flex-shrink-0 rounded-t-xl">
                  <img
                    src={selectedSigno.image}
                    alt={selectedSigno.title}
                    className="w-full h-full object-cover"
                    style={{ display: 'block' }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{selectedSigno.icon}</span>
                      <h2 className="text-3xl md:text-4xl font-bold">{selectedSigno.title}</h2>
                    </div>
                  </div>
                </div>
                
                {/* Contenido scrolleable */}
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      ¿Qué es?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedSigno.queEs}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-secondary flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      ¿Por qué ocurre?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedSigno.porQueOcurre}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-red-600 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      ¿Qué hacer primero?
                    </h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{selectedSigno.queHacerPrimero}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <Link href="/contacto">
                      <Button variant="destructive" className="w-full" size="lg">
                        <Ambulance className="mr-2 h-5 w-5" />
                        Buscar Atención
                      </Button>
                    </Link>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full" size="lg">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp Directo
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal Calculadora de Severidad */}
        <AnimatePresence>
          {showCalculator && (
            <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCalculator(false)}
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
              />
              
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white rounded-xl shadow-xl w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto z-50"
              >
                <Card className="shadow-2xl bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-primary" />
                        Calculadora de Severidad
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowCalculator(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Signo de Alarma</Label>
                      <select
                        value={calculatorData.signo}
                        onChange={(e) => setCalculatorData({ ...calculatorData, signo: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md mt-2"
                      >
                        <option value="">Selecciona un signo</option>
                        {signos.map((s) => (
                          <option key={s.id} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Intensidad (1-10): {calculatorData.intensidad}</Label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={calculatorData.intensidad}
                        onChange={(e) => setCalculatorData({ ...calculatorData, intensidad: parseInt(e.target.value) })}
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <Label>Duración</Label>
                      <select
                        value={calculatorData.duracion}
                        onChange={(e) => setCalculatorData({ ...calculatorData, duracion: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md mt-2"
                      >
                        <option value="">Selecciona</option>
                        <option value="minutos">Minutos</option>
                        <option value="horas">Horas</option>
                        <option value="dias">Días</option>
                      </select>
                    </div>
                    <div>
                      <Label>Síntomas acompañantes</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {["Fiebre", "Dolor", "Sangrado", "Náuseas", "Mareos"].map((sintoma) => (
                          <label key={sintoma} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={calculatorData.acompanantes.includes(sintoma)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCalculatorData({
                                    ...calculatorData,
                                    acompanantes: [...calculatorData.acompanantes, sintoma],
                                  });
                                } else {
                                  setCalculatorData({
                                    ...calculatorData,
                                    acompanantes: calculatorData.acompanantes.filter((a) => a !== sintoma),
                                  });
                                }
                              }}
                            />
                            {sintoma}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label>¿Tienes antecedentes de este problema?</Label>
                      <select
                        value={calculatorData.antecedentes}
                        onChange={(e) => setCalculatorData({ ...calculatorData, antecedentes: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md mt-2"
                      >
                        <option value="">Selecciona</option>
                        <option value="no">No</option>
                        <option value="si">Sí</option>
                      </select>
                    </div>
                    <Button
                      onClick={() => {
                        const resultado = calcularSeveridad();
                        alert(`Severidad: ${resultado.severidad.toUpperCase()}\n\n${resultado.recomendacion}`);
                        setShowCalculator(false);
                        setCalculatorData({
                          signo: "",
                          intensidad: 5,
                          duracion: "",
                          acompanantes: [],
                          antecedentes: "",
                        });
                      }}
                      className="w-full bg-gradient-to-r from-primary to-secondary"
                      size="lg"
                    >
                      Calcular Severidad
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal Historial */}
        <AnimatePresence>
          {showHistory && (
            <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowHistory(false)}
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
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <History className="w-6 h-6 text-primary" />
                        Historial de Evaluaciones
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowHistory(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {historial.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">
                        No hay evaluaciones guardadas aún.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {historial.map((item) => (
                          <Card
                            key={item.id}
                            className={`border-2 ${
                              item.severidad === "grave"
                                ? "border-red-500 bg-red-50"
                                : item.severidad === "moderado"
                                ? "border-orange-500 bg-orange-50"
                                : "border-green-500 bg-green-50"
                            }`}
                          >
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-bold">{item.signo}</h4>
                                  <p className="text-sm text-muted-foreground">{item.fecha}</p>
                                </div>
                                <span
                                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                                    item.severidad === "grave"
                                      ? "bg-red-500 text-white"
                                      : item.severidad === "moderado"
                                      ? "bg-orange-500 text-white"
                                      : "bg-green-500 text-white"
                                  }`}
                                >
                                  {item.severidad.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">{item.recomendacion}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
