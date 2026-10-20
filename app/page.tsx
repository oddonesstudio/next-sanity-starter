import { Hero } from "@/ui/sections/Hero";

export default async function Home() {
  return (
    <main className="bg-background text-foreground flex flex-col pt-(--header-height) min-h-screen">
      <Hero />
    </main>
  );
}
