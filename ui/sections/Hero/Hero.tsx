import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { tv } from "tailwind-variants";

import { Container } from "@/ui/layout/Container";
import { Section } from "@/ui/layout/Section/Section";
import { Button } from "@/ui/primitives/Button/Button";

const styles = tv({
  slots: {
    base: "",
    container: "flex flex-col gap-20",
    content:
      "flex flex-col items-center justify-center w-full text-center bg-linear-to-t from-background",
    label:
      "group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200",
    labelSpark:
      "spark mask-gradient absolute inset-0 h-full w-full animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:-rotate-90 before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:inset-[0_auto_auto_50%] before:[translate:-50%_-15%]",
    labelBackdrop:
      "backdrop absolute inset-px rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900",
    labelGlow: "h-full w-full blur-md absolute bottom-0 inset-x-0 bg-linear-to-tr from-primary/20",
    labelContent: "z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1",
    labelIcon:
      "ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5",
    title:
      "text-foreground text-center py-6 text-5xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl leading-[1.15]! w-full font-heading",
    titleAccent:
      "text-transparent bg-linear-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-bloc",
    description: "mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance",
    desktopLineBreak: "hidden md:block",
    actions: "flex items-center justify-center whitespace-nowrap gap-4 z-50",
    actionLink: "flex items-center",
    actionIcon: "w-4 h-4 ml-2",
    imageFrame:
      "-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl w-full",
    image: "rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border w-full aspect-video",
    imageFade: "absolute -bottom-4 inset-x-0 w-full h-1/2 bg-linear-to-t from-background z-40",
    imageFadeBottom:
      "absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-linear-to-t from-background z-50",
  },
});

export const Hero = () => {
  const {
    base,
    container,
    content,
    label,
    labelSpark,
    labelBackdrop,
    labelGlow,
    labelContent,
    labelIcon,
    title,
    titleAccent,
    description,
    desktopLineBreak,
    actions,
    actionLink,
    actionIcon,
    imageFrame,
    image,
    imageFade,
    imageFadeBottom,
  } = styles();

  return (
    <Section anchorId="hero" className={base()}>
      <Container className={container()}>
        <div className={content()}>
          <button type="button" className={label()}>
            <span>
              <span className={labelSpark()} />
            </span>
            <span className={labelBackdrop()} />
            <span className={labelGlow()} />
            <span className={labelContent()}>
              ✨ Label
              <ArrowRightIcon className={labelIcon()} />
            </span>
          </button>
          <h1 className={title()}>
            Hero Title with <span className={titleAccent()}>Style</span>
          </h1>
          <p className={description()}>
            Lorem ipsum dolor sit amet consectetur adipiscing elit.
            <br className={desktopLineBreak()} />
            <span className={desktopLineBreak()}>Ea ut consequat aute ea ex sed vel.</span>
          </p>
          <div className={actions()}>
            <Button asChild>
              <Link href={""} className={actionLink()}>
                Button
                <ArrowRightIcon className={actionIcon()} />
              </Link>
            </Button>
          </div>
        </div>
        <div className={imageFrame()}>
          <Image
            src="/hero-image.jpg"
            alt="Default Hero image"
            width={1200}
            height={630}
            quality={100}
            className={image()}
            loading="eager"
          />
          <div className={imageFade()} />
          <div className={imageFadeBottom()} />
        </div>
      </Container>
    </Section>
  );
};
