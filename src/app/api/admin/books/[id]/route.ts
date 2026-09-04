import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { predictionBooks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = (await request.json()) as Partial<{
    title: string;
    slug: string;
    description: string;
    price: string | number;
    coverUrl: string;
    isActive: boolean;
  }>;

  const updateData: Record<string, unknown> = {};
  if (body.title !== undefined) updateData.title = body.title;
  if (body.slug !== undefined) updateData.slug = body.slug;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.price !== undefined) updateData.price = String(body.price);
  if (body.coverUrl !== undefined) updateData.coverUrl = body.coverUrl;
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const [book] = await db
    .update(predictionBooks)
    .set(updateData)
    .where(eq(predictionBooks.id, id))
    .returning();

  return NextResponse.json(book);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await db.delete(predictionBooks).where(eq(predictionBooks.id, id));
  return NextResponse.json({ success: true });
}
