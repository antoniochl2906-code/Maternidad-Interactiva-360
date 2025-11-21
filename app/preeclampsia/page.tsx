"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Phone } from "lucide-react";

export default function PreeclampsiaPage() {
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
            Preeclampsia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre preeclampsia: factores de riesgo, signos y qué hacer
          </p>
        </motion.div>

        {/* What is it */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>¿Qué es la preeclampsia?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                La preeclampsia es una complicación del embarazo caracterizada por presión 
                arterial alta (≥140/90 mmHg) y presencia de proteínas en la orina (proteinuria) 
                después de las 20 semanas de gestación. Puede afectar tanto a la madre como al bebé.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Criterios diagnósticos:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Presión arterial ≥ 140/90 mmHg en dos ocasiones separadas</li>
                  <li>Proteinuria ≥ 300 mg en orina de 24 horas o ≥ 1+ en tira reactiva</li>
                  <li>Después de las 20 semanas de gestación</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Factors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Factores de riesgo</CardTitle>
              <CardDescription>
                Factores que aumentan la probabilidad de desarrollar preeclampsia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2 text-red-600">Factores de riesgo mayores:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Preeclampsia en embarazo anterior</li>
                    <li>Hipertensión crónica</li>
                    <li>Diabetes pregestacional</li>
                    <li>Enfermedad renal</li>
                    <li>Embarazo múltiple</li>
                    <li>Enfermedades autoinmunes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-orange-600">Factores de riesgo menores:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Primer embarazo</li>
                    <li>Edad ≥ 35 años</li>
                    <li>Obesidad (IMC ≥ 30)</li>
                    <li>Historia familiar de preeclampsia</li>
                    <li>Intervalo largo entre embarazos (&gt;10 años)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Signs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Signos iniciales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-red-800">
                <p>• Presión arterial elevada</p>
                <p>• Hinchazón de cara y manos (edema)</p>
                <p>• Dolor de cabeza persistente</p>
                <p>• Visión borrosa o ver luces</p>
                <p>• Dolor en la parte superior del abdomen</p>
                <p>• Náuseas o vómitos</p>
                <p>• Disminución en la cantidad de orina</p>
                <p>• Aumento de peso súbito</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* What to do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>¿Qué hacer?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Si tienes factores de riesgo:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Asiste a todos tus controles prenatales</li>
                    <li>Monitorea tu presión arterial regularmente</li>
                    <li>Informa a tu médico sobre tu historia clínica</li>
                    <li>Considera tomar aspirina en dosis baja (si tu médico lo indica)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Si presentas signos:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Busca atención médica inmediata</li>
                    <li>No esperes al próximo control</li>
                    <li>Acude a emergencias si los síntomas son severos</li>
                    <li>Sigue las indicaciones de tu médico</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link href="/calculadoras/riesgo-preeclampsia">
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <CardTitle>Calculadora de Riesgo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Evalúa tus factores de riesgo de preeclampsia
                </p>
                <Button className="w-full">
                  Usar Calculadora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/contacto">
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-red-600" />
                  <CardTitle className="text-red-900">Ir a Emergencias</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-800 mb-4">
                  Si tienes signos de preeclampsia, busca atención inmediata
                </p>
                <Button variant="destructive" className="w-full">
                  Ver Información de Contacto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}


