import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { speakingSlots } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const slots = await db.query.speakingSlots.findMany({
    orderBy: [asc(speakingSlots.dateTime)],
  });
  return NextResponse.json(slots);
}

export async function POST(request: Request) {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = (await request.json()) as {
    teacherName: string;
    dateTime: string;
    durationMinutes?: number;
    price: string | number;
    isActive?: boolean;
  };

  const [slot] = await db
    .insert(speakingSlots)
    .values({
      teacherName: body.teacherName,
      dateTime: new Date(body.dateTime),
      durationMinutes: body.durationMinutes ?? 15,
      price: String(body.price),
      isActive: body.isActive ?? true,
    })
    .returning();

  return NextResponse.json(slot, { status: 201 });
}
