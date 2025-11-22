"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Calculator, Info, History, Trash2 } from "lucide-react";
import { differenceInWeeks, differenceInDays, format } from "date-fns";
import { saveCalculatorResult, getCalculatorHistoryByType, CalculatorResult } from "@/lib/calculatorStorage";

export default function SemanasGestacionPage() {
  const [fum, setFum] = useState("");
  const [ecoDate, setEcoDate] = useState("");
  const [ecoWeeks, setEcoWeeks] = useState("");
  const [result, setResult] = useState<{
    weeks: number;
    days: number;
    method: string;
  } | null>(null);
  const [history, setHistory] = useState<CalculatorResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setHistory(getCalculatorHistoryByType("Semanas de Gestación"));
  }, []);

  const calculateByFUM = () => {
    if (!fum) return;
    const fumDate = new Date(fum);
    const today = new Date();
    const weeks = differenceInWeeks(today, fumDate);
    const days = differenceInDays(today, fumDate) % 7;
    const resultData = { weeks, days, method: "FUM" };
    setResult(resultData);
    
    // Guardar en localStorage
    const now = new Date();
    saveCalculatorResult({
      fecha: format(now, "yyyy-MM-dd HH:mm"),
      resultado: `${weeks} semanas${days > 0 ? ` y ${days} días` : ""} (Método: FUM)`,
      tipo: "Semanas de Gestación",
      detalles: { weeks, days, method: "FUM", fum }
    });
    
    // Actualizar historial
    setHistory(getCalculatorHistoryByType("Semanas de Gestación"));
  };

  const calculateByEco = () => {
    if (!ecoDate || !ecoWeeks) return;
    const ecoDateObj = new Date(ecoDate);
    const ecoWeeksNum = parseInt(ecoWeeks);
    const today = new Date();
    const daysSinceEco = differenceInDays(today, ecoDateObj);
    const weeksSinceEco = Math.floor(daysSinceEco / 7);
    const totalWeeks = ecoWeeksNum + weeksSinceEco;
    const totalDays = daysSinceEco % 7;
    const resultData = { weeks: totalWeeks, days: totalDays, method: "Ecografía" };
    setResult(resultData);
    
    // Guardar en localStorage
    const now = new Date();
    saveCalculatorResult({
      fecha: format(now, "yyyy-MM-dd HH:mm"),
      resultado: `${totalWeeks} semanas${totalDays > 0 ? ` y ${totalDays} días` : ""} (Método: Ecografía)`,
      tipo: "Semanas de Gestación",
      detalles: { weeks: totalWeeks, days: totalDays, method: "Ecografía", ecoDate, ecoWeeks: ecoWeeksNum }
    });
    
    // Actualizar historial
    setHistory(getCalculatorHistoryByType("Semanas de Gestación"));
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
            Calculadora de Semanas de Gestación
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calcula las semanas de gestación usando FUM o fecha de ecografía
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Calculator className="h-6 w-6 text-primary" />
                  <CardTitle>Selecciona el método de cálculo</CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2"
                >
                  <History className="h-4 w-4" />
                  Historial ({history.length})
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="fum" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fum">Método FUM</TabsTrigger>
                  <TabsTrigger value="eco">Método Ecografía</TabsTrigger>
                </TabsList>

                <TabsContent value="fum" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="fum">Fecha de Última Menstruación (FUM)</Label>
                    <Input
                      id="fum"
                      type="date"
                      value={fum}
                      onChange={(e) => setFum(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={calculateByFUM} className="w-full">
                    Calcular por FUM
                  </Button>
                </TabsContent>

                <TabsContent value="eco" className="space-y-4 mt-6">
                  <div>
                    <Label htmlFor="ecoDate">Fecha de la ecografía</Label>
                    <Input
                      id="ecoDate"
                      type="date"
                      value={ecoDate}
                      onChange={(e) => setEcoDate(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ecoWeeks">Semanas de gestación en la ecografía</Label>
                    <Input
                      id="ecoWeeks"
                      type="number"
                      min="0"
                      max="42"
                      value={ecoWeeks}
                      onChange={(e) => setEcoWeeks(e.target.value)}
                      placeholder="Ej: 12"
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={calculateByEco} className="w-full">
                    Calcular por Ecografía
                  </Button>
                </TabsContent>
              </Tabs>

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6"
                >
                  <Card className="bg-primary/10 border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-primary">Resultado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Método utilizado: {result.method}
                          </p>
                          <div className="text-5xl font-bold text-primary mb-2">
                            {result.weeks}
                          </div>
                          <p className="text-lg text-muted-foreground">
                            semanas {result.days > 0 && `y ${result.days} días`}
                          </p>
                        </div>
                        <div className="bg-white rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">
                            Tu bebé está creciendo y desarrollándose. Continúa con tus 
                            controles prenatales regulares.
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            ✓ Resultado guardado en tu historial
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {showHistory && history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <Card className="bg-secondary/10 border-secondary/30">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-secondary flex items-center gap-2">
                          <History className="h-5 w-5" />
                          Historial de Cálculos
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowHistory(false)}
                        >
                          Cerrar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {history.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-lg p-3 border border-secondary/20"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-semibold">{item.resultado}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.fecha}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
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
                <p>• El cálculo por FUM es el método estándar si conoces tu FUM con certeza.</p>
                <p>• El cálculo por ecografía es más preciso si tu FUM es incierta.</p>
                <p>• Tu médico puede ajustar la edad gestacional según las ecografías.</p>
                <p>• Esta calculadora es orientativa. Consulta con tu médico para confirmación.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

