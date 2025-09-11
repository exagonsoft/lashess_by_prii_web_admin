import { ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export default function SectionWrapper({
  id,
  className = "",
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-7xl px-4 sm:px-6 pt-28 lg:px-8 mt-24 ${className}`}
    >
      {children}
    </section>
  );
}
