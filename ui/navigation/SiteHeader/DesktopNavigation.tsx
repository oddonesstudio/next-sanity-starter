import Link from "next/link";
import { tv } from "tailwind-variants";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/ui/primitives/NavigationMenu/NavigationMenu";

import { ThemeToggle } from "../ThemeToggle";
import type { NavigationItem } from ".";

interface DesktopNavigationProps {
  items: NavigationItem[];
}

const styles = tv({
  slots: {
    base: "max-lg:hidden flex gap-10",
    navigationMenuContent: "left-auto right-0",
    menu: "",
  },
  variants: {
    layout: {
      list: {
        menu: "w-96",
      },
      grid: {
        menu: "grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150",
      },
    },
  },
  defaultVariants: {
    layout: "list",
  },
});

export const DesktopNavigation = ({ items }: DesktopNavigationProps) => {
  if (!items || items.length === 0) return;

  const { base, navigationMenuContent, menu } = styles();

  return (
    <div className={base()}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items.map((item) => (
            <NavigationMenuItem key={item.label}>
              {item.children && item.children.length > 0 ? (
                <>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent className={navigationMenuContent()}>
                    <ul
                      className={menu({
                        layout: item.children.length > 4 ? "grid" : "list",
                      })}
                    >
                      {item.children.map(
                        (item) =>
                          item.href && (
                            <ListItem key={item.label} title={item.label} href={item.href}>
                              {item.description}
                            </ListItem>
                          ),
                      )}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                item.href && (
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                )
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
    </div>
  );
};

const listItemStyles = tv({
  slots: {
    base: "",
    linkStyle: "flex flex-col gap-1",
    linkTextStyle: "text-sm leading-none font-medium",
    descriptionTextStyle: "line-clamp-2 text-muted-foreground",
  },
});

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  const { base, linkStyle, linkTextStyle, descriptionTextStyle } = listItemStyles();

  return (
    <li {...props} className={base({ className: props.className })}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className={linkStyle()}>
            <div className={linkTextStyle()}>{title}</div>
            <div className={descriptionTextStyle()}>{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
