"use client";

import { enableFirstView, getFirstView } from "@/actions/user";
import { DarkMode } from "@/components/theme/dark.mode";
import { LightMode } from "@/components/theme/light-mode";
import { SystemMode } from "@/components/theme/system-mode";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const [firstView, setFirstView] = useState<boolean | undefined>(undefined);
  const [pending, setPending] = useState(false);

  // Load initial toggle state
  useEffect(() => {
    if (firstView !== undefined) return;
    const load = async () => {
      const response = await getFirstView();
      if (response?.status === 200) setFirstView(!!response.data);
      else setFirstView(false);
    };
    load();
  }, [firstView]);

  const switchState = async (checked: boolean) => {
    setPending(true);
    try {
      const res = await enableFirstView(checked);
      if (res) {
        toast(res.status === 200 ? "Success" : "Failed", {
          description: String(res.data ?? ""),
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative">
      {/* subtle page glow */}
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10">
        <div className="h-full w-full bg-[radial-gradient(75%_60%_at_50%_-10%,rgba(99,102,241,0.18),rgba(14,14,20,0))]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        {/* Theme section card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-6 backdrop-blur-xl text-white shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Appearance</h2>
              <p className="text-sm text-white/60">
                Choose how VidSphere looks on your device.
              </p>
            </div>

            <div
              className={cn(
                "hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 md:flex",
              )}
            >
              <CheckCircle2 className="h-4 w-4 text-white/80" />
              <span>
                Current:{" "}
                <span className="text-white/90 capitalize">
                  {theme ?? "system"}
                </span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* System */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={cn(
                "group relative rounded-2xl border p-2 transition",
                "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                theme === "system" && "ring-2 ring-indigo-400/60"
              )}
              aria-label="Use system theme"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-xl border",
                  "border-white/10 bg-black/30"
                )}
              >
                <SystemMode />
              </div>
              <div className="mt-2 text-center text-sm text-white/80">System</div>
            </button>

            {/* Light */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "group relative rounded-2xl border p-2 transition",
                "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                theme === "light" && "ring-2 ring-indigo-400/60"
              )}
              aria-label="Use light theme"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-xl border",
                  "border-white/10 bg-black/30"
                )}
              >
                <LightMode />
              </div>
              <div className="mt-2 text-center text-sm text-white/80">Light</div>
            </button>

            {/* Dark */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "group relative rounded-2xl border p-2 transition",
                "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]",
                theme === "dark" && "ring-2 ring-indigo-400/60"
              )}
              aria-label="Use dark theme"
            >
              <div
                className={cn(
                  "overflow-hidden rounded-xl border",
                  "border-white/10 bg-black/30"
                )}
              >
                <DarkMode />
              </div>
              <div className="mt-2 text-center text-sm text-white/80">Dark</div>
            </button>
          </div>
        </div>

        {/* Video sharing settings card */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:p-6 backdrop-blur-xl text-white shadow-2xl">
          <h2 className="text-xl font-semibold tracking-tight">Video Sharing</h2>
          <p className="mt-1 text-sm text-white/60">
            Get notified when someone watches your video for the first time —
            useful for client outreach and follow-ups.
          </p>

          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <Label htmlFor="first-view" className="text-md flex items-center gap-2">
              Enable First View
            </Label>

            <div className="flex items-center gap-3">
              <span className="text-xs text-white/50">
                {firstView === undefined
                  ? "Loading…"
                  : firstView
                  ? "On"
                  : "Off"}
              </span>
              <Switch
                id="first-view"
                disabled={firstView === undefined || pending}
                checked={!!firstView}
                onCheckedChange={(checked) => {
                  setFirstView(checked);
                  switchState(checked);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
