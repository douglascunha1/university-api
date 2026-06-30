import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type ShellProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

export function Shell({ sidebar, children }: ShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(219,234,254,0.6),_transparent_26%),radial-gradient(circle_at_top_right,_rgba(224,242,231,0.45),_transparent_24%),linear-gradient(180deg,_#f8fbff_0%,_#f7f6f2_100%)] text-slate-800">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 p-4 md:p-6">
        <aside className="hidden w-[290px] shrink-0 md:block">{sidebar}</aside>
        <main className={cn("min-w-0 flex-1")}>{children}</main>
      </div>
    </div>
  );
}