import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { db } from "@/db";
import { mockPackages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const { authorized } = await requireAdmin();
  if (!authorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const packages = await db.query.mockPackages.findMany({
    orderBy: [desc(mockPackages.createdAt)],
  });
  return NextResponse.json(packages);
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
    fullDescription?: string;
    price: string | number;
    discountPrice?: string | number | null;
    features?: string[];
    includesSpeaking?: boolean;
    isActive?: boolean;
  };

  const [pkg] = await db
    .insert(mockPackages)
    .values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      fullDescription: body.fullDescription,
      price: String(body.price),
      discountPrice: body.discountPrice ? String(body.discountPrice) : null,
      features: body.features ?? [],
      includesSpeaking: body.includesSpeaking ?? false,
      isActive: body.isActive ?? true,
    })
    .returning();

  return NextResponse.json(pkg, { status: 201 });
}
