"use client";

import Link from "next/link";
import {
  ArrowRight,
  Gift,
  LayoutDashboard,
  Leaf,
  Map,
  ScanLine,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";

type FeatureCard = {
  href: string;
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
};

const featureCards: FeatureCard[] = [
  {
    href: "/scanner",
    title: "AI Scanner",
    description: "Deteksi jenis sampah secara instan lewat kamera.",
    icon: ScanLine,
  },
  {
    href: "/maps",
    title: "Peta Fasilitas",
    description: "Jelajahi lokasi pengelolaan sampah dan rute tercepat.",
    icon: Map,
  },
  {
    href: "/wallet",
    title: "Dompet Digital",
    description: "Pantau saldo poin, donasi, dan riwayat transaksi.",
    icon: Wallet,
  },
  {
    href: "/rewards",
    title: "Makassar Creative Hub",
    description: "Tukarkan hadiah menarik dari pusat kreativitas komunitas.",
    icon: Gift,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/15 via-slate-900/70 to-teal-500/10 p-6 shadow-[0_20px_80px_rgba(5,150,105,0.2)] backdrop-blur-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Selamat datang di Mangkasara TrashVision AI
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Wujudkan Makassar Bebas Sampah 2029.
            </h1>
            <p className="mt-3 text-base text-slate-300 sm:text-lg">
              Pantau dampak lingkungan, kumpulkan poin, dan jadilah bagian dari gerakan pengelolaan sampah yang cerdas di Makassar.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3 text-emerald-300">
              <Leaf className="h-5 w-5" />
              <span className="text-sm font-semibold">Dampak global aktif</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Total poin</p>
                <p className="mt-1 text-2xl font-semibold text-white">2.480</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Offset karbon</p>
                <p className="mt-1 text-2xl font-semibold text-white">1.240 kg</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Papan peringkat komunitas</p>
              <p className="text-sm text-slate-400">Kontributor paling aktif minggu ini</p>
            </div>
            <div className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-300">
              Top 3
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {[
              { name: "Aqila", points: "1.840 poin", badge: "MVP" },
              { name: "Raka", points: "1.610 poin", badge: "Cemerlang" },
              { name: "Nadia", points: "1.430 poin", badge: "Inovatif" },
            ].map((user) => (
              <div key={user.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.points}</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {user.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 p-6 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Statistik utama</p>
              <p className="text-sm text-slate-400">Ringkasan performa ekologi Anda</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Sampah terdeteksi</p>
              <p className="mt-2 text-2xl font-semibold text-white">1.284</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-400">Emisi terkurangi</p>
              <p className="mt-2 text-2xl font-semibold text-white">8.2 ton</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-slate-950/70 to-slate-900/80 p-6 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Integrasi Open API DLH Kota Makassar
            </div>
            <h2 className="text-xl font-semibold text-white">Sinkronisasi data pengelolaan sampah secara real-time</h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Data operasional dipantau dari unit pengolahan terdekat dan disinkronkan ke dashboard pusat DLH.
            </p>
          </div>
          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <div className="flex items-center gap-2 font-semibold">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
              Sinkronisasi Aktif (Real-time)
            </div>
            <p className="mt-2 text-sm text-emerald-200/80">
              Total Data Terkirim ke DLH: 1,034 Ton/Hari (Kecamatan Rappocini & Wajo)
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{card.description}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-300">
                Buka fitur
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
