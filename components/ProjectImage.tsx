import Image from "next/image";
import type { ImageAsset } from "@/lib/portfolio";

type ProjectImageProps = {
  image: ImageAsset;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function ProjectImage({
  image,
  priority = false,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw"
}: ProjectImageProps) {
  const hasAspectClass = imageClassName.includes("aspect-");

  return (
    <figure className={className}>
      <div
        className={`image-frame ${imageClassName}`}
        style={hasAspectClass ? undefined : { aspectRatio: `${image.width} / ${image.height}` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 flex items-start justify-between gap-4 font-mono text-xs uppercase text-[#7b7a7c]">
        <span>{image.use}</span>
      </figcaption>
    </figure>
  );
}
