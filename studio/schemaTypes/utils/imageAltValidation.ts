type ImageWithAlt = {
  alt?: string;
  asset?: { _ref?: string };
};

export const requireAltTextIfImagePresent = (value: ImageWithAlt | undefined) => {
  if (!value?.asset?._ref) {
    return true;
  }

  return value.alt?.trim() ? true : "Alt text is required when an image is present.";
};
