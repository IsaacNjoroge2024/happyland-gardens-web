"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { HiPhoto } from "react-icons/hi2";

interface ImageWrapperProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const objectFitClasses = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  objectFit = "cover",
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100 text-gray-400",
          fill && "absolute inset-0"
        )}
        style={!fill && width && height ? { width, height } : undefined}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        <div className="flex flex-col items-center gap-1 p-4">
          <HiPhoto className="w-10 h-10" aria-hidden="true" />
          <span className="text-xs">Image unavailable</span>
        </div>
      </div>
    );
  }

  const handleError = () => setHasError(true);

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(objectFitClasses[objectFit], className)}
        sizes={sizes || "100vw"}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(objectFitClasses[objectFit], className)}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={handleError}
    />
  );
};

export default ImageWrapper;
