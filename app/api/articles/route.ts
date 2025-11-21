import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// GET /api/articles - Obtener todos los artículos
export async function GET() {
  try {
    // Leer el archivo JSON desde /data/articles.json
    const filePath = path.join(process.cwd(), "data", "articles.json");
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const articles = JSON.parse(fileContents);

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error reading articles:", error);
    return NextResponse.json(
      { error: "Error al cargar artículos" },
      { status: 500 }
    );
  }
}

// POST /api/articles - Crear nuevo artículo (requiere autenticación en producción)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.title || !body.authors || !body.abstract) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Leer artículos existentes
    const filePath = path.join(process.cwd(), "data", "articles.json");
    let articles = [];

    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, "utf8");
      articles = JSON.parse(fileContents);
    }

    // Añadir nuevo artículo al inicio
    articles.unshift(body);

    // Guardar de vuelta al archivo
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf8");

    return NextResponse.json(
      { message: "Artículo creado exitosamente", article: body },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Error al crear artículo" },
      { status: 500 }
    );
  }
}

