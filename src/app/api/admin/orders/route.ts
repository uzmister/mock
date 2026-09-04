import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const items = await db.query.orders.findMany({
    with: {
      user: true,
    },
    orderBy: [desc(orders.createdAt)],
  });
  return NextResponse.json(items);
}
