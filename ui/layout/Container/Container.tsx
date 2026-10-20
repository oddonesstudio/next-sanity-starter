import type { PropsWithChildren } from "react";
import { tv } from "tailwind-variants";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const styles = tv({
  slots: {
    base: "mx-auto w-full px-left-right max-w-6xl",
  },
});

export const Container = ({ children, className }: ContainerProps) => {
  const { base } = styles();

  return <div className={base({ className })}>{children}</div>;
};
