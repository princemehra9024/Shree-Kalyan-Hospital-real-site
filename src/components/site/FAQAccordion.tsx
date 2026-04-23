import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col gap-0 border-t border-ink/10">
      {items.map((item, index) => (
        <FAQAccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => setOpenIndex(index === openIndex ? null : index)}
          index={index}
        />
      ))}
    </div>
  );
}

function FAQAccordionItem({
  item,
  isOpen,
  onClick,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !wrapperRef.current) return;

    if (isOpen) {
      gsap.to(wrapperRef.current, {
        height: contentRef.current.scrollHeight,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out",
      });
    } else {
      gsap.to(wrapperRef.current, {
        height: 0,
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div className="group border-b border-ink/10 relative">
      {/* Background Hover Effect */}
      <div className="absolute inset-0 bg-ink/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <button
        onClick={onClick}
        className="w-full flex items-center justify-between text-left py-8 md:py-10 px-4 md:px-8 relative z-10"
      >
        <span className="font-display italic text-3xl md:text-4xl text-navy-deep group-hover:text-magenta transition-colors duration-500">
          <span className="text-magenta/30 text-xl md:text-2xl not-italic font-syne mr-6 font-bold">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          {item.question}
        </span>

        {/* Animated Plus/Minus icon */}
        <div className="relative size-6 shrink-0 ml-4 flex items-center justify-center">
          <span
            className="absolute h-px w-full bg-magenta transition-transform duration-500 ease-in-out"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(0deg)" }}
          />
          <span
            className="absolute h-px w-full bg-magenta transition-transform duration-500 ease-in-out"
            style={{ transform: isOpen ? "rotate(0deg)" : "rotate(90deg)" }}
          />
        </div>
      </button>

      <div ref={wrapperRef} className="overflow-hidden h-0 relative z-10">
        <div
          ref={contentRef}
          className="pb-10 px-4 md:px-8 ml-0 md:ml-12 text-lg text-ink/65 font-light leading-relaxed max-w-3xl opacity-0 translate-y-[-10px]"
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}
