import { HomeContentSections } from "@/components/HomeSections";
import { getHomePage } from "@/lib/sanity/data";

export default async function Home() {
  const homePage = await getHomePage();

  return (
    <main className="bg-background text-foreground flex flex-col pt-(--header-height) min-h-screen">
      <HomeContentSections sections={homePage?.sections || []} />
    </main>
  );
}
