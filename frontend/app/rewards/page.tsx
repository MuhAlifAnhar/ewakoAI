"use client";

import { useState } from "react";
import { Gift, QrCode, Sparkles, Ticket, Wallet } from "lucide-react";

type RewardItem = {
  id: number;
  title: string;
  description: string;
  points: number;
  emoji: string;
};

const rewardItems: RewardItem[] = [
  { id: 1, title: "Tumbler Ramah Lingkungan", description: "Botol minum premium untuk aktivitas harian", points: 600, emoji: "🥤" },
  { id: 2, title: "Voucher Diskon MCH", description: "Diskon 15% untuk workshop dan program komunitas", points: 450, emoji: "🎟️" },
  { id: 3, title: "Tas Daur Ulang", description: "Tas belanja stylish berbahan daur ulang", points: 350, emoji: "👜" },
];

export default function RewardsPage() {
  const [points, setPoints] = useState(1250);
  const [claimedReward, setClaimedReward] = useState<RewardItem | null>(null);

  const handleClaim = (reward: RewardItem) => {
    if (points < reward.points) return;
    setPoints((prev) => prev - reward.points);
    setClaimedReward(reward);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-900/90 to-amber-950/70 p-6 shadow-[0_20px_80px_rgba(251,191,36,0.14)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-200">
              <Sparkles className="h-4 w-4" />
              Makassar Creative Hub
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">Toko Reward MCH</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Tukarkan poin Anda dengan merchandise eksklusif dari Makassar Creative Hub dan nikmati manfaat komunitas.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <div className="flex items-center gap-2 text-white">
              <Wallet className="h-4 w-4 text-amber-300" />
              Saldo poin saat ini
            </div>
            <p className="mt-2 text-2xl font-semibold text-white">{points} PTS</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rewardItems.map((reward) => {
          const canClaim = points >= reward.points;
          return (
            <div key={reward.id} className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 backdrop-blur-2xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-3xl">
                {reward.emoji}
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{reward.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{reward.description}</p>
              <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2">
                  <Gift className="h-4 w-4 text-amber-300" />
                  {reward.points} PTS
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">MCH</span>
              </div>
              <button
                onClick={() => handleClaim(reward)}
                disabled={!canClaim}
                className={`mt-4 w-full rounded-2xl px-4 py-2 text-sm font-semibold transition-all ${canClaim ? "border border-amber-400/20 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20" : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-500"}`}
              >
                Klaim Reward
              </button>
            </div>
          );
        })}
      </section>

      {claimedReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl">
          <div className="w-full max-w-md rounded-[28px] border border-amber-400/30 bg-slate-900/95 p-6 text-center shadow-[0_20px_80px_rgba(251,191,36,0.2)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-300">
              <QrCode className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-white">Reward berhasil diklaim</h2>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              {claimedReward.title} telah terdaftar untuk penjemputan di MCH Jalan Nusantara.
            </p>
            <div className="mt-5 rounded-[24px] border border-dashed border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">
              <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-2xl border border-amber-400/20 bg-white/10 text-2xl font-semibold">
                QR
              </div>
              <p className="font-semibold">Kode QR simulasi: MCH-{claimedReward.id}-8642</p>
              <p className="mt-1 text-xs uppercase tracking-[0.24em] text-amber-200/80">Tunjukkan QR ini di MCH Jalan Nusantara</p>
            </div>
            <button
              onClick={() => setClaimedReward(null)}
              className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
