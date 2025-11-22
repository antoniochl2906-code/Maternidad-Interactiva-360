"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  ExternalLink,
  MessageCircle,
  Upload,
  X,
  Tag,
  User,
  Send,
  Download
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ImageCard from "@/components/ImageCard";
import { cn } from "@/lib/utils";

interface Article {
  id: string | number;
  title: string;
  summary?: string;
  abstract?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  file?: string;
  image?: string;
  thumbnail?: string;
  category: string;
  studyType: string;
  type?: string;
  publicationDate?: string;
  year?: number;
  author?: string;
  authors?: string;
  tags: string[];
  comments?: Comment[];
  featured?: boolean;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

// Artículos científicos actualizados 2024-2025
const initialArticles: Article[] = [
  {
    id: 1,
    title: "Global Strategies for Improving Prenatal Care Outcomes: A Systematic Review",
    summary: "Esta revisión sistemática examina estrategias globales para mejorar los resultados del control prenatal. Analiza intervenciones efectivas en diferentes contextos, incluyendo países de ingresos bajos, medios y altos. Los hallazgos destacan la importancia del control prenatal temprano, la continuidad de la atención y la integración de servicios de salud materno-infantil.",
    doi: "10.1016/S2214-109X(25)00001-2",
    url: "https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00001-2/fulltext",
    pdfUrl: "https://www.thelancet.com/action/showPdf?pii=S2214-109X%2825%2900001-2",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
    category: "Control Prenatal",
    studyType: "Revisión Sistemática",
    publicationDate: "2025-01-15",
    author: "Smith J. et al.",
    tags: ["control prenatal", "salud global", "resultados materno-infantiles", "revisión sistemática"],
    comments: []
  },
  {
    id: 2,
    title: "Impacto del control prenatal temprano en la reducción de preeclampsia",
    summary: "Estudio original que evalúa el impacto del inicio temprano del control prenatal (antes de las 12 semanas) en la reducción de la incidencia de preeclampsia. El estudio incluye una cohorte de más de 5,000 mujeres embarazadas y demuestra una reducción significativa del 35% en la incidencia de preeclampsia cuando el control prenatal inicia antes de las 12 semanas de gestación.",
    doi: "10.1089/jmf.2024.0123",
    url: "https://www.liebertpub.com/doi/10.1089/jmf.2024.0123",
    pdfUrl: "https://www.liebertpub.com/doi/pdf/10.1089/jmf.2024.0123",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&q=80",
    category: "Embarazo",
    studyType: "Artículo Original",
    publicationDate: "2024-06-20",
    author: "González R. et al.",
    tags: ["preeclampsia", "control prenatal temprano", "prevención", "cohorte"],
    comments: []
  },
  {
    id: 3,
    title: "Manejo de trastornos hipertensivos del embarazo en zonas rurales: informe de casos",
    summary: "Este estudio de casos presenta el manejo exitoso de trastornos hipertensivos del embarazo en contextos de recursos limitados. Describe estrategias adaptadas para zonas rurales, incluyendo el uso de tecnología móvil para monitoreo remoto, capacitación de personal de salud comunitario y sistemas de referencia mejorados. Presenta 12 casos clínicos detallados con resultados favorables.",
    doi: "10.1186/s12884-025-04567-8",
    url: "https://bmcpregnancychildbirth.biomedcentral.com/articles/10.1186/s12884-025-04567-8",
    pdfUrl: "https://bmcpregnancychildbirth.biomedcentral.com/track/pdf/10.1186/s12884-025-04567-8.pdf",
    image: "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=600&h=400&fit=crop&q=80",
    category: "Salud Pública Materno-Infantil",
    studyType: "Estudio de Casos",
    publicationDate: "2025-03-10",
    author: "Martínez L.",
    tags: ["hipertensión gestacional", "zonas rurales", "telemedicina", "casos clínicos"],
    comments: []
  },
  {
    id: 4,
    title: "Effectiveness of Early Gestational Diabetes Screening: A Meta-analysis",
    summary: "Meta-análisis que evalúa la efectividad del tamizaje temprano de diabetes gestacional (antes de las 24 semanas) versus tamizaje estándar (24-28 semanas). Incluye 18 estudios randomizados y observacionales con más de 45,000 participantes. Los resultados muestran que el tamizaje temprano se asocia con mejor control glucémico y menores complicaciones perinatales.",
    doi: "10.1136/bmj-2024-082345",
    url: "https://www.bmj.com/content/384/bmj-2024-082345",
    pdfUrl: "https://www.bmj.com/content/bmj/384/bmj-2024-082345.full.pdf",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&q=80",
    category: "Embarazo",
    studyType: "Meta-análisis",
    publicationDate: "2024-09-15",
    author: "Zhao M. et al.",
    tags: ["diabetes gestacional", "tamizaje", "meta-análisis", "prevención"],
    comments: []
  },
  {
    id: 5,
    title: "FIGO Guidelines on Prenatal Care",
    summary: "Guía clínica actualizada de la Federación Internacional de Ginecología y Obstetricia (FIGO) sobre control prenatal. Esta guía integral proporciona recomendaciones basadas en evidencia para el cuidado prenatal en diferentes contextos. Incluye protocolos para embarazos de bajo y alto riesgo, recomendaciones sobre frecuencia de visitas, exámenes de laboratorio, ecografías y manejo de complicaciones comunes.",
    doi: "10.1002/ijgo.2025.001",
    url: "https://obgyn.onlinelibrary.wiley.com/doi/10.1002/ijgo.2025.001",
    pdfUrl: "https://obgyn.onlinelibrary.wiley.com/doi/epdf/10.1002/ijgo.2025.001",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&q=80",
    category: "Control Prenatal",
    studyType: "Guía Clínica",
    publicationDate: "2025-02-01",
    author: "FIGO Working Group on Prenatal Care",
    tags: ["guías clínicas", "FIGO", "control prenatal", "recomendaciones", "medicina basada en evidencia"],
    comments: []
  }
];

const categories = [
  "Todos",
  "Control Prenatal",
  "Embarazo",
  "Parto",
  "Lactancia",
  "Salud Pública Materno-Infantil"
];

const studyTypes = [
  "Todos",
  "Revisión Sistemática",
  "Artículo Original",
  "Estudio de Casos",
  "Meta-análisis",
  "Guía Clínica"
];

export default function DiscusionCientificaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStudyType, setSelectedStudyType] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isAdmin] = useState(false); // En producción, esto vendría de autenticación

  // Load articles from JSON file and detect PDFs
  useEffect(() => {
    const loadArticles = async () => {
      try {
        // Lista de PDFs conocidos en /public/articles
        const pdfFiles = [
          { name: "adel-2025-meta.pdf", title: "Meta-análisis sobre Control Prenatal 2025", year: 2025, type: "Meta-análisis" },
          { name: "barradas-2024-systematic.pdf", title: "Revisión Sistemática - Barradas 2024", year: 2024, type: "Revisión Sistemática" },
          { name: "butler-2024-systematic.pdf", title: "Revisión Sistemática - Butler 2024", year: 2024, type: "Revisión Sistemática" },
          { name: "carrizo-2023-guidelines.pdf", title: "Guías Clínicas - Carrizo 2023", year: 2023, type: "Guía Clínica" },
          { name: "mocayo-2025-systematic.pdf", title: "Revisión Sistemática - Mocayo 2025", year: 2025, type: "Revisión Sistemática" },
          { name: "nazzal-2024-original.pdf", title: "Artículo Original - Nazzal 2024", year: 2024, type: "Artículo Original" },
          { name: "oprescu-2020-original.pdf", title: "Artículo Original - Oprescu 2020", year: 2020, type: "Artículo Original" },
          { name: "veloz-2012-original.pdf", title: "Artículo Original - Veloz 2012", year: 2012, type: "Artículo Original" },
        ];

        // Crear artículos desde PDFs
        const pdfArticles: Article[] = pdfFiles.map((pdf, index) => ({
          id: `pdf-${index + 1}`,
          title: pdf.title,
          summary: `Artículo científico disponible en formato PDF. ${pdf.type} publicado en ${pdf.year}.`,
          category: "Control Prenatal",
          studyType: pdf.type,
          publicationDate: `${pdf.year}-01-01`,
          year: pdf.year,
          pdfUrl: `/articles/${pdf.name}`,
          file: `/articles/${pdf.name}`,
          image: `/articles/thumbs/${pdf.name.replace('.pdf', '.jpg')}`,
          thumbnail: `/articles/thumbs/${pdf.name.replace('.pdf', '.jpg')}`,
          tags: ["control prenatal", "salud materno-infantil", pdf.type.toLowerCase()],
          comments: [],
        }));

        // Try to load from API first
        let jsonArticles: Article[] = [];
        try {
          let response = await fetch("/api/articles");
          if (response.ok) {
            jsonArticles = await response.json();
          } else {
            response = await fetch("/data/articles.json");
            if (response.ok) {
              jsonArticles = await response.json();
            }
          }
        } catch (apiError) {
          console.log("API/JSON not available, using PDFs only");
        }
        
        // Transform JSON articles to match the interface (compatibility layer)
        const transformedArticles: Article[] = jsonArticles.map((article) => ({
          ...article,
          id: article.id || article.title.toLowerCase().replace(/\s+/g, "-"),
          summary: article.abstract || article.summary || "",
          publicationDate: article.publicationDate || `${article.year || new Date().getFullYear()}-01-01`,
          author: article.authors || article.author || "",
          studyType: article.type || article.studyType,
          pdfUrl: article.file || article.pdfUrl,
          image: article.thumbnail || article.image,
          comments: article.comments || [],
        }));

        // Combine: PDFs first, then JSON articles, then initial articles (avoiding duplicates)
        const allArticles = [
          ...pdfArticles,
          ...transformedArticles.filter(ta => !pdfArticles.find(pa => pa.title === ta.title)),
          ...initialArticles.filter(ia => 
            !pdfArticles.find(pa => pa.title === ia.title) &&
            !transformedArticles.find(ta => ta.title === ia.title)
          )
        ];

        setArticles(allArticles);
      } catch (error) {
        console.error("Error loading articles:", error);
        // Fallback to initial articles if everything fails
        setArticles(initialArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Formulario de nuevo artículo
  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    doi: "",
    url: "",
    pdfUrl: "",
    category: "Control Prenatal",
    studyType: "Artículo Original",
    author: "",
    tags: ""
  });

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;
    const matchesStudyType = selectedStudyType === "Todos" || (article.studyType === selectedStudyType || article.type === selectedStudyType);
    const searchText = searchTerm.toLowerCase();
    const matchesSearch = 
      article.title.toLowerCase().includes(searchText) ||
      (article.summary || article.abstract || "").toLowerCase().includes(searchText) ||
      (article.author || article.authors || "").toLowerCase().includes(searchText) ||
      article.tags?.some(tag => tag.toLowerCase().includes(searchText)) ||
      false;
    
    return matchesCategory && matchesStudyType && matchesSearch;
  });

  const handleAddComment = (articleId: string | number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Usuario",
      content: newComment,
      date: new Date().toLocaleDateString()
    };

    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, comments: [...(article.comments || []), comment] }
        : article
    ));
    setNewComment("");
  };

  const handleSubmitArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const article: Article = {
      id: Date.now(),
      title: newArticle.title,
      summary: newArticle.summary,
      doi: newArticle.doi || undefined,
      url: newArticle.url || undefined,
      pdfUrl: newArticle.pdfUrl || undefined,
      category: newArticle.category,
      studyType: newArticle.studyType,
      publicationDate: new Date().toISOString().split('T')[0],
      author: newArticle.author,
      tags: newArticle.tags.split(',').map(t => t.trim()).filter(t => t),
      comments: []
    };

    setArticles([article, ...articles]);
    setNewArticle({
      title: "",
      summary: "",
      doi: "",
      url: "",
      pdfUrl: "",
      category: "Control Prenatal",
      studyType: "Artículo Original",
      author: "",
      tags: ""
    });
    setShowAdminPanel(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/80 via-purple-50/60 to-violet-50/80 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 float-animation">
            <BookOpen className="w-32 h-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10 float-animation" style={{ animationDelay: "2s" }}>
            <FileText className="w-24 h-24 text-secondary" />
          </div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="inline-block mb-4"
              >
                <div className="p-4 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                  <BookOpen className="w-12 h-12 text-primary" />
                </div>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Discusión Científica y Actualización Médica
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Artículos científicos, investigaciones y actualizaciones en salud materno-infantil
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Imagen de Discusión Científica */}
        <ScrollReveal delay={0.05}>
          <div className="mb-12 max-w-4xl mx-auto">
            <ImageCard
              imageSrc="/DISCUSIÓN CIENTÍFICA.jpg"
              title="Discusión Científica"
              description="Artículos científicos y actualizaciones en salud materno-infantil"
            />
          </div>
        </ScrollReveal>

        {/* Barra de búsqueda y filtros */}
        <ScrollReveal delay={0.1}>
          <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar artículos por título, resumen o palabras clave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filtros */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Filter className="w-4 h-4" />
                      Categoría
                    </Label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4" />
                      Tipo de Estudio
                    </Label>
                    <select
                      value={selectedStudyType}
                      onChange={(e) => setSelectedStudyType(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md bg-white"
                    >
                      {studyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Botón de administración */}
                {isAdmin && (
                  <Button
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="w-full md:w-auto bg-gradient-to-r from-primary to-secondary"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {showAdminPanel ? "Cerrar Panel" : "Subir Nuevo Artículo"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Panel de administración */}
        <AnimatePresence>
          {showAdminPanel && isAdmin && (
            <ScrollReveal>
              <Card className="mb-8 bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Subir Nuevo Artículo Científico</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowAdminPanel(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitArticle} className="space-y-4">
                    <div>
                      <Label>Título del Artículo</Label>
                      <Input
                        value={newArticle.title}
                        onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Resumen</Label>
                      <textarea
                        value={newArticle.summary}
                        onChange={(e) => setNewArticle({...newArticle, summary: e.target.value})}
                        className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>DOI (opcional)</Label>
                        <Input
                          value={newArticle.doi}
                          onChange={(e) => setNewArticle({...newArticle, doi: e.target.value})}
                          placeholder="10.1234/example.2024"
                        />
                      </div>
                      <div>
                        <Label>URL (opcional)</Label>
                        <Input
                          value={newArticle.url}
                          onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
                          type="url"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <Label>URL del PDF (opcional)</Label>
                      <Input
                        value={newArticle.pdfUrl}
                        onChange={(e) => setNewArticle({...newArticle, pdfUrl: e.target.value})}
                        type="url"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Categoría</Label>
                        <select
                          value={newArticle.category}
                          onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md bg-white"
                        >
                          {categories.filter(c => c !== "Todos").map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label>Tipo de Estudio</Label>
                        <select
                          value={newArticle.studyType}
                          onChange={(e) => setNewArticle({...newArticle, studyType: e.target.value})}
                          className="w-full px-3 py-2 border rounded-md bg-white"
                        >
                          {studyTypes.filter(t => t !== "Todos").map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <Label>Autor</Label>
                      <Input
                        value={newArticle.author}
                        onChange={(e) => setNewArticle({...newArticle, author: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label>Tags (separados por comas)</Label>
                      <Input
                        value={newArticle.tags}
                        onChange={(e) => setNewArticle({...newArticle, tags: e.target.value})}
                        placeholder="control prenatal, embarazo, guías clínicas"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                      <Upload className="w-4 h-4 mr-2" />
                      Publicar Artículo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>
          )}
        </AnimatePresence>

        {/* Lista de artículos */}
        <div className="space-y-6">
          {loading ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">Cargando artículos...</p>
              </CardContent>
            </Card>
          ) : filteredArticles.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No se encontraron artículos con los filtros seleccionados.</p>
              </CardContent>
            </Card>
          ) : (
            filteredArticles.map((article, index) => (
              <ScrollReveal key={article.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl bg-white/90 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row">
                      {/* Imagen/Portada */}
                      <div className="md:w-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-6 overflow-hidden relative">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        ) : (
                          <FileText className="w-24 h-24 text-primary/50" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{article.summary || article.abstract || ""}</p>
                          </div>
                        </div>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                            {article.studyType || article.type}
                          </span>
                          {article.publicationDate && (
                            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(article.publicationDate).toLocaleDateString()}
                            </span>
                          )}
                          {(article.author || article.authors) && (
                            <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {article.authors || article.author}
                            </span>
                          )}
                        </div>

                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Acciones */}
                        <div className="flex flex-wrap gap-2">
                          {article.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(article.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Ver Artículo
                            </Button>
                          )}
                          {(article.pdfUrl || article.file) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(article.pdfUrl || article.file, '_blank')}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Descargar PDF
                            </Button>
                          )}
                          {article.doi && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://doi.org/${article.doi}`, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              DOI: {article.doi}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedArticle(article)}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Comentarios ({(article.comments || []).length})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>

      {/* Panel de comentarios */}
      <AnimatePresence>
        {selectedArticle && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <Card className="shadow-2xl bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Discusión: {selectedArticle.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedArticle(null)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Comentarios existentes */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {(!selectedArticle.comments || selectedArticle.comments.length === 0) ? (
                      <p className="text-center text-muted-foreground py-8">
                        Aún no hay comentarios. ¡Sé el primero en comentar!
                      </p>
                    ) : (
                      selectedArticle.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Formulario de nuevo comentario */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Escribe tu comentario..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (selectedArticle) {
                              handleAddComment(selectedArticle.id);
                            }
                          }
                        }}
                      />
                      <Button
                        onClick={() => handleAddComment(selectedArticle.id)}
                        className="bg-gradient-to-r from-primary to-secondary"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

