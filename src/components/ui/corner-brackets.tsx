import { cn } from "@/lib/utils";

/**
 * Four 7×7px corner bracket marks framing a link's corners.
 * On parent `group` hover each bracket shifts outward by 0.5px and
 * opacity goes 0.3 → 1.0 over 300ms. Parent needs `relative` + `group`.
 */
export function CornerBrackets({ className }: { className?: string }) {
  const base =
    "absolute h-[7px] w-[7px] border-current opacity-30 transition-all duration-300 group-hover:opacity-100";
  return (
    <span aria-hidden className={cn("pointer-events-none absolute inset-0", className)}>
      <span className={cn(base, "left-0 top-0 border-l border-t group-hover:-translate-x-[0.5px] group-hover:-translate-y-[0.5px]")} />
      <span className={cn(base, "right-0 top-0 border-r border-t group-hover:translate-x-[0.5px] group-hover:-translate-y-[0.5px]")} />
      <span className={cn(base, "bottom-0 left-0 border-b border-l group-hover:-translate-x-[0.5px] group-hover:translate-y-[0.5px]")} />
      <span className={cn(base, "bottom-0 right-0 border-b border-r group-hover:translate-x-[0.5px] group-hover:translate-y-[0.5px]")} />
    </span>
  );
}
