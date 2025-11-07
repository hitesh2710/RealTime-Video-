// app/dashboard/[workspaceId]/layout.tsx
import React from "react";
import { redirect } from "next/navigation";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { onAuthenticateUser, getNotifications } from "@/actions/user";
import { getWorkSpaces, verifyAccessToWorkspace } from "@/actions/workspace";

import Sidebar from "@/components/global/sidebar";
import GlobalHeader from "@/components/global/global-header";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

export default async function Layout({ params: { workspaceId }, children }: Props) {
  // --- Auth / Access ---
  const auth = await onAuthenticateUser();
  if (!auth?.user?.workspace || auth.user.workspace.length === 0) {
    redirect("/auth/sign-in");
  }

  const access = await verifyAccessToWorkspace(workspaceId);
  if (access.status !== 200) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  const workspace = access.data?.workspace;
  if (!workspace) {
    redirect(`/dashboard/${auth.user.workspace[0].id}`);
  }

  // --- Prefetch ---
  const qc = new QueryClient();
  await qc.prefetchQuery({ queryKey: ["user-workspaces"], queryFn: () => getWorkSpaces() });
  await qc.prefetchQuery({ queryKey: ["user-notifications"], queryFn: () => getNotifications() });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Left rail */}
        <Sidebar activeWorkspaceId={workspaceId} />

        {/* Main column */}
        <div className="flex pt-20   min-w-0 flex-1 flex-col bg-[#171717]">
          {/* Sticky topbar (occupies layout height) */}
          <header className="sticky top-0 z-30 h-16 border-b border-white/10 bg-black/40 backdrop-blur-md">
            <div className="mx-6 flex h-full items-center">
              <GlobalHeader workspace={workspace} />
            </div>
          </header>

          {/* Scrollable content */}
          <main className="flex-1 overflow-y-auto">
            <div className="mx-6 my-4">{children}</div>
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}
