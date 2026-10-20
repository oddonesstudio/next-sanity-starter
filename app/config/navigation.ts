import type { NavigationItem } from "@/ui/navigation/SiteHeader";

export const navigationItems: NavigationItem[] = [
  {
    label: "Item 1",
    children: [
      { label: "Sub Item 1", href: "/item-1/sub-item-1", description: "Sub Item 1 description" },
      { label: "Sub Item 2", href: "/item-1/sub-item-2", description: "Sub Item 2 description" },
      { label: "Sub Item 3", href: "/item-1/sub-item-3", description: "Sub Item 3 description" },
    ],
  },
  {
    label: "Item 2",
    children: [
      { label: "Sub Item 1", href: "/item-2/sub-item-1", description: "Sub Item 1 description" },
      { label: "Sub Item 2", href: "/item-2/sub-item-2", description: "Sub Item 2 description" },
      { label: "Sub Item 3", href: "/item-2/sub-item-3", description: "Sub Item 3 description" },
      { label: "Sub Item 4", href: "/item-2/sub-item-4", description: "Sub Item 4 description" },
      { label: "Sub Item 5", href: "/item-2/sub-item-5", description: "Sub Item 5 description" },
      { label: "Sub Item 6", href: "/item-2/sub-item-6", description: "Sub Item 6 description" },
    ],
  },
  { label: "Item 3", href: "/item-3" },
];
