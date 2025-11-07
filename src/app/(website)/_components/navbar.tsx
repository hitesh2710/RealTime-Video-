"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Menu, X, User, ArrowRight, Mail, Phone, MapPin, Play, Pause } from "lucide-react";


const services = [
  { title: "Real-Time Video Recording & Streaming", image: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=1200&q=80" },
  { title: "Workspaces for Team Collaboration", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" },
  { title: "AI Transcriptions for Videos", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80" },
  { title: "AI Video Summary & Titles", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" },
  { title: "Upload Videos to AWS", image: "https://images.unsplash.com/photo-1669865015890-4dbd855de0f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1200" },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    blurb: "Start creating in minutes.",
    features: [
      "Video recording & streaming",
      "Basic storage (2 GB)",
      "1× AI transcription",
      "1× AI summary",
      "Community support",
      "Share Video"
    ],
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$99",
    suffix: "/month",
    blurb: "Unlimited AI power for creators & teams.",
    features: [
      "Everything in Free",
      "Unlimited AI transcriptions",
      "Unlimited AI summaries",
      "Advanced storage (50 GB)",
      "Priority support",
      "Team collaboration",
    ],
    featured: true,
    cta: "Upgrade to Pro",
  },
];

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}


export default function VidSphereLanding() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // carousel autoplay
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => setCurrent((p) => (p + 1) % services.length), 3500);
    return () => clearInterval(id);
  }, [autoplay]);

  const visible = useMemo(() => {
    const arr: typeof services = [] as any;
    for (let i = 0; i < 3; i++) arr.push(services[(current + i) % services.length]);
    return arr;
  }, [current]);

  return (
    <div className="min-h-screen text-white">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.25),rgba(14,14,20,0))]" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/25 via-sky-500/20 to-cyan-400/10 blur-3xl" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0)_30%)]" />

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="#home" className="group flex items-center gap-3">
            <img alt="logo" src="/logo.svg" className="h-9 w-9 transition-transform group-hover:scale-110" />
            <span className="text-lg font-medium tracking-tight md:text-xl">VidSphere</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {[
              { href: "#home", label: "Home" },
              { href: "#features", label: "Features" },
              { href: "#pricing", label: "Pricing" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/70 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
            <Link href="/auth/sign-in">
              <Button className="rounded-xl bg-white text-black shadow-sm transition hover:scale-[1.02] hover:bg-white/90"> <User className="mr-2 h-4 w-4" /> Login</Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen((s) => !s)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
        {open && (
          <div className="border-t border-white/10 bg-black/80 px-4 py-3 md:hidden">
            <div className="flex flex-col gap-4">
              {["#home", "#features", "#pricing", "#contact"].map((href) => (
                <a key={href} href={href} onClick={() => setOpen(false)} className="text-white/90">
                  {href.replace("#", "").toUpperCase()}
                </a>
              ))}
              <Link href="/auth/sign-in" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-xl bg-white text-black"> <User className="mr-2 h-4 w-4" /> Login</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-7xl px-4 pt-16 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-balance text-4xl font-semibold leading-tight md:text-6xl"
            >
              Create ✦ Collaborate ✦ Ship
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-200 bg-clip-text text-transparent">video faster</span>
            </motion.h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Record in real time, transcribe with AI, summarize, and share to workspaces. A delightful UI with serious performance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#pricing"><Button size="lg" className="rounded-xl bg-white text-black shadow-md transition hover:-translate-y-0.5 hover:bg-white/90">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="#features" className="rounded-xl border border-white/15 px-4 py-2 text-white/80 backdrop-blur transition-all hover:border-white/30 hover:text-white">Explore features</Link>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-white/60">
              <div className="flex -space-x-2">
                {["/avatar1.png", "/avatar2.png", "/avatar3.png"].map((src, i) => (
                  <img key={i} src={src} alt="user" className="h-7 w-7 rounded-full border border-white/10" />
                ))}
              </div>
              <span>Trusted by creators and teams worldwide</span>
            </div>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {visible.map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/50 ring-1 ring-white/5 transition hover:ring-white/20"
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-105" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium leading-snug text-white/90">{card.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {services.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 w-6 rounded-full transition-all ${i === current ? "bg-white" : "bg-white/20 hover:bg-white/40"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="secondary" className="rounded-full bg-white/10 hover:bg-white/20" onClick={() => setAutoplay((s) => !s)}>
                    {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full bg-white text-black hover:bg-white/90" onClick={() => setCurrent((p) => (p - 1 + services.length) % services.length)}>
                    Prev
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full bg-white text-black hover:bg-white/90" onClick={() => setCurrent((p) => (p + 1) % services.length)}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature trio */}
      <section id="features" className="mx-auto mt-24 max-w-7xl px-4">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { k: "Latency", v: "Ultra‑low for real‑time" },
            { k: "AI Stack", v: "Transcribe • Summarize • Title" },
            { k: "Teams", v: "Workspaces, roles, invites" },
          ].map((it, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:shadow-xl">
              <div className="text-sm text-white/50">{it.k}</div>
              <div className="mt-1 text-lg font-medium">{it.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto mt-24 max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">Choose your plan</h2>
          <p className="mx-auto mt-2 max-w-2xl text-white/60">Start free. Go Pro when you need unlimited AI and team features.</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:shadow-2xl ${p.featured ? "ring-1 ring-white/20" : ""}`}
            >
              {p.featured && (
                <Badge className="absolute -top-3 right-4 rounded-full bg-white text-black">Most popular</Badge>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <div className="text-4xl font-bold">{p.price}{p.suffix && <span className="ml-1 text-base text-white/70">{p.suffix}</span>}</div>
              </div>
              <p className="mt-2 text-white/70">{p.blurb}</p>
              <ul className="mt-5 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-white/85">
                    <Check className="mt-0.5 h-4 w-4" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button className={`w-full rounded-xl ${p.featured ? "bg-white text-black hover:bg-white/90" : "bg-white/10 hover:bg-white/20"}`}>{p.cta}</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="mx-auto mt-24 max-w-7xl px-4">
        <div className="grid gap-5 md:grid-cols-3">
          {["“The UI is gorgeous and fast.”", "“Transcripts are instant for long calls.”", "“Our team workflows are simpler now.”"].map((q, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-white/80 backdrop-blur-xl">
              {q}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-24 max-w-5xl px-4">
        <h3 className="mb-6 text-center text-2xl font-semibold">Frequently asked questions</h3>
        <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {[{
            q: "Can I use the Free plan for client work?",
            a: "Yes. Free is great for personal or client pilots with limited AI runs.",
          },{
            q: "What’s included in Pro?",
            a: "Unlimited AI transcriptions & summaries, 50 GB storage, teams & priority support.",
          },{
            q: "Can I cancel anytime?",
            a: "Absolutely. Billing stops at the end of the current period.",
          }].map((f, i) => (
            <details key={i} className="group p-5 open:bg-white/[0.02]">
              <summary className="cursor-pointer list-none text-white/90 transition hover:text-white">{f.q}</summary>
              <p className="mt-2 text-white/60">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="mt-24 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <img alt="logo" src="/logo.svg" className="h-9 w-9" />
              <span className="text-xl font-semibold">VidSphere</span>
            </div>
            <p className="max-w-2xl text-white/60">Transform your video content with AI‑powered tools. Record, transcribe, summarize, and ship.</p>
            <div className="flex flex-col items-center gap-4 text-white/80 md:flex-row md:gap-8">
              <a href="mailto:hiteshwarmd@gmail.com" className="flex items-center gap-2 hover:text-white"><Mail className="h-5 w-5" /> hiteshwarmd@gmail.com</a>
              <span className="hidden text-white/20 md:inline">|</span>
              <div className="flex items-center gap-2"><Phone className="h-5 w-5" /> 9310547634</div>
              <span className="hidden text-white/20 md:inline">|</span>
              <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Noida, India</div>
            </div>
            <p className="pt-4 text-sm text-white/40">© {new Date().getFullYear()} VidSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
