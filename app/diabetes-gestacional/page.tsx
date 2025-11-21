"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Phone } from "lucide-react";

export default function DiabetesGestacionalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Diabetes Gestacional
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre diabetes que se desarrolla durante el embarazo
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
              <CardTitle>¿Qué es la diabetes gestacional?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                La diabetes gestacional es un tipo de diabetes que se desarrolla durante el 
                embarazo, generalmente en el segundo o tercer trimestre. Ocurre cuando el 
                cuerpo no puede producir suficiente insulina para manejar los niveles de 
                glucosa durante el embarazo.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Características:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Aparece durante el embarazo</li>
                  <li>Generalmente se resuelve después del parto</li>
                  <li>Requiere monitoreo y tratamiento</li>
                  <li>Puede afectar al bebé si no se controla</li>
                </ul>
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
                <li>Obesidad (IMC ≥ 30)</li>
                <li>Historia familiar de diabetes</li>
                <li>Diabetes gestacional en embarazo anterior</li>
                <li>Edad ≥ 35 años</li>
                <li>Historia de bebé grande (&gt;4 kg) en embarazo anterior</li>
                <li>Síndrome de ovario poliquístico</li>
                <li>Origen étnico (hispano, afroamericano, asiático)</li>
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
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Signos iniciales</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• Aumento excesivo de sed</p>
                <p>• Aumento de la frecuencia urinaria</p>
                <p>• Fatiga</p>
                <p>• Visión borrosa</p>
                <p>• Muchas veces no hay síntomas evidentes</p>
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
                <p>• Realiza el tamizaje de diabetes gestacional entre las 24-28 semanas</p>
                <p>• Si tienes factores de riesgo, el tamizaje puede ser más temprano</p>
                <p>• Si se diagnostica, sigue el plan de tratamiento de tu médico</p>
                <p>• Monitorea tu glucosa según las indicaciones</p>
                <p>• Mantén una dieta balanceada y actividad física moderada</p>
                <p>• Asiste a todos tus controles</p>
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
          <Link href="/calculadoras/riesgo-diabetes">
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


