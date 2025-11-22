"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Phone } from "lucide-react";

export default function HTAEmbarazoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Hipertensión del Embarazo (HTA)
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre hipertensión gestacional y crónica durante el embarazo
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>¿Qué es la hipertensión en el embarazo?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                La hipertensión en el embarazo puede ser de dos tipos:
              </p>
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Hipertensión Gestacional:</h3>
                  <p className="text-sm text-muted-foreground">
                    Presión arterial alta que aparece después de las 20 semanas de gestación 
                    sin proteinuria. Generalmente se resuelve después del parto.
                  </p>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Hipertensión Crónica:</h3>
                  <p className="text-sm text-muted-foreground">
                    Presión arterial alta que existía antes del embarazo o que aparece antes 
                    de las 20 semanas. Requiere manejo continuo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle>Factores de riesgo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Edad avanzada (≥35 años)</li>
                <li>Obesidad (IMC ≥ 30)</li>
                <li>Historia familiar de hipertensión</li>
                <li>Primer embarazo</li>
                <li>Embarazo múltiple</li>
                <li>Diabetes</li>
                <li>Enfermedad renal</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Signos iniciales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-orange-800">
                <p>• Presión arterial ≥ 140/90 mmHg</p>
                <p>• Dolor de cabeza</p>
                <p>• Hinchazón de extremidades</p>
                <p>• Visión borrosa</p>
                <p>• Dolor en el abdomen superior</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

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
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>• Monitorea tu presión arterial regularmente</p>
                <p>• Asiste a todos tus controles prenatales</p>
                <p>• Sigue las indicaciones de tu médico</p>
                <p>• Mantén una dieta baja en sodio</p>
                <p>• Descansa adecuadamente</p>
                <p>• Si la presión está muy alta, busca atención inmediata</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Link href="/calculadoras/riesgo-hipertension">
            <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <CardTitle>Calculadora de Riesgo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
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









