"use client";

import { useMemo, useState } from "react";
import { BadgeCheck, Banknote, Leaf, Sparkles, TrendingUp, Wallet } from "lucide-react";

type Transaction = {
  id: number;
  title: string;
  amount: string;
  time: string;
  badge: string;
};

const transactions: Transaction[] = [
  { id: 1, title: "Tukar Kardus Bekas di BSU - +Rp 15.000", amount: "+Rp 15.000", time: "10 menit lalu", badge: "Sukses" },
  { id: 2, title: "Tukar Poin ke Voucher MCH - 250 PTS", amount: "-250 PTS", time: "2 jam lalu", badge: "Terklaim" },
  { id: 3, title: "Penimbangan Kaca di TEBA Wajo - +Rp 28.000", amount: "+Rp 28.000", time: "Hari ini", badge: "Sukses" },
];

export default function WalletPage() {
  const [balance, setBalance] = useState(145000);
  const [points, setPoints] = useState(1250);
  const [showSuccess, setShowSuccess] = useState(false);

  const progress = useMemo(() => Math.min(100, Math.round((points / 2500) * 100)), [points]);

  const handleCashout = () => {
    setBalance((prev) => prev + 25000);
    setShowSuccess(true);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-emerald-950/70 p-6 shadow-[0_20px_80px_rgba(5,150,105,0.16)] backdrop-blur-2xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Dompet sampah digital Anda
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Dompet Sampah Digital</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Pantau saldo digital, poin kebersihan, dan riwayat penukaran dari satu dashboard premium.
            </p>
          </div>
          <button
            onClick={handleCashout}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition-all hover:bg-emerald-500/20"
          >
            <Banknote className="h-4 w-4" />
            Cairkan Dana
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl">
          <div className="rounded-[24px] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/15 via-slate-900/80 to-slate-900/70 p-5">
            <div className="rounded-[22px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_12px_40px_rgba(5,150,105,0.18)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-200">Halo, Aulia</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Rp {balance.toLocaleString("id-ID")}</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-emerald-200">
                  <Wallet className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Total Ewako Points</p>
                  <p className="mt-1 text-2xl font-semibold text-white">{points.toLocaleString("id-ID")} PTS</p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  <BadgeCheck className="mr-1 inline h-3.5 w-3.5" />
                  Premium Tier
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
                <span>Makassar Waste Card</span>
                <span>•••• 4821</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <TrendingUp className="h-4 w-4 text-emerald-300" />
                Total Sampah Terpilah
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">142.8 kg</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-900">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
              </div>
              <p className="mt-2 text-xs text-slate-400">Target bulanan 180 kg · 78% tercapai</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Leaf className="h-4 w-4 text-sky-300" />
                Offset Karbon
              </div>
              <p className="mt-3 text-2xl font-semibold text-white">1.24 ton CO₂</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-900">
                <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-sky-500 to-cyan-400" />
              </div>
              <p className="mt-2 text-xs text-slate-400">Kontribusi lingkungan aktif</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Riwayat transaksi</p>
              <p className="text-sm text-slate-400">Aktivitas penukaran terbaru Anda</p>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              Live sync
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {transactions.map((item) => (
              <div key={item.id} className="rounded-[20px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-300">{item.amount}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.badge}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl">
          <div className="w-full max-w-md rounded-[28px] border border-emerald-400/30 bg-slate-900/95 p-6 text-center shadow-[0_20px_80px_rgba(5,150,105,0.25)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
              <BadgeCheck className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">Dana berhasil dikirim</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Penarikan senilai Rp 25.000 telah berhasil diteruskan ke rekening dompet sampah digital Anda.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
