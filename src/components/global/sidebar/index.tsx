// src/components/global/sidebar/index.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";

import { getWorkSpaces } from "@/actions/workspace";
import { getNotifications } from "@/actions/user";
import { useQueryData } from "@/hooks/useQueryData";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import WorkspacePlaceholder from "./workspace-placeholder";
import Modal from "../modal";
import Search from "../search";
import GlobalCard from "../global-card";
import PaymentButton from "../payment-button";
import InfoBar from "../info-bar";

import { WORKSPACES } from "@/redux/slices/workspaces";
import type { NotificationProps, WorkspaceProps } from "@/types/index.type";

type Props = { activeWorkspaceId: string };

const Sidebar = ({ activeWorkspaceId }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();

  // data
  const { data: wsData, isFetched, isPending } = useQueryData(["user-workspaces"], getWorkSpaces);
  const { data: notifData } = useQueryData(["user-notifications"], getNotifications);

  // typed narrowing with guards
  const workspacePayload = (wsData as WorkspaceProps | undefined)?.data;
  const notificationPayload = (notifData as NotificationProps | undefined)?.data;

  const allWorkspaces = workspacePayload?.workspace ?? [];
  const memberWorkspaces = workspacePayload?.members ?? [];
  const subscription = workspacePayload?.subscription;

  // current workspace
  const currentWorkspace = useMemo(
    () => allWorkspaces.find((s) => s.id === activeWorkspaceId),
    [allWorkspaces, activeWorkspaceId]
  );

  // menu
  const menuItems = useMemo(() => MENU_ITEMS(activeWorkspaceId), [activeWorkspaceId]);

  // dispatch to store after fetch
  useEffect(() => {
    if (isFetched && workspacePayload?.workspace) {
      dispatch(WORKSPACES({ workspaces: workspacePayload.workspace }));
    }
  }, [isFetched, workspacePayload?.workspace, dispatch]);

  const onChangeActiveWorkspace = (value: string) => router.push(`/dashboard/${value}`);

  // notification count for “Notifications” menu item
  const notifCount =
    notificationPayload?._count?.notification && Number.isFinite(notificationPayload._count.notification)
      ? notificationPayload._count.notification
      : 0;

  // skeleton while loading
  if (isPending) {
    return (
      <div className="hidden h-full w-64 flex-none border-r border-white/10 bg-[#0E0E13] md:block">
        <div className="p-4">
          <div className="flex items-center gap-2 py-4">
            <div className="h-10 w-10 animate-pulse rounded-md bg-white/10" />
            <div className="h-6 w-24 animate-pulse rounded bg-white/10" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-white/10" />
          <div className="mt-6 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-9 animate-pulse rounded bg-white/10" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const SidebarBody = (
    <div className="flex h-full flex-col text-white">
      {/* Brand bar */}
      <div className="flex h-14 items-center gap-2 border-b border-white/10 bg-[#0E0E13]/90 px-4">
        <Image src="/logo.svg" height={28} width={28} alt="logo" />
        <p className="text-base font-semibold tracking-tight">VidSphere</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Workspace switcher */}
        <Select defaultValue={activeWorkspaceId} onValueChange={onChangeActiveWorkspace}>
          <SelectTrigger className="w-full border-white/10 bg-white/[0.02] text-neutral-300 hover:bg-white/[0.04]">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent className="bg-[#111111] text-white backdrop-blur-xl">
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <Separator />
              {allWorkspaces.map((w) => (
                <SelectItem value={w.id} key={w.id}>
                  {w.name}
                </SelectItem>
              ))}
              {memberWorkspaces.length > 0 &&
                memberWorkspaces.map(
                  (m) =>
                    m.WorkSpace && (
                      <SelectItem value={m.WorkSpace.id} key={m.WorkSpace.id}>
                        {m.WorkSpace.name}
                      </SelectItem>
                    )
                )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Invite — only for PUBLIC + Pro */}
        {currentWorkspace?.type === "PUBLIC" && subscription?.plan === "PRO" && (
          <Modal
            trigger={
              <span className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-white/[0.06] px-2 py-[6px] text-xs font-semibold text-neutral-200 transition hover:bg-white/[0.1]">
                <PlusCircle size={16} className="text-neutral-200" />
                Invite To Workspace
              </span>
            }
            title="Invite To Workspace"
            description="Invite other users to your workspace"
          >
            <Search workspaceId={activeWorkspaceId} />
          </Modal>
        )}

        {/* Menu */}
        <p className="mt-5 w-full text-sm font-bold text-[#9D9D9D]">Menu</p>
        <nav className="w-full">
          <ul>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.title}
                href={item.href}
                icon={item.icon}
                title={item.title}
                selected={pathName === item.href}
                notifications={item.title === "Notifications" ? notifCount : 0}
              />
            ))}
          </ul>
        </nav>

        <Separator className="my-4 w-full" />

        {/* Workspaces list */}
        <p className="w-full text-sm font-bold text-[#9D9D9D]">Workspaces</p>

        {allWorkspaces.length === 1 && memberWorkspaces.length === 0 && (
          <div className="mt-1 w-full">
            <p className="text-sm font-medium text-[#3c3c3c]">
              {subscription?.plan === "FREE" ? "Upgrade to create workspaces" : "No Workspaces"}
            </p>
          </div>
        )}

        <nav className="w-full">
          <ul className="fade-layer max-h-40 overflow-auto overflow-x-hidden">
            {allWorkspaces.length > 0 &&
              allWorkspaces.map(
                (item) =>
                  item.type !== "PERSONAL" && (
                    <SidebarItem
                      key={item.id}
                      href={`/dashboard/${item.id}`}
                      selected={pathName === `/dashboard/${item.id}`}
                      title={item.name}
                      notifications={0}
                      icon={<WorkspacePlaceholder>{item.name.charAt(0)}</WorkspacePlaceholder>}
                    />
                  )
              )}
            {memberWorkspaces.length > 0 &&
              memberWorkspaces.map((item) => (
                <SidebarItem
                  key={item.WorkSpace.id}
                  href={`/dashboard/${item.WorkSpace.id}`}
                  selected={pathName === `/dashboard/${item.WorkSpace.id}`}
                  title={item.WorkSpace.name}
                  notifications={0}
                  icon={<WorkspacePlaceholder>{item.WorkSpace.name.charAt(0)}</WorkspacePlaceholder>}
                />
              ))}
          </ul>
        </nav>

        {/* Upgrade card */}
        {subscription?.plan === "FREE" && (
          <>
            <Separator className="my-4 w-full" />
            <GlobalCard
              title="Upgrade to Pro"
              description="Unlock AI features like transcription, AI summary, and more."
              footer={<PaymentButton />}
            />
          </>
        )}
      </div>
    </div>
  );

  // responsive wrapper (sheet on mobile)
  return (
    <div className="text-white">
      <InfoBar />
      {/* Mobile trigger */}
      <div className="fixed left-0 top-0 z-40 my-2 ml-2 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-9 w-9 p-0">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="h-full w-[270px] p-0">
            <div className="h-full">{SidebarBody}</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="relative hidden h-full w-64 flex-none border-r border-white/10 bg-[#0E0E13] md:block">
        {SidebarBody}
      </div>
    </div>
  );
};

export default Sidebar;
