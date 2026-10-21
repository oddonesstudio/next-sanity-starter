import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section/Section";
import { Button } from "@/ui/primitives/Button/Button";

interface HeroProps {
  headline: string;
  headlineHighlight?: string;
  supportingText?: string;
  image?: {
    src: string;
    alt: string;
  };
  primaryCTA?: {
    label: string;
    href: string;
  };
}

const styles = tv({
  slots: {
    base: "",
    container: "flex flex-col gap-20",
    content:
      "flex flex-col items-center justify-center w-full text-center bg-linear-to-t from-background",
    headlineTextStyle:
      "text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl leading-[1.15]! w-full font-heading",
    headlineHighlightStyle:
      "text-transparent bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-bloc",
    description:
      "mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance whitespace-pre-line",
    actions: "flex items-center justify-center whitespace-nowrap gap-4 z-50",
    actionLink: "flex items-center group",
    actionIcon:
      "ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5",
    imageFrame:
      "-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl w-full",
    imageStyle: "rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border w-full aspect-video",
    imageFade: "absolute -bottom-4 inset-x-0 w-full h-1/2 bg-linear-to-t from-background z-40",
    imageFadeBottom:
      "absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-linear-to-t from-background z-50",
  },
});

export const Hero = ({
  headline,
  headlineHighlight,
  supportingText,
  image,
  primaryCTA,
}: HeroProps) => {
  const {
    base,
    container,
    content,
    headlineTextStyle,
    headlineHighlightStyle,
    description,
    actions,
    actionLink,
    actionIcon,
    imageFrame,
    imageStyle,
    imageFade,
    imageFadeBottom,
  } = styles();

  return (
    <Section anchorId="hero" className={base()}>
      <Container className={container()}>
        <div className={content()}>
          <h1 className={headlineTextStyle()}>
            {headline}{" "}
            {headlineHighlight && (
              <span className={headlineHighlightStyle()}>{headlineHighlight}</span>
            )}
          </h1>
          {supportingText && <p className={description()}>{supportingText}</p>}
          {primaryCTA && (
            <div className={actions()}>
              <Button asChild>
                <Link href={primaryCTA.href} className={actionLink()}>
                  {primaryCTA.label}
                  <ArrowRightIcon className={actionIcon()} />
                </Link>
              </Button>
            </div>
          )}
        </div>
        {image && (
          <div className={imageFrame()}>
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={630}
              quality={100}
              className={imageStyle()}
              loading="eager"
            />
            <div className={imageFade()} />
            <div className={imageFadeBottom()} />
          </div>
        )}
      </Container>
    </Section>
  );
};
