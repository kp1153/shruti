import Image from "next/image";
import { urlFor } from "@/lib/sanityImageUrl";

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 400,
  className = "",
}) {
  const getImageSrc = () => {
    if (src) {
      try {
        return urlFor(src)
          .width(width)
          .height(height)
          .fit("crop")
          .crop("center")
          .url();
      } catch (error) {
        console.error("Error generating image URL:", error);
        return null;
      }
    }
    return null;
  };

  const imageSrc = getImageSrc();

  if (!imageSrc) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width, height: height }}
      >
        <span className="text-gray-500 text-sm">कोई छवि नहीं</span>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}
