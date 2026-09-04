import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { predictionBooks } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const books = await db.query.predictionBooks.findMany({
    orderBy: [desc(predictionBooks.createdAt)],
  });
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    title: string;
    slug: string;
    description: string;
    price: string | number;
    coverUrl?: string;
    isActive?: boolean;
  };

  const [book] = await db
    .insert(predictionBooks)
    .values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      price: String(body.price),
      coverUrl: body.coverUrl,
      isActive: body.isActive ?? true,
    })
    .returning();

  return NextResponse.json(book, { status: 201 });
}
