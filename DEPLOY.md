# Guía de Despliegue - Maternidad Interactiva 360

Esta guía explica cómo subir el proyecto a GitHub y desplegarlo en producción usando Vercel, Netlify o GitHub Pages.

## 📋 Requisitos Previos

- Git instalado en tu sistema
- Cuenta de GitHub
- Cuenta en Vercel/Netlify (para despliegue automático)
- Node.js y npm instalados (versión 18 o superior)

---

## 1️⃣ Inicializar Repositorio y Subir a GitHub

### Paso 1: Inicializar Git (si no está inicializado)

```bash
# Navega a la carpeta del proyecto
cd "C:\DIPLOMADO IA\PAGINA"

# Inicializar repositorio Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "feat: Maternidad Interactiva 360 - inicial"
```

### Paso 2: Crear Repositorio en GitHub

**Opción A: Usando GitHub CLI (recomendado)**

```bash
# Instalar GitHub CLI si no lo tienes: https://cli.github.com/

# Crear repositorio y conectarlo
gh repo create maternidad-interactiva-360 --public --source=. --remote=origin

# Push al repositorio
git push -u origin main
```

**Opción B: Manualmente en GitHub**

1. Ve a [github.com](https://github.com) y crea un nuevo repositorio
2. No inicialices con README, .gitignore ni licencia (ya los tenemos)
3. Ejecuta los siguientes comandos:

```bash
# Conectar con el repositorio remoto (reemplaza USERNAME y REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Cambiar a rama main si estás en master
git branch -M main

# Push al repositorio
git push -u origin main
```

### Paso 3: Verificar .gitignore

Asegúrate de que tu `.gitignore` incluya:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
.vercel

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

---

## 2️⃣ Variables de Entorno

### Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto (NO subir al repositorio):

```env
# Título del sitio
NEXT_PUBLIC_SITE_TITLE="Maternidad Interactiva 360"

# API Key de OpenAI (si usas ChatGPT/GPT-4 en el chatbot)
# ⚠️ IMPORTANTE: NO subir esta clave al repositorio público
OPENAI_API_KEY="sk-xxxx"

# URL del sitio (para producción)
NEXT_PUBLIC_SITE_URL="https://tu-dominio.vercel.app"
```

### ⚠️ Importante: Seguridad

**NUNCA** subas claves de API al repositorio. Si accidentalmente subiste una clave:

1. Revócala inmediatamente en el panel de OpenAI
2. Crea una nueva clave
3. Añádela a `.gitignore`
4. Usa `git rm --cached .env.local` para removerla del tracking

---

## 3️⃣ Despliegue en Vercel (Recomendado para Next.js)

Vercel es la plataforma recomendada para proyectos Next.js porque:
- ✅ Optimización automática
- ✅ Despliegue instantáneo en cada push
- ✅ Preview deployments para PRs
- ✅ SSL/HTTPS automático
- ✅ CDN global

### Paso 1: Crear Cuenta y Conectar

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes usar GitHub)
2. Click en **"Import Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js

### Paso 2: Configurar Variables de Entorno

En el dashboard de Vercel:

1. Ve a **Settings** → **Environment Variables**
2. Añade las variables:

| Variable | Valor | Environments |
|----------|-------|--------------|
| `NEXT_PUBLIC_SITE_TITLE` | `Maternidad Interactiva 360` | Production, Preview, Development |
| `OPENAI_API_KEY` | `sk-xxxx` | Production, Preview (opcional) |
| `NEXT_PUBLIC_SITE_URL` | `https://tu-proyecto.vercel.app` | Production |

3. Click en **Save**

### Paso 3: Despliegue

1. Click en **Deploy**
2. Vercel construirá y desplegará automáticamente
3. Obtendrás una URL: `https://tu-proyecto.vercel.app`

### Configuración Adicional

- **Framework Preset**: Next.js (auto-detectado)
- **Build Command**: `npm run build` (auto)
- **Output Directory**: `.next` (auto)
- **Install Command**: `npm install` (auto)

### Actualizaciones Automáticas

Cada vez que hagas push a `main`, Vercel desplegará automáticamente. Para cambios manuales:

```bash
git push origin main
```

---

## 4️⃣ Despliegue en Netlify (Alternativa)

Netlify también es una excelente opción para Next.js.

### Paso 1: Crear Cuenta y Conectar

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y autoriza
4. Selecciona tu repositorio

### Paso 2: Configurar Build Settings

**Build command:**
```bash
npm run build
```

