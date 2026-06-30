"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Clock3, Leaf, MapPinned, Route, Sparkles, Truck, Waves } from "lucide-react";

type FacilityType = "BSU" | "TEBA";

type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  category: string;
  district: string;
  address: string;
  status: "Aktif" | "Siap" | "Padat";
  capacity: string;
  acceptedWaste: string[];
  etaMinutes: number;
  position: { x: number; y: number };
  summary: string;
};

const facilities: Facility[] = [
  {
    id: "bsu-melati",
    name: "BSU Melati Rappocini",
    type: "BSU",
    category: "Anorganik",
    district: "Rappocini",
    address: "Jl. Melati Raya No. 12, Rappocini",
    status: "Aktif",
    capacity: "78% kapasitas",
    acceptedWaste: ["Plastik", "Kertas", "Kaleng", "Kaca"],
    etaMinutes: 9,
    position: { x: 62, y: 34 },
    summary: "Pusat pengumpulan sampah anorganik dengan sistem sortir cepat dan ruang muat terbatas.",
  },
  {
    id: "teba-wajo",
    name: "TEBA Wajo",
    type: "TEBA",
    category: "Organik",
    district: "Wajo",
    address: "Jl. Andi Djemma No. 7, Kecamatan Wajo",
    status: "Siap",
    capacity: "64% kapasitas",
    acceptedWaste: ["Organik", "Kompos", "Sisa makanan", "Dedaunan"],
    etaMinutes: 7,
    position: { x: 44, y: 72 },
    summary: "Ekosistem pengolahan sampah organik yang mengolah material menjadi kompos dan pupuk cair.",
  },
  {
    id: "pusat-daur-ulang-antang",
    name: "Pusat Daur Ulang Antang",
    type: "BSU",
    category: "Daur Ulang",
    district: "Antang",
    address: "Jl. Antang Raya No. 44, Antang",
    status: "Aktif",
    capacity: "81% kapasitas",
    acceptedWaste: ["Plastik", "Logam", "Kaca", "Elektronik"],
    etaMinutes: 12,
    position: { x: 28, y: 60 },
    summary: "Sentra daur ulang multifungsi dengan kapasitas tinggi dan alur distribusi ke fasilitas downstream.",
  },
];

