"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Download, Trash2, RefreshCw, FileText, Search } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

interface FeedbackData {
  id: string;
  name?: string;
  email?: string;
  rating: number;
  comment: string;
  page: string;
  date: string;
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<FeedbackData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // En producción, verificar autenticación real
    // Por ahora, solo permitir acceso en desarrollo
    if (typeof window !== "undefined") {
      const isDev = process.env.NODE_ENV === "development";
      const adminKey = localStorage.getItem("mi360_admin_key");
      setIsAdmin(isDev || adminKey === "dev-admin-2025"); // Simple auth para desarrollo
    }
    loadFeedbacks();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, searchTerm, filterRating]);

  const loadFeedbacks = () => {
    try {
      const stored = localStorage.getItem("mi360_feedback");
      if (stored) {
        const data: FeedbackData[] = JSON.parse(stored);
        // Ordenar por fecha más reciente primero
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setFeedbacks(sorted);
        setFilteredFeedbacks(sorted);
      }
    } catch (error) {
      console.error("Error al cargar feedbacks:", error);
    }
  };

  const filterFeedbacks = () => {
    let filtered = [...feedbacks];

    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.page.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRating !== null) {
      filtered = filtered.filter((f) => f.rating === filterRating);
    }

    setFilteredFeedbacks(filtered);
  };

  const deleteFeedback = (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este feedback?")) return;

    const updated = feedbacks.filter((f) => f.id !== id);
    setFeedbacks(updated);
    localStorage.setItem("mi360_feedback", JSON.stringify(updated));
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredFeedbacks, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `feedback-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ["Fecha", "Calificación", "Nombre", "Email", "Página", "Comentario"];
    const rows = filteredFeedbacks.map((f) => [
      new Date(f.date).toLocaleString("es-ES"),
      f.rating.toString(),
      f.name || "",
      f.email || "",
      f.page,
      `"${f.comment.replace(/"/g, '""')}"`, // Escapar comillas para CSV
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const dataBlob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" }); // BOM para UTF-8
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `feedback-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearAllFeedback = () => {
    if (
      !confirm(
        "¿Estás seguro de eliminar TODOS los feedbacks? Esta acción no se puede deshacer."
      )
    )
      return;

    setFeedbacks([]);
    setFilteredFeedbacks([]);
    localStorage.removeItem("mi360_feedback");
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white/90 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Acceso Restringido</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>Esta página solo está disponible para administradores.</p>
            <p className="text-sm mt-4">
              En desarrollo: establece{" "}
              <code className="bg-muted px-2 py-1 rounded">mi360_admin_key</code>{" "}
              en localStorage para acceder.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const averageRating =
    feedbacks.length > 0
      ? (
          feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
        ).toFixed(2)
      : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Administración de Feedbacks
              </h1>
              <p className="text-lg text-muted-foreground">
                Revisa y gestiona todas las evaluaciones recibidas
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{feedbacks.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Feedbacks</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{averageRating}</p>
                  <p className="text-sm text-muted-foreground mt-1">Calificación Promedio</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {feedbacks.filter((f) => f.rating >= 4).length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Feedbacks Positivos (4+)</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{filteredFeedbacks.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Mostrando</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Filters and Actions */}
        <ScrollReveal delay={0.15}>
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Filtros y Acciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por comentario, nombre, email o página..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div>
                  <select
                    value={filterRating?.toString() || ""}
                    onChange={(e) =>
                      setFilterRating(e.target.value ? parseInt(e.target.value) : null)
                    }
                    className="w-full px-3 py-2 border rounded-md bg-white"
                  >
                    <option value="">Todas las calificaciones</option>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating.toString()}>
                        {rating} {rating === 1 ? "estrella" : "estrellas"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button onClick={loadFeedbacks} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualizar
                </Button>
                <Button onClick={exportToJSON} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar JSON
                </Button>
                <Button onClick={exportToCSV} variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Exportar CSV
                </Button>
                {feedbacks.length > 0 && (
                  <Button onClick={clearAllFeedback} variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar Todos
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Feedbacks List */}
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">
                  {feedbacks.length === 0
                    ? "No hay feedbacks guardados aún."
                    : "No se encontraron feedbacks con los filtros seleccionados."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedbacks.map((feedback, index) => (
              <ScrollReveal key={feedback.id} delay={index * 0.05}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < feedback.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 font-semibold text-lg">
                                {feedback.rating}/5
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteFeedback(feedback.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          {feedback.comment && (
                            <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                              {feedback.comment}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            {feedback.name && (
                              <span>
                                <strong>Nombre:</strong> {feedback.name}
                              </span>
                            )}
                            {feedback.email && (
                              <span>
                                <strong>Email:</strong> {feedback.email}
                              </span>
                            )}
                            <span>
                              <strong>Página:</strong> {feedback.page}
                            </span>
                            <span>
                              <strong>Fecha:</strong>{" "}
                              {new Date(feedback.date).toLocaleString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

