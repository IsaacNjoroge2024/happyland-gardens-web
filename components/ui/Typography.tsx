import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function H1({ children, className, as: Component = "h1" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl font-heading",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function H2({ children, className, as: Component = "h2" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl font-heading",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function H3({ children, className, as: Component = "h3" }: TypographyProps) {
  return (
    <Component
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl font-heading",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function H4({ children, className, as: Component = "h4" }: TypographyProps) {
  return (
    <Component
      className={cn("scroll-m-20 text-xl font-semibold tracking-tight font-heading", className)}
    >
      {children}
    </Component>
  );
}

export function BodyText({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}>{children}</p>;
}

export function Lead({ children, className }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
}

export function Caption({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function Quote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn("mt-6 border-l-4 border-primary-500 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}
