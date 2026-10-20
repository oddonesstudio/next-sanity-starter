import type { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

interface SectionProps extends PropsWithChildren {
  anchorId?: string;
  className?: string;
}

const styles = tv({
  slots: {
    base: "w-full scroll-mt-(--header-height) py-top-bottom",
  },
});

export const Section = ({ anchorId, children, className }: SectionProps) => {
  const { base } = styles();
  return (
    <section id={anchorId} className={base({ className })}>
      {children}
    </section>
  );
};
