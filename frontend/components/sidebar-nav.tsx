"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gift,
  LayoutDashboard,
  Leaf,
  MapPin,
  ScanLine,
  Wallet,
} from "lucide-react";

const navigationItems = [
  {
    href: "/",
    label: "Dashboard Utama",
    icon: LayoutDashboard,
    description: "Ringkasan dampak global",
  },
  {
    href: "/scanner",
    label: "AI Scanner",
    icon: ScanLine,
    description: "Deteksi sampah dengan kamera",
  },
  {
    href: "/maps",
    label: "Peta Bank Sampah",
    icon: MapPin,
    description: "Rute dan lokasi penjemputan",
  },
  {
    href: "/wallet",
    label: "Waste Wallet",
    icon: Wallet,
    description: "Saldo poin dan transaksi",
  },
  {
    href: "/rewards",
    label: "Tukar Poin",
    icon: Gift,
    description: "Hadiah dari Makassar Creative Hub",
  },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 lg:shrink-0">
      <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4 shadow-[0_20px_80px_rgba(5,150,105,0.18)] backdrop-blur-2xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
        <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.35)]">
            <Leaf className="h-5 w-5 text-slate-950" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Mangkasara</p>
            <p className="text-xs text-emerald-200/80">TrashVision AI</p>
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between rounded-2xl border px-3 py-3 transition-all duration-200 ${
                  isActive
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100 shadow-[0_0_25px_rgba(16,185,129,0.12)]"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/20 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-white/10 text-slate-400 group-hover:text-emerald-300"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{item.label}</span>
                    <span className="block text-xs text-slate-400 group-hover:text-slate-300">
                      {item.description}
                    </span>
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 p-4">
          <p className="text-sm font-semibold text-white">Misi hari ini</p>
          <p className="mt-1 text-sm text-slate-300">
            Kurangi sampah, tingkatkan poin, dan bantu kota lebih hijau.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            24 aksi terpantau
          </div>
        </div>
      </div>
    </aside>
  );
}
