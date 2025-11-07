// src/components/global/sidebar/workspace-placeholder.tsx
import React from "react";

type Props = { children: React.ReactNode };

const WorkspacePlaceholder = ({ children }: Props) => {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.12] text-sm font-bold text-white/90 ring-1 ring-white/10">
      {children}
    </span>
  );
};

export default WorkspacePlaceholder;
