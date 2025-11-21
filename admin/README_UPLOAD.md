# Guía de Subida de Artículos Científicos

Esta guía explica cómo subir nuevos artículos científicos a la sección "Discusión Científica" de Maternidad Interactiva 360.

## 📋 Requisitos Previos

- Acceso al repositorio GitHub del proyecto
- Permisos para hacer commits y push
- Los archivos PDF del artículo que deseas subir
- Thumbnail/imagen del artículo (opcional pero recomendado)

## 📝 Pasos para Subir un Artículo

### 1. Preparar los Archivos

#### Nombrar el PDF
El formato de nombre debe ser: `{autor-principal}-{año}-{tipo}.pdf`

**Ejemplos:**
- `smith-2025-systematic.pdf` (para "Smith A, et al. - 2025 - Revisión sistemática")
- `gonzalez-2024-original.pdf` (para "González R, et al. - 2024 - Artículo original")
- `martinez-2025-case.pdf` (para "Martínez L. - 2025 - Estudio de caso")

**Reglas:**
- Usar solo letras minúsculas y guiones
- Sin espacios ni caracteres especiales
- Tipo abreviado: `systematic`, `original`, `case`, `meta`, `guidelines`

#### Preparar Thumbnail (Opcional)
- Formato recomendado: PNG o JPG
- Tamaño recomendado: 300x400px o proporción similar
- Nombre: `{mismo-nombre-del-pdf}.png`
- Ejemplo: `smith-2025-systematic.png`

### 2. Subir Archivos al Repositorio

#### PDF
Copiar el archivo PDF a:
```
/public/articles/{nombre-archivo}.pdf
```

#### Thumbnail (si aplica)
Copiar la imagen a:
```
/public/articles/thumbs/{nombre-archivo}.png
```

### 3. Actualizar articles.json

Editar el archivo `/data/articles.json` y añadir la nueva entrada al **inicio** del array:

```json
[
  {
    "id": "smith-2025-systematic",
    "title": "Título Completo del Artículo",
    "authors": "Smith A, et al.",
    "year": 2025,
    "type": "Revisión sistemática",
    "abstract": "Resumen completo del artículo en español o inglés...",
    "doi": "10.1016/S2214-109X(25)00001-2",
    "url": "https://ejemplo.com/articulo",
    "file": "/articles/smith-2025-systematic.pdf",
    "thumbnail": "/articles/thumbs/smith-2025-systematic.png",
    "category": "Control Prenatal",
    "tags": ["tag1", "tag2", "tag3"],
    "featured": true
  },
  // ... artículos existentes
]
```

#### Campos del JSON

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | string | Sí | Slug único (mismo nombre base que el PDF sin extensión) |
| `title` | string | Sí | Título completo del artículo |
| `authors` | string | Sí | Autores (ej: "Smith A, et al.") |
| `year` | number | Sí | Año de publicación |
| `type` | string | Sí | Uno de: "Revisión sistemática", "Artículo original", "Estudio de caso", "Meta-análisis", "Guía clínica" |
| `abstract` | string | Sí | Resumen completo del artículo |
| `doi` | string | No | DOI si está disponible |
| `url` | string | No | URL del artículo original |
| `file` | string | Sí | Ruta al PDF: `/articles/{nombre}.pdf` |
| `thumbnail` | string | No | Ruta a la imagen: `/articles/thumbs/{nombre}.png` |
| `category` | string | Sí | Categoría del artículo |
| `tags` | array | No | Array de strings con tags |
| `featured` | boolean | No | Si es `true`, se destaca en la página principal |

#### Tipos de Estudio Válidos
- "Revisión sistemática"
- "Artículo original"
- "Estudio de caso"
- "Meta-análisis"
- "Guía clínica"

#### Categorías Disponibles
- "Control Prenatal"
- "Embarazo"
- "Parto"
- "Lactancia"
- "Salud Pública Materno-Infantil"

### 4. Commit y Push a GitHub

Una vez que hayas:
1. ✅ Subido el PDF a `/public/articles/`
2. ✅ Subido el thumbnail a `/public/articles/thumbs/` (opcional)
3. ✅ Actualizado `/data/articles.json`

Ejecuta los siguientes comandos:

