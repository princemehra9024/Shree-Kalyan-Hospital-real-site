import { useQuery } from "@tanstack/react-query";
import { Star, Quote } from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { Marquee } from "./Marquee";

async function fetchReviews() {
  const res = await fetch("/api/google-reviews");
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export function PatientReviews() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["google-reviews"],
    queryFn: fetchReviews,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  useGsapReveal();

  if (isLoading)
    return <div className="h-48 flex items-center justify-center">Loading reviews...</div>;
  if (isError || !data?.reviews?.length) return null;

  return (
    <section className="py-24 bg-navy-deep text-paper overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 mb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-magenta" /> Patient Stories
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              Trusted by our <br />
              <em className="italic font-light text-magenta">community.</em>
            </h2>
          </div>
          <div className="flex items-center gap-4 border border-paper/10 px-8 py-6 backdrop-blur-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-magenta text-magenta" />
              ))}
            </div>
            <div>
              <span className="block font-display text-2xl leading-none">{data.rating}</span>
              <span className="text-[0.55rem] font-bold uppercase tracking-widest text-paper/40">
                {data.total_ratings} Reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <Marquee
          speed="slow"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          items={data.reviews.map((review: any) => (
            <div
              key={review.time}
              className="w-[400px] bg-paper/5 border border-paper/10 p-10 mr-8 hover:bg-paper/10 transition-colors group"
            >
              <Quote className="size-10 text-magenta/20 mb-6 group-hover:text-magenta/40 transition-colors" />
              <p className="text-lg font-light leading-relaxed mb-8 text-paper/80 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="size-12 rounded-full grayscale group-hover:grayscale-0 transition-all"
                />
                <div>
                  <p className="font-display text-xl leading-none mb-1">{review.author_name}</p>
                  <p className="text-[0.55rem] font-bold uppercase tracking-widest text-paper/30">
                    Verified Patient
                  </p>
                </div>
              </div>
            </div>
          ))}
        />
      </div>
    </section>
  );
}
