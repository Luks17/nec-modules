import type React from "react";

function FormCarousel({ children }: { children?: React.ReactNode }) {
  return <div className="carousel py-1 w-full overflow-hidden">{children}</div>;
}

function CarouselSection({
  children,
  id,
}: {
  children?: React.ReactNode;
  id: number;
}) {
  return (
    <section
      className="carousel-item w-full"
      id={`form-carousel-section-${id}`}
    >
      <div className="form-control items-start gap-y-4 p-10 xl:p-20">
        {children}
      </div>
    </section>
  );
}

export default {
  Root: FormCarousel,
  Section: CarouselSection,
};
