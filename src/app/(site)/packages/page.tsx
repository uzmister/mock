import { getBaseUrl } from "@/lib/base-url";
import { BuyButton } from "@/components/buy-button";
import { Check, Headphones, MessageCircle, PenTool } from "lucide-react";

interface Package {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  discountPrice: string | null;
  features: string[];
  includesSpeaking: boolean;
}

export default async function PackagesPage() {
  const res = await fetch(`${getBaseUrl()}/api/packages`, { cache: "no-store" });
  const packages: Package[] = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black text-[#0B0F3A] md:text-5xl">
          Mock IELTS paketlar
        </h1>
        <p className="mt-4 text-[#0B0F3A]/70">
          O'zingizga mos paketni tanlang va haqiqiy imtihon sharoitida mashq qiling.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="soft-card relative flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            {pkg.includesSpeaking && (
              <span className="absolute -right-px -top-px rounded-bl-2xl rounded-tr-[1.15rem] bg-[#E60012] px-4 py-1.5 text-xs font-bold text-white">
                Speaking bilan
              </span>
            )}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B0F3A]/10 to-[#E60012]/10 text-[#0B0F3A]">
              <Headphones size={28} />
            </div>
            <h2 className="text-xl font-bold text-[#0B0F3A]">{pkg.title}</h2>
            <p className="mt-2 text-sm text-[#0B0F3A]/70">{pkg.description}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#E60012]">
                {Number(pkg.discountPrice ?? pkg.price).toLocaleString("uz-UZ")} so'm
              </span>
              {pkg.discountPrice && (
                <span className="text-sm text-[#0B0F3A]/40 line-through">
                  {Number(pkg.price).toLocaleString("uz-UZ")} so'm
                </span>
              )}
            </div>

            <ul className="mt-6 flex-1 space-y-3">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-[#0B0F3A]/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-[#E60012]" />
                  {feature}
                </li>
              ))}
              {pkg.includesSpeaking && (
                <li className="flex items-start gap-2 text-sm text-[#0B0F3A]/80">
                  <MessageCircle size={16} className="mt-0.5 shrink-0 text-[#E60012]" />
                  Speaking darsi qamrovda
                </li>
              )}
            </ul>

            <div className="mt-8">
              <BuyButton type="package" itemId={pkg.id} amount={pkg.discountPrice ?? pkg.price} label="Paketni sotib olish" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
