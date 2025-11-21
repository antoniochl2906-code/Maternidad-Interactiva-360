import { NextResponse } from "next/server";

// POST /api/feedback - Guardar feedback (opcional: guardar en base de datos)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validación básica
    if (!body.rating || !body.comment || !body.page || !body.date) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Aquí puedes guardar en una base de datos
    // Por ahora, solo retornamos éxito
    // En producción, deberías:
    // 1. Validar el feedback (anti-spam)
    // 2. Guardar en base de datos (PostgreSQL, MongoDB, etc.)
    // 3. Opcionalmente enviar notificación por email
    // 4. Retornar confirmación

    console.log("Feedback recibido:", body);

    // Ejemplo de guardado en base de datos (descomentar cuando tengas DB):
    /*
    const feedback = await prisma.feedback.create({
      data: {
        name: body.name,
        email: body.email,
        rating: body.rating,
        comment: body.comment,
        page: body.page,
        date: new Date(body.date),
      },
    });
    */

    return NextResponse.json(
      { message: "Feedback guardado exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving feedback:", error);
    return NextResponse.json(
      { error: "Error al guardar feedback" },
      { status: 500 }
    );
  }
}

