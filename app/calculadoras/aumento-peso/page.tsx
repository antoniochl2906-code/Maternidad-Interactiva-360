"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scale, Info } from "lucide-react";

export default function AumentoPesoPage() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    recommendedGain: string;
    monthlyGain: string;
  } | null>(null);

  const calculate = () => {
    if (!weight || !height) return;
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert to meters
    const bmi = weightNum / (heightNum * heightNum);

    let category: string;
    let recommendedGain: string;
    let monthlyGain: string;

    if (bmi < 18.5) {
      category = "Bajo peso";
      recommendedGain = "12-18 kg";
      monthlyGain = "1.0-1.5 kg/mes";
    } else if (bmi < 25) {
      category = "Peso normal";
      recommendedGain = "11-16 kg";
      monthlyGain = "0.9-1.3 kg/mes";
    } else if (bmi < 30) {
      category = "Sobrepeso";
      recommendedGain = "7-11 kg";
      monthlyGain = "0.6-0.9 kg/mes";
    } else {
      category = "Obesidad";
      recommendedGain = "5-9 kg";
      monthlyGain = "0.4-0.7 kg/mes";
    }

    setResult({ bmi, category, recommendedGain, monthlyGain });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Calculadora de Aumento de Peso
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcula el aumento de peso recomendado según tu IMC inicial
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-2">
                <Scale className="h-6 w-6 text-primary" />
                <CardTitle>Ingresa tus datos</CardTitle>
              </div>
              <CardDescription>
                Peso y talla al inicio del embarazo (antes de quedar embarazada)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weight">Peso inicial (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ej: 65"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="height">Talla (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Ej: 165"
                  className="mt-2"
                />
              </div>
              <Button onClick={calculate} className="w-full">
                Calcular
              </Button>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 space-y-4"
                >
                  <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Resultado</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tu IMC inicial</p>
                        <p className="text-3xl font-bold text-primary">{result.bmi.toFixed(1)}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Categoría: {result.category}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            Aumento de peso recomendado (total):
                          </p>
                          <p className="text-2xl font-bold text-primary">
                            {result.recommendedGain}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground mb-1">
                            Aumento mensual recomendado:
                          </p>
                          <p className="text-xl font-bold text-secondary">
                            {result.monthlyGain}
                          </p>
                        </div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800">
                          <strong>Recomendación:</strong> Monitorea tu peso en cada control 
                          prenatal. El aumento de peso debe ser gradual y constante.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Card className="bg-secondary/10 border-secondary/30">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-secondary" />
                <CardTitle>Información importante</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• El aumento de peso varía según el trimestre (más lento al inicio, más rápido al final).</p>
                <p>• Si tienes dudas sobre tu aumento de peso, consulta con tu médico.</p>
                <p>• Un aumento excesivo o insuficiente puede requerir ajustes en la dieta.</p>
                <p>• Estas son recomendaciones generales. Tu médico puede ajustarlas según tu caso.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}








