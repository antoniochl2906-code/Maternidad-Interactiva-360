"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TestTube, 
  AlertCircle, 
  Info, 
  CheckCircle2,
  Microscope,
  Droplet,
  Activity,
  Heart,
  Sparkles,
  Beaker
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";

export default function LaboratoriosPage() {
  const trimestres = [
    {
      trimestre: "Primer Trimestre",
      semanas: "0-12 semanas",
      examenes: [
        {
          nombre: "Hemograma completo",
          para: "Detectar anemia, infecciones",
          normal: "Hemoglobina > 11 g/dL",
          alterado: "Anemia, infección",
        },
        {
          nombre: "Grupo sanguíneo y factor Rh",
          para: "Prevenir incompatibilidad Rh",
          normal: "Según tu tipo",
          alterado: "Incompatibilidad Rh",
        },
        {
          nombre: "VDRL/RPR",
          para: "Detectar sífilis",
          normal: "No reactivo",
          alterado: "Sífilis (requiere tratamiento)",
        },
        {
          nombre: "VIH",
          para: "Detectar VIH",
          normal: "No reactivo",
          alterado: "Requiere manejo especializado",
        },
        {
          nombre: "Hepatitis B",
          para: "Detectar hepatitis B",
          normal: "No reactivo",
          alterado: "Requiere manejo especializado",
        },
        {
          nombre: "Glicemia en ayunas",
          para: "Detectar diabetes pregestacional",
          normal: "< 100 mg/dL",
          alterado: "Diabetes o prediabetes",
        },
        {
          nombre: "Orina completa",
          para: "Detectar infección urinaria, proteinuria",
          normal: "Sin bacterias, sin proteínas",
          alterado: "Infección urinaria, preeclampsia",
        },
        {
          nombre: "TSH",
          para: "Evaluar función tiroidea",
          normal: "0.4-4.0 mUI/L",
          alterado: "Hipotiroidismo o hipertiroidismo",
        },
      ],
    },
    {
      trimestre: "Segundo Trimestre",
      semanas: "13-28 semanas",
      examenes: [
        {
          nombre: "Hemograma (16-20 semanas)",
          para: "Reevaluar anemia",
          normal: "Hemoglobina > 10.5 g/dL",
          alterado: "Anemia",
        },
        {
          nombre: "Tamizaje de diabetes gestacional (24-28 semanas)",
          para: "Detectar diabetes gestacional",
          normal: "Glicemia < 140 mg/dL (1 hora)",
          alterado: "Requiere prueba de tolerancia a glucosa",
        },
        {
          nombre: "Orina (si hay síntomas)",
          para: "Detectar infección urinaria",
          normal: "Sin bacterias",
          alterado: "Infección urinaria",
        },
      ],
    },
    {
      trimestre: "Tercer Trimestre",
      semanas: "29-40 semanas",
      examenes: [
        {
          nombre: "Hemograma (28-32 semanas)",
          para: "Reevaluar anemia",
          normal: "Hemoglobina > 10.5 g/dL",
          alterado: "Anemia",
        },
        {
          nombre: "VDRL (32 semanas)",
          para: "Reevaluar sífilis",
          normal: "No reactivo",
          alterado: "Sífilis (requiere tratamiento)",
        },
        {
          nombre: "Cultivo vaginal (35-37 semanas)",
          para: "Detectar estreptococo grupo B",
          normal: "Negativo",
          alterado: "Requiere antibióticos en el parto",
        },
      ],
    },
  ];

  const getIconForExam = (nombre: string) => {
    const lower = nombre.toLowerCase();
    if (lower.includes("hemograma") || lower.includes("sangre")) return Heart;
    if (lower.includes("orina")) return Droplet;
    if (lower.includes("glicemia") || lower.includes("diabetes")) return Activity;
    if (lower.includes("vdrl") || lower.includes("sífilis")) return AlertCircle;
    if (lower.includes("vih") || lower.includes("hepatitis")) return Beaker;
    if (lower.includes("tsh") || lower.includes("tiroide")) return Activity;
    if (lower.includes("cultivo")) return Microscope;
    return TestTube;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50/50 to-secondary/5 relative overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <TestTube className="w-64 h-64 text-primary" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Microscope className="w-64 h-64 text-secondary" />
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
                <TestTube className="w-16 h-16 text-primary" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Laboratorios del Embarazo
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Información completa sobre los exámenes de laboratorio durante el embarazo
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Imagen de Laboratorios */}
        <ScrollReveal delay={0.15}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/LABORATORIOS.jpg"
              title="Exámenes de Laboratorio"
              description="Información completa sobre los exámenes durante el embarazo"
            />
          </div>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-primary/20 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen ilustrativa */}
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center min-h-[250px]">
                  <motion.div
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <TestTube className="w-32 h-32 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Microscope className="w-24 h-24 text-secondary/30" />
                  </motion.div>
                </div>
                
                {/* Imagen real en lugar de iconos animados */}
                <div className="relative bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex items-center justify-center min-h-[250px]">
                  <div className="relative w-full h-full">
                    <img
                      src="/LABORATORIOS.jpg"
                      alt="Exámenes de laboratorio en embarazo"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <TestTube className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl">¿Qué exámenes se piden?</CardTitle>
                  </div>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
                      Durante el embarazo se realizan diversos exámenes de laboratorio para 
                      monitorear tu salud y la de tu bebé. Estos exámenes se solicitan en 
                      diferentes momentos según el trimestre.
                    </p>
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                      <h3 className="font-semibold mb-3 text-primary flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Objetivos de los laboratorios:
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          Detectar condiciones que puedan afectar tu embarazo
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          Prevenir complicaciones
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          Monitorear tu salud general
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          Preparar para el parto
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </CardHeader>
              </div>
            </Card>
          </motion.div>
        </ScrollReveal>

        {/* Exámenes por trimestre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Exámenes por trimestre</CardTitle>
              <CardDescription>
                Detalle de los laboratorios según el trimestre del embarazo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trimestre1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trimestre1">1er Trimestre</TabsTrigger>
                  <TabsTrigger value="trimestre2">2do Trimestre</TabsTrigger>
                  <TabsTrigger value="trimestre3">3er Trimestre</TabsTrigger>
                </TabsList>

                {trimestres.map((trimestreData, index) => (
                  <TabsContent
                    key={index}
                    value={`trimestre${index + 1}`}
                    className="mt-6"
                  >
                    <div className="space-y-4">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <h3 className="text-lg font-bold text-primary">
                          {trimestreData.trimestre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {trimestreData.semanas}
                        </p>
                      </div>

                      <Accordion type="single" collapsible className="w-full">
                        {trimestreData.examenes.map((examen, examIndex) => {
                          const ExamIcon = getIconForExam(examen.nombre);
                          return (
                            <AccordionItem
                              key={examIndex}
                              value={`item-${index}-${examIndex}`}
                            >
                              <motion.div
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <AccordionTrigger className="text-left hover:bg-primary/5 rounded-lg px-4">
                                  <div className="flex items-center space-x-3">
                                    <motion.div
                                      animate={{
                                        rotate: [0, 10, -10, 0],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                      }}
                                    >
                                      <ExamIcon className="h-6 w-6 text-primary" />
                                    </motion.div>
                                    <span className="font-semibold text-lg">{examen.nombre}</span>
                                  </div>
                                </AccordionTrigger>
                              </motion.div>
                            <AccordionContent>
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4 pl-8 pt-4"
                              >
                                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
                                  <p className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    ¿Para qué sirve?
                                  </p>
                                  <p className="text-sm text-muted-foreground leading-relaxed">{examen.para}</p>
                                </div>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-green-50 border-2 border-green-200 rounded-lg p-4 shadow-sm"
                                >
                                  <p className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Valores normales:
                                  </p>
                                  <p className="text-sm text-green-900 font-medium">{examen.normal}</p>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.02 }}
                                  className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 shadow-sm"
                                >
                                  <p className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Si está alterado:
                                  </p>
                                  <p className="text-sm text-amber-900 font-medium">{examen.alterado}</p>
                                </motion.div>
                              </motion.div>
                            </AccordionContent>
                          </AccordionItem>
                          );
                        })}
                      </Accordion>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Qué hacer si están alterados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-amber-50 border-amber-200">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-amber-900">
                  ¿Qué hacer si los exámenes están alterados?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-amber-800">
                <p>
                  <strong>1. No te alarmes:</strong> Muchas alteraciones tienen tratamiento 
                  efectivo durante el embarazo.
                </p>
                <p>
                  <strong>2. Consulta con tu médico:</strong> Tu médico te explicará qué 
                  significa el resultado y qué pasos seguir.
                </p>
                <p>
                  <strong>3. Sigue las indicaciones:</strong> Es importante seguir el 
                  tratamiento o las recomendaciones médicas.
                </p>
                <p>
                  <strong>4. Monitoreo adicional:</strong> Algunos exámenes alterados 
                  requieren seguimiento más frecuente.
                </p>
                <p>
                  <strong>5. Pregunta:</strong> No dudes en hacer todas las preguntas 
                  necesarias para entender tu situación.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interpretación básica */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-secondary/10 border-secondary/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-secondary" />
                <CardTitle>Interpretación básica</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  • Los valores de referencia pueden variar ligeramente entre laboratorios.
                </p>
                <p>
                  • Algunos exámenes tienen rangos diferentes durante el embarazo.
                </p>
                <p>
                  • Siempre consulta con tu médico para interpretar los resultados.
                </p>
                <p>
                  • No todos los valores ligeramente fuera de rango requieren tratamiento.
                </p>
                <p>
                  • Tu médico considerará tus resultados junto con tu historia clínica.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}







