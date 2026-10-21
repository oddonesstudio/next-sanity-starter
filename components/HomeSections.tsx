import { urlFor } from "@/lib/sanity/image";
import type { HOME_PAGE_QUERY_RESULT } from "@/lib/sanity/sanity.types";

import { Hero } from "@/ui/sections/Hero";

interface HomeSectionsProps {
  sections: NonNullable<NonNullable<HOME_PAGE_QUERY_RESULT>["sections"]>;
}

export const HomeContentSections = ({ sections }: HomeSectionsProps) => {
  if (sections.length === 0) {
    return (
      <section className="mx-auto flex min-h-[50vh] max-w-4xl items-center justify-center px-6 py-20 text-center sm:px-10 lg:px-16">
        <p>
          No home page sections are published yet. Add content to the `homePage` singleton in
          Sanity.
        </p>
      </section>
    );
  }

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "hero": {
            const image = section.image;
            const heroImage = image?.asset
              ? {
                  src: urlFor(image).width(1200).height(630).url(),
                  alt: image.alt ?? "",
                }
              : undefined;

            return (
              <Hero
                key={section._id}
                headline={section.headline}
                headlineHighlight={section.headlineHighlight ?? undefined}
                supportingText={section.supportingText ?? undefined}
                image={heroImage}
                primaryCTA={
                  section.primaryCTA?.label && section.primaryCTA.href
                    ? {
                        label: section.primaryCTA.label,
                        href: section.primaryCTA.href,
                      }
                    : undefined
                }
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
};
