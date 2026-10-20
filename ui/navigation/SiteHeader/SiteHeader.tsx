"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";

import type { NavigationItem } from ".";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";

interface SiteHeaderProps {
  className?: string;
  items: NavigationItem[];
}

const styles = tv({
  slots: {
    base: "fixed h-(--header-height) w-full bg-background z-20",
    container: "flex justify-between h-full items-center",
  },
});

export const SiteHeader = ({ className, items }: SiteHeaderProps) => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  const handleMouseEnter = () => {
    setHidden(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous === undefined) return;

    if (latest > previous && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const headerVariants = {
    visible: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hidden: { y: "-100%", transition: { duration: 0.4, ease: "easeIn" } },
  } as const;

  const { base, container } = styles();

  return (
    <motion.header
      className={base({ className })}
      animate={hidden ? "hidden" : "visible"}
      variants={headerVariants}
    >
      <Container className={container()}>
        <Link onMouseEnter={handleMouseEnter} href="/">
          LOGO
        </Link>
        <DesktopNavigation items={items} />
        <MobileNavigation items={items} />
      </Container>
    </motion.header>
  );
};
