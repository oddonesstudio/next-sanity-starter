import Link from "next/link";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";

import type { NavigationItem } from "../SiteHeader";

interface SiteFooterProps {
  items: NavigationItem[];
}

const styles = tv({
  slots: {
    base: "",
    container:
      "relative pt-16 lg:pt-32 border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]",
    grid: "grid gap-8 xl:grid-cols-3 xl:gap-8 w-full",
    linkGrid: "grid-cols-2 md:grid-cols-4 gap-8 grid mt-16 xl:col-span-2 xl:mt-0",
    cover: "relative bg-background z-10",
    reveal: "sticky bottom-0 h-80 lg:h-80 hidden md:flex items-center justify-center",
    authorWrapper: "flex flex-col items-start justify-start md:max-w-50",
    mediaWrapper: "flex items-start",
    tagline: "text-foreground mt-4 text-sm text-start",
    author: "mt-4 text-foreground/50 text-sm flex items-center",
    authorLink: "font-semibold ml-1",
    labelStyle: "text-base font-medium",
    subLinks: "mt-4 text-sm text-foreground",
    linkStyle: "mt-2",
    bottom:
      "mt-8 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full",
    copyrightStyle: "text-sm text-foreground mt-8 md:mt-0",
  },
});

export const SiteFooter = ({ items }: SiteFooterProps) => {
  const {
    base,
    container,
    grid,
    cover,
    bottom,
    authorWrapper,
    mediaWrapper,
    tagline,
    author,
    authorLink,
    linkGrid,
    labelStyle,
    subLinks,
    linkStyle,
    copyrightStyle,
    reveal,
  } = styles();
  return (
    <footer className={base()}>
      <Container className={container()}>
        <div className={cover()}>
          <div className={grid()}>
            <div className={authorWrapper()}>
              <div className={mediaWrapper()}>ICON</div>
              <p className={tagline()}>Tagline.</p>
              <span className={author()}>
                Made by{" "}
                <Link href="" className={authorLink()}>
                  Odd Ones Studio
                </Link>
              </span>
            </div>
            <div className={linkGrid()}>
              {items.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link href={item.href}>
                      <h3 className={labelStyle()}>{item.label}</h3>
                    </Link>
                  ) : (
                    <h3 className={labelStyle()}>{item.label}</h3>
                  )}
                  <ul className={subLinks()}>
                    {item.children?.map(
                      (item) =>
                        item.href && (
                          <li key={item.label} className={linkStyle()}>
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={bottom()}>
            <p className={copyrightStyle()}>
              &copy; {new Date().getFullYear()} Odd Ones. All rights reserved.
            </p>
          </div>
        </div>
        <div className={reveal()}>TEXT LOGO</div>
      </Container>
    </footer>
  );
};
