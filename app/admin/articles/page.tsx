"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Upload, 
  FileText, 
  X, 
  Save, 
  Check, 
  AlertCircle,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useRouter } from "next/navigation";

interface Article {
  id: string;
  title: string;
  authors: string;
  year: number;
  type: "Revisión sistemática" | "Artículo original" | "Estudio de caso" | "Meta-análisis" | "Guía clínica";
  abstract: string;
  doi?: string;
  url?: string;
  file: string;
  thumbnail?: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

const ARTICLE_TYPES = [
  "Revisión sistemática",
  "Artículo original",
  "Estudio de caso",
  "Meta-análisis",
  "Guía clínica"
] as const;

const CATEGORIES = [
  "Control Prenatal",
  "Embarazo",
  "Parto",
  "Lactancia",
  "Salud Pública Materno-Infantil"
];

export default function AdminArticlesPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear(),
    type: "Artículo original" as Article["type"],
    abstract: "",
    doi: "",
    url: "",
    file: "",
    thumbnail: "",
    category: "Control Prenatal",
    tags: "",
    featured: false,
  });

  useEffect(() => {
    // Simple auth check for development
    if (typeof window !== "undefined") {
      const isDev = process.env.NODE_ENV === "development";
      const adminKey = localStorage.getItem("mi360_admin_key");
      setIsAdmin(isDev || adminKey === "dev-admin-2025");
      
      if (isDev || adminKey === "dev-admin-2025") {
        loadArticles();
      }
    }
  }, []);

  const loadArticles = async () => {
    try {
      // Try to load from API
      const response = await fetch("/api/articles");
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        throw new Error("API not available");
      }
    } catch (error) {
      console.error("Error loading articles:", error);
      // Fallback: try direct JSON file
      try {
        const fallbackResponse = await fetch("/data/articles.json");
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setArticles(fallbackData);
        }
      } catch (fallbackError) {
        console.error("Error loading fallback articles:", fallbackError);
      }
    }
  };

  const generateSlug = (title: string, authors: string, year: number): string => {
    const authorPart = authors.split(",")[0].toLowerCase().replace(/\s+/g, "-");
    const titlePart = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .substring(0, 30)
      .replace(/^-+|-+$/g, "");
    const typePart = formData.type.toLowerCase().replace(/\s+/g, "-").substring(0, 15);
    return `${authorPart}-${year}-${typePart}`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Generate filename based on form data
      const slug = generateSlug(formData.title || "article", formData.authors || "author", formData.year);
      const filename = `${slug}.pdf`;
      setFormData({ ...formData, file: `/articles/${filename}` });
      
      // In a real implementation, you would upload the file to /public/articles/
      // For now, we just set the path
      alert(`⚠️ IMPORTANTE: Debes subir manualmente el archivo PDF a /public/articles/${filename}\n\nLuego actualiza /data/articles.json con la nueva entrada.`);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const slug = generateSlug(formData.title || "article", formData.authors || "author", formData.year);
      const filename = `${slug}.png`;
      setFormData({ ...formData, thumbnail: `/articles/thumbs/${filename}` });
      
      alert(`⚠️ IMPORTANTE: Debes subir manualmente la imagen a /public/articles/thumbs/${filename}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.authors || !formData.abstract) {
      alert("Por favor completa los campos obligatorios: título, autores y resumen.");
      return;
    }

    setSaving(true);
    setSaved(false);

    try {
      // Generate article ID
      const slug = generateSlug(formData.title, formData.authors, formData.year);
      
      const newArticle: Article = {
        id: slug,
        title: formData.title,
        authors: formData.authors,
        year: formData.year,
        type: formData.type,
        abstract: formData.abstract,
        doi: formData.doi || undefined,
        url: formData.url || undefined,
        file: formData.file || `/articles/${slug}.pdf`,
        thumbnail: formData.thumbnail || undefined,
        category: formData.category,
        tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
        featured: formData.featured,
      };

      // Add to local state
      const updatedArticles = [newArticle, ...articles];
      setArticles(updatedArticles);

      // Try to save via API (if exists)
      try {
        const response = await fetch("/api/articles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newArticle),
        });

        if (response.ok) {
          setSaved(true);
          setTimeout(() => {
            resetForm();
            setSaved(false);
          }, 3000);
        } else {
          throw new Error("API no disponible");
        }
      } catch (apiError) {
        // Fallback: Show instructions for manual update
        const jsonOutput = JSON.stringify(newArticle, null, 2);
        alert(`✅ Artículo creado localmente.\n\n⚠️ SIGUIENTE PASO:\n\n1. Copia este JSON y añádelo al inicio de /data/articles.json:\n\n${jsonOutput}\n\n2. Sube el PDF a /public/articles/${slug}.pdf\n\n3. Si tienes thumbnail, súbelo a /public/articles/thumbs/${slug}.png\n\n4. Commit y push a GitHub (ver README_UPLOAD.md)`);
        
        setSaved(true);
        setTimeout(() => {
          resetForm();
          setSaved(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error al guardar el artículo. Por favor revisa la consola.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      year: new Date().getFullYear(),
      type: "Artículo original",
      abstract: "",
      doi: "",
      url: "",
      file: "",
      thumbnail: "",
      category: "Control Prenatal",
      tags: "",
      featured: false,
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Administración de Artículos
              </h1>
              <p className="text-lg text-muted-foreground">
                Sube y gestiona artículos científicos para Discusión Científica
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Success Message */}
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-green-600" />
            <p className="text-green-800">
              Artículo creado. Por favor sigue las instrucciones para completar la subida.
            </p>
          </motion.div>
        )}

        {/* Info Alert */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">Instrucciones importantes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Los archivos PDF deben subirse manualmente a <code className="bg-blue-100 px-1 rounded">/public/articles/</code></li>
                  <li>Los thumbnails (opcional) deben ir en <code className="bg-blue-100 px-1 rounded">/public/articles/thumbs/</code></li>
                  <li>Después de crear el artículo, actualiza <code className="bg-blue-100 px-1 rounded">/data/articles.json</code></li>
                  <li>Consulta <code className="bg-blue-100 px-1 rounded">/admin/README_UPLOAD.md</code> para más detalles</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <ScrollReveal delay={0.1}>
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Nuevo Artículo Científico</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">
                    Título del Artículo *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Título completo del artículo científico"
                    required
                    className="mt-1"
                  />
                </div>

                {/* Authors and Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="authors">
                      Autores *
                    </Label>
                    <Input
                      id="authors"
                      value={formData.authors}
                      onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                      placeholder="Smith A, et al."
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">
                      Año *
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || new Date().getFullYear() })}
                      min="2000"
                      max={new Date().getFullYear() + 1}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Type and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">
                      Tipo de Estudio *
                    </Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Article["type"] })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-white"
                      required
                    >
                      {ARTICLE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="category">
                      Categoría *
                    </Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full mt-1 px-3 py-2 border rounded-md bg-white"
                      required
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <Label htmlFor="abstract">
                    Resumen / Abstract *
                  </Label>
                  <Textarea
                    id="abstract"
                    value={formData.abstract}
                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    placeholder="Resumen completo del artículo..."
                    required
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                {/* DOI and URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="doi">
                      DOI (opcional)
                    </Label>
                    <Input
                      id="doi"
                      value={formData.doi}
                      onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                      placeholder="10.1016/S2214-109X(25)00001-2"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="url">
                      URL (opcional)
                    </Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Files */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pdf">
                      Archivo PDF *
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="pdf"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      {formData.file && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formData.file}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="thumbnail">
                      Thumbnail (opcional)
                    </Label>
                    <div className="mt-1">
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="cursor-pointer"
                      />
                      {formData.thumbnail && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {formData.thumbnail}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label htmlFor="tags">
                    Tags (separados por comas)
                  </Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="control prenatal, embarazo, guías clínicas"
                    className="mt-1"
                  />
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Destacar en la página principal (Featured)
                  </Label>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                  >
                    {saving ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Guardar Artículo
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={saving}
                  >
                    Limpiar
                  </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  * Campos obligatorios
                </p>
              </form>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Existing Articles */}
        <ScrollReveal delay={0.2}>
          <Card className="mt-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle>Artículos Existentes ({articles.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {articles.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hay artículos guardados aún.
                  </p>
                ) : (
                  articles.map((article) => (
                    <div
                      key={article.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {article.authors} ({article.year}) - {article.type}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/discusion-cientifica?article=${article.id}`)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}