**Publish directory:**
```
.next
```

**O para export estático:**
```
out
```

### Paso 3: Variables de Entorno

1. Ve a **Site settings** → **Environment variables**
2. Añade las mismas variables que en Vercel
3. Click en **Save**

### Paso 4: Despliegue

1. Click en **Deploy site**
2. Netlify construirá y desplegará
3. URL: `https://tu-proyecto.netlify.app`

---

## 5️⃣ Despliegue en GitHub Pages (Solo para Export Estático)

GitHub Pages requiere que el proyecto sea exportado estáticamente.

### Paso 1: Configurar next.config.js

Edita `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Necesario para GitHub Pages
  },
  // Si tu sitio está en un subdirectorio, añade:
  // basePath: '/maternidad-interactiva-360',
  // assetPrefix: '/maternidad-interactiva-360',
}

module.exports = nextConfig
```

### Paso 2: Crear GitHub Action

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_TITLE: Maternidad Interactiva 360

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### Paso 3: Habilitar GitHub Pages

1. Ve a **Settings** → **Pages** en tu repositorio
2. En **Source**, selecciona **GitHub Actions**
3. El despliegue se realizará automáticamente en cada push

---

## 6️⃣ Subir Artículos Científicos (Post-Despliegue)

Después del despliegue, para añadir nuevos artículos:

### Paso 1: Añadir Archivos Localmente

```bash
# Subir PDF
git add public/articles/nuevo-articulo.pdf

# Subir thumbnail (opcional)
git add public/articles/thumbs/nuevo-articulo.png

# Actualizar JSON
git add data/articles.json
```

### Paso 2: Commit y Push

```bash
git commit -m "docs: add article nuevo-articulo"
git push origin main
```

### Paso 3: Despliegue Automático

- **Vercel/Netlify**: El despliegue se realizará automáticamente
- **GitHub Pages**: El GitHub Action desplegará automáticamente

El artículo estará disponible en:
- `https://tu-dominio.com/discusion-cientifica`
- `https://tu-dominio.com/articles/nuevo-articulo.pdf`

---

## 7️⃣ Pull Requests y Revisión

Para añadir artículos de forma colaborativa:

### Paso 1: Crear Branch

```bash
git checkout -b feature/add-article-smith-2025
```

### Paso 2: Hacer Cambios

Añade el artículo siguiendo las instrucciones en `admin/README_UPLOAD.md`

### Paso 3: Commit y Push

```bash
git add .
git commit -m "docs: add article smith-2025-systematic"
git push origin feature/add-article-smith-2025
```

### Paso 4: Abrir Pull Request

1. Ve a GitHub y click en **"Compare & pull request"**
2. Describe los cambios
3. Espera la revisión
4. Después del merge, el despliegue se realizará automáticamente

---

## 8️⃣ Configuración de Dominio Personalizado

### En Vercel:

1. Ve a **Settings** → **Domains**
2. Añade tu dominio personalizado
3. Sigue las instrucciones de DNS

### En Netlify:

1. Ve a **Domain settings**
2. Click en **Add custom domain**
3. Configura los registros DNS

---

## 🔧 Troubleshooting

### Error: "Build failed"

- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no haya errores de TypeScript
- Revisa los logs de build en el dashboard

### Variables de entorno no funcionan

- Asegúrate de que las variables empiecen con `NEXT_PUBLIC_` para variables del cliente
- Verifica que estén configuradas en el dashboard
- Reinicia el despliegue después de añadir variables

### El sitio no carga

- Verifica que el build se haya completado exitosamente
- Revisa los logs de runtime
- Verifica que las rutas estén correctas

### Artículos no aparecen

- Verifica que `data/articles.json` sea válido JSON
- Asegúrate de que los PDFs estén en `/public/articles/`
- Verifica las rutas en el JSON

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Netlify](https://docs.netlify.com)
- [Documentación de GitHub Pages](https://docs.github.com/pages)

---

## 🎯 Checklist de Despliegue

Antes de desplegar, verifica:

- [ ] Repositorio Git inicializado
- [ ] `.gitignore` configurado correctamente
- [ ] `.env.local` creado (NO subido)
- [ ] Variables de entorno configuradas en la plataforma
- [ ] `package.json` con todas las dependencias
- [ ] Build local exitoso: `npm run build`
- [ ] Sin errores de TypeScript: `npm run lint`
- [ ] Repositorio conectado a GitHub
- [ ] Despliegue configurado en Vercel/Netlify

---

**Última actualización:** Enero 2025

