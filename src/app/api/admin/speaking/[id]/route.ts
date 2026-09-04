import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { speakingSlots } from "@/db/schema";
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
    teacherName: string;
    dateTime: string;
    durationMinutes: number;
    price: string | number;
    isBooked: boolean;
    isActive: boolean;
  }>;

  const updateData: Record<string, unknown> = {};
  if (body.teacherName !== undefined) updateData.teacherName = body.teacherName;
  if (body.dateTime !== undefined) updateData.dateTime = new Date(body.dateTime);
  if (body.durationMinutes !== undefined) updateData.durationMinutes = body.durationMinutes;
  if (body.price !== undefined) updateData.price = String(body.price);
  if (body.isBooked !== undefined) updateData.isBooked = body.isBooked;
  if (body.isActive !== undefined) updateData.isActive = body.isActive;

  const [slot] = await db
    .update(speakingSlots)
    .set(updateData)
    .where(eq(speakingSlots.id, id))
    .returning();

  return NextResponse.json(slot);
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
  await db.delete(speakingSlots).where(eq(speakingSlots.id, id));
  return NextResponse.json({ success: true });
}
