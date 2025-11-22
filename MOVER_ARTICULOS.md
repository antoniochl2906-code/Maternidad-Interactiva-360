# 🔧 Instrucciones para Mover Artículos PDF

## ⚠️ Problema Detectado

Los archivos PDF están en una ubicación incorrecta:
- ❌ Ubicación actual: `.next\types\app\api\articles\`
- ✅ Ubicación correcta: `public\articles\`

## 📋 Pasos para Corregir

### Opción 1: Usando el Script PowerShell (Recomendado)

1. Abre PowerShell en el directorio del proyecto
2. Ejecuta el script:
   ```powershell
   .\scripts\move-articles.ps1
   ```

### Opción 2: Manualmente

1. **Crear el directorio** (si no existe):
   ```
   public\articles\
   ```

2. **Mover los archivos PDF** desde:
   ```
   .next\types\app\api\articles\
   ```
   a:
   ```
   public\articles\
   ```

   Archivos a mover:
   - `adel-2025-meta.pdf.pdf` (renombrar a `adel-2025-meta.pdf`)
   - `barradas-2024-systematic.pdf`
   - `butler-2024-systematic.pdf`
   - `carrizo-2023-guidelines.pdf`
   - `mocayo-2025-systematic.pdf`
   - `nazzal-2024-original.pdf`
   - `oprescu-2020-original.pdf`
   - `veloz-2012-original.pdf`

3. **Actualizar `/data/articles.json`** con las entradas de estos artículos.

## 📝 Ejemplo de Entrada en articles.json

Para cada PDF, añade una entrada como esta al inicio del array en `data/articles.json`:

```json
{
  "id": "adel-2025-meta",
  "title": "Título del Artículo",
  "authors": "Adel A, et al.",
  "year": 2025,
  "type": "Meta-análisis",
  "abstract": "Resumen del artículo...",
  "doi": "10.xxxx/xxx",
  "url": "https://ejemplo.com/articulo",
  "file": "/articles/adel-2025-meta.pdf",
  "category": "Embarazo",
  "tags": ["tag1", "tag2"],
  "featured": false
}
```

## ⚡ Verificación

Después de mover los archivos:
1. Verifica que los PDFs estén en `public\articles\`
2. Verifica que `data/articles.json` tenga las entradas correctas
3. Reinicia el servidor de desarrollo: `npm run dev`
4. Visita `/discusion-cientifica` y verifica que los artículos se muestren

## 🔍 Nota Importante

- El directorio `.next` es generado automáticamente por Next.js y se regenera en cada build
- **NUNCA** subas archivos a `.next` porque se perderán
- Los archivos estáticos deben ir siempre en `public\`

