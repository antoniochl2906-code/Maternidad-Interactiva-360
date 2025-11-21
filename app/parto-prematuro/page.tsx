"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Phone } from "lucide-react";

export default function PartoPrematuroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Parto Prematuro
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre parto antes de las 37 semanas de gestación
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
              <CardTitle>¿Qué es el parto prematuro?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                El parto prematuro es el nacimiento que ocurre antes de las 37 semanas 
                completas de gestación. Los bebés prematuros pueden necesitar cuidados 
                especiales después del nacimiento.
              </p>
              <div className="bg-primary/10 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Clasificación:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Extremadamente prematuro:</strong> Antes de las 28 semanas</li>
                  <li><strong>Muy prematuro:</strong> 28-32 semanas</li>
                  <li><strong>Prematuro moderado:</strong> 32-34 semanas</li>
                  <li><strong>Prematuro tardío:</strong> 34-37 semanas</li>
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
                <li>Parto prematuro previo</li>
                <li>Embarazo múltiple</li>
                <li>Infecciones (urinarias, vaginales)</li>
                <li>Hemorragia durante el embarazo</li>
                <li>Preeclampsia</li>
                <li>Rotura prematura de membranas</li>
                <li>Cuello uterino corto o incompetente</li>
                <li>Fumar o consumir drogas</li>
                <li>Estrés extremo</li>
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
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Signos de parto prematuro</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-purple-800">
                <p>• Contracciones regulares antes de las 37 semanas</p>
                <p>• Dolor de espalda baja constante</p>
                <p>• Presión en la pelvis</p>
                <p>• Calambres abdominales</p>
                <p>• Cambios en el flujo vaginal</p>
                <p>• Rotura de membranas (pérdida de líquido)</p>
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
                <p>• Si tienes factores de riesgo, informa a tu médico</p>
                <p>• Asiste a todos tus controles prenatales</p>
                <p>• Si tienes signos de parto prematuro, busca atención inmediata</p>
                <p>• No ignores las contracciones regulares antes de tiempo</p>
                <p>• Si rompes fuente, acude inmediatamente al hospital</p>
                <p>• Sigue las recomendaciones de tu médico sobre actividad física</p>
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
          <Link href="/calculadoras/riesgo-parto-prematuro">
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