```bash
# Añadir los archivos nuevos
git add public/articles/nombre-archivo.pdf
git add public/articles/thumbs/nombre-archivo.png  # si aplica
git add data/articles.json

# Hacer commit
git commit -m "docs: add article smith-2025-systematic"

# Push a GitHub
git push origin main
```

### 5. Verificar en Producción

Después del despliegue (ver DEPLOY.md), el artículo debería estar disponible en:
- URL: `https://tu-dominio.com/discusion-cientifica`
- PDF directo: `https://tu-dominio.com/articles/smith-2025-systematic.pdf`

## 🛠️ Panel de Administración (Opcional)

Puedes usar el panel de administración en `/admin/articles` para generar el JSON del artículo. Sin embargo, aún necesitas:

1. Subir manualmente el PDF a `/public/articles/`
2. Subir manualmente el thumbnail a `/public/articles/thumbs/`
3. Actualizar manualmente `/data/articles.json`
4. Hacer commit y push

**Nota:** En el futuro, cuando se implemente un backend, el panel podrá subir archivos directamente.

## ⚠️ Consideraciones Importantes

### Tamaño de Archivos
- **PDFs**: Recomendado máximo 10MB por archivo
- **Thumbnails**: Recomendado máximo 500KB por imagen

### Licencias y Permisos
- Asegúrate de tener los derechos para publicar el artículo
- Respeta las políticas de acceso abierto de las revistas
- Si el artículo requiere suscripción, proporciona solo el resumen y la referencia

### SEO y Accesibilidad
- Usa títulos descriptivos y claros
- Incluye resúmenes completos y bien escritos
- Añade tags relevantes para facilitar la búsqueda

## 📚 Ejemplo Completo

### Archivos a Subir:
1. `/public/articles/gonzalez-2024-preeclampsia.pdf`
2. `/public/articles/thumbs/gonzalez-2024-preeclampsia.png`

### Entrada en articles.json:
```json
{
  "id": "gonzalez-2024-preeclampsia",
  "title": "Impacto del control prenatal temprano en la reducción de preeclampsia",
  "authors": "González R, et al.",
  "year": 2024,
  "type": "Artículo original",
  "abstract": "Estudio original que evalúa el impacto del inicio temprano del control prenatal (antes de las 12 semanas) en la reducción de la incidencia de preeclampsia...",
  "doi": "10.1089/jmf.2024.0123",
  "url": "https://www.liebertpub.com/doi/10.1089/jmf.2024.0123",
  "file": "/articles/gonzalez-2024-preeclampsia.pdf",
  "thumbnail": "/articles/thumbs/gonzalez-2024-preeclampsia.png",
  "category": "Embarazo",
  "tags": ["preeclampsia", "control prenatal temprano", "prevención"],
  "featured": true
}
```

### Comandos Git:
```bash
git add public/articles/gonzalez-2024-preeclampsia.pdf
git add public/articles/thumbs/gonzalez-2024-preeclampsia.png
git add data/articles.json
git commit -m "docs: add article gonzalez-2024-preeclampsia"
git push origin main
```

## 🐛 Solución de Problemas

### El artículo no aparece en la web
1. Verifica que el archivo JSON sea válido (usa un validador JSON)
2. Verifica que las rutas en `file` y `thumbnail` sean correctas
3. Asegúrate de que el commit y push se hayan completado
4. Verifica que el despliegue en producción se haya realizado

### El PDF no se abre
1. Verifica que el archivo PDF no esté corrupto
2. Asegúrate de que la ruta en `file` sea correcta (debe empezar con `/articles/`)
3. Verifica los permisos del archivo en el servidor

### Error al cargar el thumbnail
1. Verifica que la imagen esté en formato PNG o JPG
2. Asegúrate de que la ruta en `thumbnail` sea correcta (debe empezar con `/articles/thumbs/`)
3. Verifica que el tamaño de la imagen no sea excesivo

## 📞 Soporte

Si tienes problemas o preguntas, consulta:
- El archivo `DEPLOY.md` para instrucciones de despliegue
- El `README.md` principal del proyecto
- Abre un issue en GitHub si encuentras un bug

---

**Última actualización:** Enero 2025

