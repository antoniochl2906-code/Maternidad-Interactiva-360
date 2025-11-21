"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Calculator, Phone } from "lucide-react";

export default function HemorragiaEmbarazoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Hemorragia en el Embarazo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Información sobre sangrado durante el embarazo
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
              <CardTitle>¿Qué es la hemorragia en el embarazo?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Cualquier sangrado vaginal durante el embarazo debe ser evaluado por un 
                médico. Puede ocurrir en diferentes momentos y tener diferentes causas.
              </p>
              <div className="space-y-4">
                <div className="bg-primary/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Primer trimestre:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Aborto espontáneo</li>
                    <li>Embarazo ectópico</li>
                    <li>Embarazo molar</li>
                    <li>Hemorragia de implantación (normal, leve)</li>
                  </ul>
                </div>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Segundo y tercer trimestre:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Placenta previa</li>
                    <li>Desprendimiento de placenta</li>
                    <li>Rotura uterina (raro)</li>
                    <li>Vasa previa (raro)</li>
                  </ul>
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
                <li>Historia de hemorragia en embarazo anterior</li>
                <li>Placenta previa</li>
                <li>Desprendimiento de placenta previo</li>
                <li>Trauma abdominal</li>
                <li>Embarazo múltiple</li>
                <li>Hipertensión</li>
                <li>Fumar</li>
                <li>Uso de cocaína</li>
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
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-900 flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Signos de alarma</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-red-800">
                <p>• Cualquier cantidad de sangrado vaginal</p>
                <p>• Sangrado acompañado de dolor abdominal</p>
                <p>• Sangrado abundante</p>
                <p>• Sangrado con coágulos grandes</p>
                <p>• Sangrado con mareo o desmayo</p>
                <p>• Sangrado después de un trauma</p>
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
                <p><strong>IMPORTANTE:</strong> Cualquier sangrado durante el embarazo requiere atención médica inmediata.</p>
                <p>• No esperes, acude a emergencias de inmediato</p>
                <p>• Si el sangrado es abundante, llama una ambulancia</p>
                <p>• Mantén la calma y acuéstate</p>
                <p>• No uses tampones</p>
                <p>• Lleva tu tarjeta prenatal si es posible</p>
                <p>• Informa a tu médico sobre el sangrado</p>
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
          <Link href="/calculadoras/riesgo-hemorragia">
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








