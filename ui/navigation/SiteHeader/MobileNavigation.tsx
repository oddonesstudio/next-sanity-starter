"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/primitives/Accordion/Accordion";
import { Button } from "@/ui/primitives/Button/Button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/ui/primitives/Sheet";

import type { NavigationItem } from ".";

interface MobileNavigationProps {
  items: NavigationItem[];
}

const styles = tv({
  slots: {
    base: "lg:hidden",
    sheet: "w-screen max-w-none!",
    accordionItem: "border-foreground/20",
    accordionTrigger:
      "hover:no-underline data-[state=open]:text-foreground font-medium text-md text-foreground/70 hover:text-foreground",
    linkStyle: "flex items-center w-full py-4 font-medium hover:text-foreground text-foreground/70",
  },
});

export const MobileNavigation = ({ items }: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return;

  const { base, sheet, accordionItem, accordionTrigger, linkStyle } = styles();

  return (
    <div className={base()}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" aria-label="Open navigation">
            <Menu size={5} />
          </Button>
        </SheetTrigger>
        <SheetContent className={sheet()} showCloseButton={false}>
          <Container>
            <div className="flex justify-between h-(--header-height) items-center">
              <Link href="/">LOGO</Link>
              <SheetClose asChild>
                <Button size="icon" variant="ghost" aria-label="Close navigation">
                  <X size={5} />
                </Button>
              </SheetClose>
            </div>
            <Accordion type="single" collapsible defaultValue={items[0].label}>
              {items.map((item) =>
                item.children && item.children.length > 0 ? (
                  <AccordionItem key={item.label} value={item.label} className={accordionItem()}>
                    <AccordionTrigger className={accordionTrigger()}>{item.label}</AccordionTrigger>
                    <AccordionContent>
                      <ul>
                        {item.children.map(
                          (item) =>
                            item.href && (
                              <ListItem key={item.label} title={item.label} href={item.href}>
                                {item.description}
                              </ListItem>
                            ),
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  item.href && (
                    <Link key={item.label} href={item.href} className={linkStyle()}>
                      {item.label}
                    </Link>
                  )
                ),
              )}
            </Accordion>
          </Container>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const listItemStyles = tv({
  slots: {
    base: "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
    titleTextStyle: "text-sm leading-none!",
    descriptionTextStyle: "line-clamp-1 text-sm leading-snug text-muted-foreground",
  },
});

function ListItem({
  className,
  title,
  href,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { title: string }) {
  if (!href) return;

  const { base, titleTextStyle, descriptionTextStyle } = listItemStyles();

  return (
    <li>
      <Link href={href} className={base(className)} {...props}>
        <div className="flex items-center space-x-2 text-foreground">
          <h6 className={titleTextStyle()}>{title}</h6>
        </div>
        <p title={children as string} className={descriptionTextStyle()}>
          {children}
        </p>
      </Link>
    </li>
  );
}
