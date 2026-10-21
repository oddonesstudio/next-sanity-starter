export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationItem[];
  description?: string | null;
};