function getNextArrivalTime(now: Date) {
  const targetHour = 20;
  const targetMinute = 0;
  const targetSecond = 0;

  const todayAtTarget = new Date(now);
  todayAtTarget.setHours(targetHour, targetMinute, targetSecond, 0);

  if (now.getHours() >= targetHour) {
    todayAtTarget.setDate(todayAtTarget.getDate() + 1);
  }

  return todayAtTarget;
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export default function MapsPage() {
  const [activeFacility, setActiveFacility] = useState<Facility>(facilities[0]);
  const [now, setNow] = useState(new Date());
  const [nextArrival, setNextArrival] = useState(() => getNextArrivalTime(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      const current = new Date();
      setNow(current);
      if (current.getHours() >= 20) {
        setNextArrival(getNextArrivalTime(current));
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const routePoints = useMemo(() => {
    const from = { x: 18, y: 86 };
    const to = activeFacility.position;
    return `M ${from.x} ${from.y} C ${from.x + 12} ${from.y - 10}, ${to.x - 10} ${to.y + 4}, ${to.x} ${to.y}`;
  }, [activeFacility]);

  const countdown = nextArrival.getTime() - now.getTime();
  const isOperationalWindow = now.getHours() >= 20 && now.getHours() < 24;
  const statusBadge = isOperationalWindow ? "Armada Sedang Beroperasi" : "Menunggu Waktu Operasional";

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-emerald-950/70 p-6 shadow-[0_20px_80px_rgba(5,150,105,0.16)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Preview geospasial simulasi kota Makassar
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Rute logistik dan pengangkutan sampah terpilah</h1>
            <p className="mt-3 text-base leading-7 text-slate-300">
              Jelajahi jalur operasional antara Kecamatan Wajo dan Rappocini dengan visualisasi fasilitas, kapasitas, dan jadwal pengangkutan yang disimulasikan.
            </p>
          </div>
          <div className="rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <div className="flex items-center gap-2 font-semibold">
              <BadgeCheck className="h-4 w-4" />
              Mode simulasi aktif
            </div>
            <p className="mt-2 text-xs text-emerald-200/80">Tanpa backend PostGIS, semua data dibuat sebagai preview interaktif.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-2xl sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Peta operasi wilayah</p>
              <p className="text-sm text-slate-400">Kecamatan Wajo dan Rappocini · visualisasi routing mock</p>
            </div>
            <div className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-300">
              {activeFacility.district}
            </div>
          </div>

          <div className="relative h-[430px] overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_35%),linear-gradient(125deg,_#07120f_0%,_#0f1f1b_60%,_#12261b_100%)]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(255,255,255,0.04)_1px,_transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:30px_30px]" />
            <div className="absolute left-[10%] top-[18%] h-[32%] w-[38%] rounded-[32px] border border-emerald-400/20 bg-emerald-500/10" />
            <div className="absolute right-[12%] top-[16%] h-[28%] w-[34%] rounded-[36px] border border-sky-400/20 bg-sky-500/10" />
            <div className="absolute left-[18%] top-[58%] h-[24%] w-[52%] rounded-[40px] border border-amber-400/20 bg-amber-500/10" />
            <div className="absolute left-[12%] top-[15%] h-[20%] w-[24%] rounded-full border border-white/10 bg-white/5" />
            <div className="absolute left-[58%] top-[25%] h-[30%] w-[14%] rounded-full border border-white/10 bg-white/5" />

            <div className="absolute left-[10%] top-[48%] h-[6px] w-[72%] rounded-full bg-white/15" />
            <div className="absolute left-[24%] top-[24%] h-[54%] w-[6px] rounded-full bg-white/15" />
            <div className="absolute left-[62%] top-[15%] h-[70%] w-[6px] rounded-full bg-white/15" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d={routePoints} fill="none" stroke="#34d399" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" className="animate-pulse" />
            </svg>

            <div className="absolute left-[18%] top-[86%] h-12 w-12 rounded-full border border-white/15 bg-slate-900/80 p-2">
              <Truck className="h-8 w-8 text-emerald-300" />
            </div>

            {facilities.map((facility) => {
              const isActive = facility.id === activeFacility.id;
              return (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => setActiveFacility(facility)}
                  className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-lg transition-all ${
                    isActive
                      ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-100"
                      : "border-white/10 bg-slate-950/80 text-slate-200 hover:border-emerald-400/30"
                  }`}
                  style={{ left: `${facility.position.x}%`, top: `${facility.position.y}%` }}
                >
                  {facility.type === "BSU" ? <RecycleIcon /> : <Leaf className="h-3.5 w-3.5" />}
                  {facility.name}
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-300 backdrop-blur-xl">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Route className="h-4 w-4 text-emerald-300" />
                Jalur simulasi aktif
              </div>
              <p className="mt-1 text-xs text-slate-400">Rute pengangkutan menuju {activeFacility.name}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl">
            <div className="mb-4 flex items-center gap-2 text-white">
              <MapPinned className="h-5 w-5 text-emerald-300" />
              Fasilitas terdekat
            </div>
            <div className="space-y-3">
              {facilities.map((facility) => {
                const active = facility.id === activeFacility.id;
                return (
                  <button
                    key={facility.id}
                    type="button"
                    onClick={() => setActiveFacility(facility)}
                    className={`w-full rounded-[20px] border p-4 text-left transition-all ${active ? "border-emerald-400/30 bg-emerald-500/10" : "border-white/10 bg-white/5 hover:border-emerald-400/20"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{facility.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{facility.district} · {facility.type}</p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-slate-300">
                        {facility.etaMinutes} min
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl">
            <div className="flex items-center gap-2 text-white">
              <Waves className="h-5 w-5 text-sky-300" />
              Detail fasilitas
            </div>
            <div className="mt-4 rounded-[22px] border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-white">{activeFacility.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{activeFacility.summary}</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-xs font-semibold ${activeFacility.status === "Aktif" ? "bg-emerald-500/10 text-emerald-300" : activeFacility.status === "Siap" ? "bg-sky-500/10 text-sky-300" : "bg-amber-500/10 text-amber-300"}`}>
                  {activeFacility.status}
                </div>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Kategori utama</p>
                  <p className="mt-1 font-medium text-white">{activeFacility.category}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Alamat</p>
                  <p className="mt-1 font-medium text-white">{activeFacility.address}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Kapasitas saat ini</p>
                  <p className="mt-1 font-medium text-white">{activeFacility.capacity}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Kluster sampah diterima</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeFacility.acceptedWaste.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-slate-950/70 to-slate-900/80 p-5 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-emerald-200">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Jadwal Sinkronisasi Armada Truk Sampah Kecamatan</p>
              <p className="mt-1 text-sm text-slate-300">Operasional intensif pada rentang 20.00 - 24.00 WITA dengan penjadwalan berulang setiap jam.</p>
            </div>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/75 px-5 py-4 text-right">
            <div className="flex items-center justify-end gap-2 text-sm font-semibold text-white">
              <Truck className="h-4 w-4 text-emerald-300" />
              {statusBadge}
            </div>
            <p className="mt-2 text-4xl font-semibold tracking-[0.2em] text-emerald-300">{formatCountdown(countdown)}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">hitungan mundur ke kedatangan truk berikutnya</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function RecycleIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 p-0.5">
      <ArrowRight className="h-3 w-3" />
    </div>
  );
}
