import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    background?: "white" | "gray" | "primary" | "transparent";
}

const Section: React.FC<SectionProps> = ({
                                             children,
                                             className,
                                             id,
                                             background = "white",
                                         }) => {
    const backgrounds = {
        white: "bg-white",
        gray: "bg-gray-50",
        primary: "bg-primary-50",
        transparent: "bg-transparent",
    };

    return (
        <section id={id} className={cn("py-16 md:py-24", backgrounds[background], className)}>
            {children}
        </section>
    );
};

export default Section;