import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { getPaymentInfo } from "@/actions/user";

type Props = {};

export default async function BillingPage(_: Props) {
  const payment = await getPaymentInfo();

  // Normalize safely
  const planRaw = payment?.data?.subscription?.plan ?? "FREE";
  const plan = planRaw.toUpperCase() as "PRO" | "FREE";
  const isPro = plan === "PRO";

  const price = isPro ? "$5" : "$0";
  const priceSuffix = "/month";

  const renewalISO =  undefined;
  const cancelAtPeriodEnd = false;

  const renewalText = renewalISO
    ? new Date(renewalISO).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="relative">
      {/* Subtle backdrop to match the app’s look (no hard takeover) */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10">
        <div className="h-full w-full bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.18),rgba(14,14,20,0))]" />
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl text-white shadow-2xl">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Current Plan
            </h2>
            <p className="text-sm text-white/60">Your billing overview</p>
          </div>

          <Badge
            variant="secondary"
            className={`rounded-full ${
              isPro ? "bg-white text-black" : "bg-white/10 text-white"
            }`}
          >
            {isPro ? "Pro" : "Free"}
          </Badge>
        </div>

        {/* Price row */}
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{price}</span>
              <span className="text-sm text-white/70">{priceSuffix}</span>
            </div>

            <p className="text-white/70">
              {isPro
                ? "Unlimited AI transcriptions & summaries, more storage, priority support."
                : "Great for getting started. Limited AI runs and basic storage."}
            </p>

            {/* Tiny feature ticks for visual consistency */}
            <ul className="mt-3 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
              {isPro ? (
                <>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Unlimited AI transcriptions
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Unlimited AI summaries
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    50 GB storage
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Priority support & team features
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Real-time recording & streaming
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    1× AI transcription & summary
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Basic storage (2 GB)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Community support
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* CTA column */}
          <div className="flex min-w-56 flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="space-y-1">
              <div className="text-sm text-white/60">Status</div>
              <div className="text-sm">
                {renewalText ? (
                  <>
                    {cancelAtPeriodEnd ? (
                      <span className="text-amber-300">
                        Cancels on {renewalText}
                      </span>
                    ) : (
                      <span className="text-white/90">
                        Renews on {renewalText}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-white/60">—</span>
                )}
              </div>
            </div>

            {isPro ? (
              <Link href="/dashboard/billing" className="mt-2">
                <Button className="w-full rounded-xl bg-white text-black hover:bg-white/90">
                  Manage billing
                </Button>
              </Link>
            ) : (
              <div className="mt-2 grid gap-2">
                <Link href="/pricing">
                  <Button className="w-full rounded-xl bg-white text-black hover:bg-white/90">
                    Upgrade to Pro
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="secondary"
                    className="w-full rounded-xl bg-white/10 hover:bg-white/20"
                  >
                    See all plans
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium">Payment History</h3>
              <p className="text-sm text-white/60">
                Invoices and receipts will appear here.
              </p>
            </div>

            <Link href="/dashboard/billing">
              <Button
                variant="secondary"
                className="rounded-xl bg-white/10 hover:bg-white/20"
              >
                View invoices
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
