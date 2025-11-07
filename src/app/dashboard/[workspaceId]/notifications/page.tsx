"use client";

import { getNotifications } from "@/actions/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/useQueryData";
import { User } from "lucide-react";

export default function Notifications() {
  const { data: notifications } = useQueryData(
    ["user-notifications"],
    getNotifications
  );

  const { data: notification, status } = notifications as {
    status: number;
    data: {
      notification: {
        id: string;
        userId: string | null;
        content: string;
      }[];
    };
  };

  if (status !== 200 || !notification?.notification?.length) {
    return (
      <div className="flex justify-center items-center h-full w-full text-white/60">
        No notifications yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {notification.notification.map((n) => (
        <div
          key={n.id}
          className="
            flex items-center gap-4 rounded-xl
            border border-white/10 bg-white/[0.05]
            backdrop-blur-xl p-4 transition
            hover:bg-white/[0.08] hover:border-white/20
            shadow-sm
          "
        >
          <Avatar className="bg-white/10">
            <AvatarFallback className="bg-white/10 text-white/80">
              <User />
            </AvatarFallback>
          </Avatar>

          <p className="text-white/85">{n.content}</p>
        </div>
      ))}
    </div>
  );
}
