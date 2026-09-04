import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { mockPackages } from "@/db/schema";
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
    fullDescription: string;
    price: string | number;
    discountPrice: string | number | null;
    features: string[];
    includesSpeaking: boolean;
    isActive: boolean;
  }>;

  const updateData: Record<string, unknown> = {};
  if (body.title !== undefined) updateData.title = body.title;
  if (body.slug !== undefined) updateData.slug = body.slug;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.fullDescription !== undefined) updateData.fullDescription = body.fullDescription;
  if (body.price !== undefined) updateData.price = String(body.price);
  if (body.discountPrice !== undefined) {
    updateData.discountPrice = body.discountPrice ? String(body.discountPrice) : null;
  }
  if (body.features !== undefined) updateData.features = body.features;
  if (body.includesSpeaking !== undefined) updateData.includesSpeaking = body.includesSpeaking;
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const [pkg] = await db
    .update(mockPackages)
    .set(updateData)
    .where(eq(mockPackages.id, id))
    .returning();

  return NextResponse.json(pkg);
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
  await db.delete(mockPackages).where(eq(mockPackages.id, id));
  return NextResponse.json({ success: true });
}
