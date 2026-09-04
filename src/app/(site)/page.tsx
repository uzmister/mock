"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  Headphones,
  MessageCircle,
  Mic,
  Target,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-10 md:pt-16">
        <div className="absolute -right-20 -top-40 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -left-20 top-40 h-96 w-96 rounded-full bg-blue-900/10 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-1.5 text-sm font-medium text-[#0B0F3A]/80 shadow-sm backdrop-blur">
              <Target size={16} className="text-[#E60012]" />
              IELTS uchun haqiqiy mock tajriba
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-[#0B0F3A] md:text-6xl">
              TARGET bilan IELTS <br />
              <span className="text-gradient">bandingizni aniqlang</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-[#0B0F3A]/70">
              Mock imtihon paketlari, ekspertlar yozgan prediction kitoblar va pullik speaking darslar — barchasi bir platformada.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/packages" className="btn-primary">
                Mock paketlar
              </Link>
              <Link href="/speaking" className="btn-secondary">
                Speaking jadvali
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#E60012]/20 to-[#0B0F3A]/20 blur-2xl" />
            <div className="relative grid gap-4 p-2">
              <StatCard
                icon={<ClipboardCheck className="text-[#E60012]" />}
                label="Mock imtihonlar"
                value="Listening, Reading, Writing"
              />
              <StatCard
                icon={<BookOpen className="text-[#0B0F3A]" />}
                label="Prediction kitoblar"
                value="Har oy yangilanadi"
              />
              <StatCard
                icon={<Mic className="text-[#E60012]" />}
                label="Speaking darslari"
                value="1:1 professional ustozlar"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#0B0F3A]">Nima uchun TARGET?</h2>
          <p className="mt-3 text-[#0B0F3A]/70">
            Haqiqiy imtihon sharoitini yaratib, natijangizni tez oshiring.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Headphones size={28} />}
            title="Listening"
            desc="Audio bilan to'liq mock testlar"
          />
          <FeatureCard
            icon={<BookOpen size={28} />}
            title="Reading"
            desc="Academic & General modellar"
          />
          <FeatureCard
            icon={<MessageCircle size={28} />}
            title="Writing"
            desc="Task 1 & Task 2 mashqlari"
          />
          <FeatureCard
            icon={<Mic size={28} />}
            title="Speaking"
            desc="Pullik 1:1 darslar jadvali"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-6 mb-20 rounded-[2rem] gradient-target px-6 py-16 text-center text-white md:mx-12">
        <h2 className="text-3xl font-bold md:text-4xl">Bugun boshlang</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/80">
          Google akkauntingiz bilan bir zumda ro'yxatdan o'ting va ilk mock imtihonini topshiring.
        </p>
        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-[#0B0F3A] shadow-xl transition-transform hover:scale-105"
          >
            <CalendarCheck size={20} />
            Bepul ro'yxatdan o'tish
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="soft-card flex items-center gap-4 p-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0B0F3A]/60">
          {label}
        </p>
        <p className="font-semibold text-[#0B0F3A]">{value}</p>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="soft-card group p-6 transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E60012]/10 to-[#0B0F3A]/10 text-[#E60012] transition-colors group-hover:bg-[#E60012] group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#0B0F3A]">{title}</h3>
      <p className="mt-2 text-sm text-[#0B0F3A]/70">{desc}</p>
    </div>
  );
}
