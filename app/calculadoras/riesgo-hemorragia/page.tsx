"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, Phone } from "lucide-react";
import Link from "next/link";

export default function RiesgoHemorragiaPage() {
  const [factors, setFactors] = useState({
    previousBleeding: false,
    placentaPrevia: false,
    previousAbruption: false,
    trauma: false,
    multiplePregnancy: false,
    hypertension: false,
    smoking: false,
  });

  const calculateRisk = () => {
    const factorCount = Object.values(factors).filter(Boolean).length;

    if (factorCount >= 3) {
      return {
        level: "Alto",
        color: "bg-red-50 border-red-300 text-red-900",
        description: "Tienes múltiples factores de riesgo. Requieres seguimiento médico muy cercano.",
        recommendation: "Consulta con tu médico sobre medidas preventivas y monitoreo especial. Evita actividades de riesgo.",
      };
    } else if (factorCount >= 2) {
      return {
        level: "Moderado",
        color: "bg-orange-50 border-orange-300 text-orange-900",
        description: "Tienes algunos factores de riesgo. Mantén un seguimiento regular.",
        recommendation: "Asiste a todos tus controles prenatales y reporta cualquier sangrado inmediatamente.",
      };
    } else if (factorCount >= 1) {
      return {
        level: "Bajo-Moderado",
        color: "bg-yellow-50 border-yellow-300 text-yellow-900",
        description: "Tienes un factor de riesgo. Continúa con tu seguimiento regular.",
        recommendation: "Mantén tus controles prenatales y reporta cualquier sangrado.",
      };
    } else {
      return {
        level: "Bajo",
        color: "bg-green-50 border-green-300 text-green-900",
        description: "No tienes factores de riesgo identificados.",
        recommendation: "Continúa con tu seguimiento prenatal regular.",
      };
    }
  };

  const risk = calculateRisk();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Calculadora de Riesgo de Hemorragia
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evaluación orientativa de factores de riesgo (NO es un diagnóstico)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Factores de riesgo</CardTitle>
              <CardDescription>
                Marca los factores que aplican a tu caso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { key: "previousBleeding", label: "Historia de hemorragia en embarazo anterior" },
                  { key: "placentaPrevia", label: "Placenta previa" },
                  { key: "previousAbruption", label: "Desprendimiento de placenta previo" },
                  { key: "trauma", label: "Trauma abdominal" },
                  { key: "multiplePregnancy", label: "Embarazo múltiple" },
                  { key: "hypertension", label: "Hipertensión" },
                  { key: "smoking", label: "Fumar" },
                ].map((factor) => (
                  <label key={factor.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={factors[factor.key as keyof typeof factors]}
                      onChange={(e) =>
                        setFactors({ ...factors, [factor.key]: e.target.checked })
                      }
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-sm">{factor.label}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <Card className={risk.color}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Nivel de riesgo: {risk.level}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{risk.description}</p>
              <div className="bg-white/50 rounded-lg p-4">
                <p className="font-semibold mb-2">Recomendación:</p>
                <p className="text-sm">{risk.recommendation}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-red-900 mb-2">
                    IMPORTANTE:
                  </p>
                  <p className="text-sm text-red-800">
                    Cualquier sangrado durante el embarazo requiere atención médica inmediata. 
                    No esperes, acude a emergencias de inmediato.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Link href="/contacto">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-900">
                        ¿Cuándo acudir al hospital?
                      </p>
                      <p className="text-sm text-red-800">
                        Si tienes sangrado vaginal, busca atención inmediata
                      </p>
                    </div>
                  </div>
                  <Button variant="destructive">Ver Información</Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}








