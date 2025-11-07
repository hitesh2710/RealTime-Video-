// src/components/global/sidebar/sidebar-item.tsx
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  icon: React.ReactNode;
  title: string;
  href: string;
  selected: boolean;
  notifications?: number;
};

const SidebarItem = ({ href, icon, selected, title, notifications = 0 }: Props) => {
  const showBadge = notifications > 0;

  return (
    <li className="my-1.5 cursor-pointer">
      <Link
        href={href}
        aria-current={selected ? "page" : undefined}
        className={cn(
          "group flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors",
          selected ? "bg-white/[0.08]" : "hover:bg-white/[0.06]"
        )}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span
            className={cn(
              "w-32 truncate font-medium transition-colors",
              selected ? "text-[#E6E6E6]" : "text-[#9A9A9A] group-hover:text-[#CFCFCF]"
            )}
          >
            {title}
          </span>
        </div>

        {showBadge && (
          <span
            className={cn(
              "mr-1 inline-flex min-w-[20px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-semibold",
              selected ? "bg-white text-black" : "bg-white/10 text-white/80"
            )}
          >
            {notifications}
          </span>
        )}
      </Link>
    </li>
  );
};

export default SidebarItem;
