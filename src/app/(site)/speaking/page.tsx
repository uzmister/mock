import { getBaseUrl } from "@/lib/base-url";
import { BuyButton } from "@/components/buy-button";
import { Calendar, Clock, Mic, User } from "lucide-react";

interface Slot {
  id: string;
  teacherName: string;
  dateTime: string;
  durationMinutes: number;
  price: string;
}

export default async function SpeakingPage() {
  const res = await fetch(`${getBaseUrl()}/api/speaking`, { cache: "no-store" });
  const slots: Slot[] = res.ok ? await res.json() : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black text-[#0B0F3A] md:text-5xl">
          Pullik Speaking darslari
        </h1>
        <p className="mt-4 text-[#0B0F3A]/70">
          Professional ustozlar bilan 1:1 speaking mashg'ulotlari.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {slots.map((slot) => {
          const date = new Date(slot.dateTime);
          return (
            <div
              key={slot.id}
              className="soft-card flex flex-col p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0B0F3A] text-white">
                  <User size={22} />
                </div>
                <div>
                  <p className="text-sm text-[#0B0F3A]/60">O'qituvchi</p>
                  <p className="font-bold text-[#0B0F3A]">{slot.teacherName}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#0B0F3A]/80">
                  <Calendar size={18} className="text-[#E60012]" />
                  {date.toLocaleDateString("uz-UZ", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </div>
                <div className="flex items-center gap-3 text-sm text-[#0B0F3A]/80">
                  <Clock size={18} className="text-[#E60012]" />
                  {date.toLocaleTimeString("uz-UZ", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  ({slot.durationMinutes} daqiqa)
                </div>
                <div className="flex items-center gap-3 text-sm text-[#0B0F3A]/80">
                  <Mic size={18} className="text-[#E60012]" />
                  Zoom orqali individual dars
                </div>
              </div>

              <div className="mt-6 text-2xl font-black text-[#E60012]">
                {Number(slot.price).toLocaleString("uz-UZ")} so'm
              </div>

              <div className="mt-6">
                <BuyButton
                  type="speaking"
                  itemId={slot.id}
                  amount={slot.price}
                  label="Joy band qilish"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
