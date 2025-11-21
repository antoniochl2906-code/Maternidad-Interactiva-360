"use client";

import { motion } from "framer-motion";
import ImageCard from "@/components/ImageCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Scale, 
  Ruler, 
  Activity, 
  TestTube, 
  MessageCircle,
  Stethoscope
} from "lucide-react";

export default function QueSeHaceEnCadaControlPage() {
  const controlProcedures = [
    {
      title: "Presión Arterial (PA)",
      icon: Heart,
      description: "Se mide en cada control para detectar hipertensión gestacional o preeclampsia.",
      normal: "< 140/90 mmHg",
      importance: "Detecta preeclampsia tempranamente",
    },
    {
      title: "Peso",
      icon: Scale,
      description: "Se registra en cada visita para monitorear el aumento de peso adecuado.",
      normal: "Según IMC inicial",
      importance: "Aumento excesivo o insuficiente puede indicar problemas",
    },
    {
      title: "Altura Uterina (AU)",
      icon: Ruler,
      description: "Se mide desde la sínfisis del pubis hasta el fondo uterino.",
      normal: "Aproximadamente igual a las semanas de gestación (cm)",
      importance: "Evalúa el crecimiento fetal",
    },
    {
      title: "Movimientos Fetales",
      icon: Activity,
      description: "Se pregunta sobre la percepción de movimientos del bebé.",
      normal: "10 movimientos en 2 horas",
      importance: "Indica bienestar fetal",
    },
  ];

  const trimesters = [
    {
      trimester: "Primer Trimestre (0-12 semanas)",
      controls: [
        {
          week: "Primera consulta",
          procedures: [
            "Confirmación de embarazo",
            "Historia clínica completa",
            "Examen físico general",
            "PA, peso, talla",
            "Laboratorios básicos (hemograma, grupo sanguíneo, VDRL, VIH, etc.)",
            "Ecografía de confirmación",
          ],
          labs: [
            "Hemograma completo",
            "Grupo sanguíneo y factor Rh",
            "VDRL/RPR",
            "VIH",
            "Hepatitis B",
            "Glicemia en ayunas",
            "Orina completa",
            "TSH",
          ],
        },
      ],
    },
    {
      trimester: "Segundo Trimestre (13-28 semanas)",
      controls: [
        {
          week: "Cada 4 semanas",
          procedures: [
            "PA, peso, AU",
            "Evaluación de movimientos fetales",
            "Ecografía morfológica (18-22 semanas)",
            "Tamizaje de diabetes gestacional (24-28 semanas)",
          ],
          labs: [
            "Hemograma (16-20 semanas)",
            "Tamizaje de diabetes gestacional (24-28 semanas)",
            "Orina (si hay síntomas)",
          ],
        },
      ],
    },
    {
      trimester: "Tercer Trimestre (29-40 semanas)",
      controls: [
        {
          week: "Cada 2 semanas (28-36)",
          procedures: [
            "PA, peso, AU",
            "Evaluación de movimientos fetales",
            "Posición fetal",
            "Ecografía de crecimiento (32-34 semanas)",
          ],
          labs: [
            "Hemograma (28-32 semanas)",
            "VDRL (32 semanas)",
            "Cultivo vaginal (35-37 semanas)",
          ],
        },
        {
          week: "Semanal (36-40)",
          procedures: [
            "PA, peso, AU",
            "Evaluación de movimientos fetales",
            "Posición fetal",
            "Evaluación de cuello uterino (si es necesario)",
            "Preparación para el parto",
          ],
          labs: [
            "Según necesidad clínica",
          ],
        },
      ],
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
            ¿Qué se hace en cada control prenatal?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información detallada sobre los procedimientos y evaluaciones en cada visita
          </p>
        </motion.div>

        {/* Imagen de Qué se hace en cada control */}
        <ScrollReveal delay={0.1}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/QUE SE HACE EN CADA CONTROL.jpg"
              title="Procedimientos en cada control"
              description="Conoce qué evaluaciones y exámenes se realizan en cada visita"
            />
          </div>
        </ScrollReveal>

        {/* Main Procedures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Procedimientos en cada control</CardTitle>
              <CardDescription>
                Estos son los procedimientos básicos que se realizan en cada visita prenatal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {controlProcedures.map((procedure, index) => {
                  const Icon = procedure.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{procedure.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {procedure.description}
                          </p>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">
                              Valores normales:
                            </p>
                            <p className="text-sm font-medium">{procedure.normal}</p>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-3">
                            <p className="text-xs font-semibold text-primary mb-1">
                              Importancia:
                            </p>
                            <p className="text-sm">{procedure.importance}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* By Trimester */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Controles por trimestre</CardTitle>
              <CardDescription>
                Detalle de procedimientos y laboratorios según el trimestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="trimestre1" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trimestre1">1er Trimestre</TabsTrigger>
                  <TabsTrigger value="trimestre2">2do Trimestre</TabsTrigger>
                  <TabsTrigger value="trimestre3">3er Trimestre</TabsTrigger>
                </TabsList>

                {trimesters.map((trimesterData, trimesterIndex) => (
                  <TabsContent
                    key={trimesterIndex}
                    value={`trimestre${trimesterIndex + 1}`}
                    className="mt-6"
                  >
                    <div className="space-y-6">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <h3 className="text-xl font-bold text-primary mb-2">
                          {trimesterData.trimester}
                        </h3>
                      </div>

                      {trimesterData.controls.map((control, controlIndex) => (
                        <Card key={controlIndex} className="border-2">
                          <CardHeader>
                            <div className="flex items-center space-x-2">
                              <Stethoscope className="h-5 w-5 text-primary" />
                              <CardTitle className="text-lg">{control.week}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                                <Activity className="h-4 w-4 text-secondary" />
                                <span>Procedimientos:</span>
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                                {control.procedures.map((proc, idx) => (
                                  <li key={idx}>{proc}</li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2 flex items-center space-x-2">
                                <TestTube className="h-4 w-4 text-primary" />
                                <span>Laboratorios del mes:</span>
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-6">
                                {control.labs.map((lab, idx) => (
                                  <li key={idx}>{lab}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Maternal Advice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-secondary/10 border-secondary/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-secondary" />
                <CardTitle>Consejos maternos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  • Lleva un registro de tus controles y preguntas para tu médico.
                </p>
                <p>
                  • No dudes en preguntar sobre cualquier síntoma o preocupación.
                </p>
                <p>
                  • Mantén una alimentación balanceada y actividad física moderada.
                </p>
                <p>
                  • Asiste a todos los controles programados, son importantes para tu salud y la de tu bebé.
                </p>
                <p>
                  • Si notas algún signo de alarma, no esperes al próximo control, busca atención inmediata.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}







