"use client";

import { EyeOff } from "lucide-react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { usePathname, useSearchParams } from "next/navigation";

export function SanityPreviewExit() {
  const isPresentationTool = useIsPresentationTool();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (isPresentationTool) return null;

  const queryString = searchParams.toString();
  const currentPath = `${pathname}${queryString ? `?${queryString}` : ""}`;
  const exitUrl = `/api/draft-mode/disable?redirect=${encodeURIComponent(currentPath)}`;

  return (
    <div className="z-1000 fixed top-4 left-1/2 flex -translate-x-1/2 items-center gap-3 border-2 border-page-foreground bg-page-background px-4 py-3 text-page-foreground">
      <span className="text-xs font-mono uppercase tracking-normal">Sanity preview enabled</span>
      <a
        className="inline-flex items-center gap-2 bg-page-foreground px-3 py-2 font-mono text-xs uppercase tracking-normal text-page-background transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-page-foreground"
        href={exitUrl}
      >
        <EyeOff aria-hidden="true" size={14} strokeWidth={2.5} />
        Exit preview
      </a>
    </div>
  );
}
