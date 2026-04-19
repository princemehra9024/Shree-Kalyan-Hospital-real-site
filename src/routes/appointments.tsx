import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/components/ui/calendar";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PageHero } from "@/components/site/PageHero";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import gsap from "gsap";

export const Route = createFileRoute("/appointments")({
  component: AppointmentsPage,
  head: () => ({
    meta: [
      { title: "Appointments · Shree Kalyan Hospital" },
    ],
  }),
});

// Generate slots from 09:00 AM to 05:00 PM
const generateSlots = () => {
  const slots = [];
  for (let i = 9; i <= 17; i++) {
    const hour = i > 12 ? i - 12 : i;
    const ampm = i >= 12 ? "PM" : "AM";
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    slots.push(`${formattedHour}:00 ${ampm}`);
    if (i !== 17) slots.push(`${formattedHour}:30 ${ampm}`);
  }
  return slots;
};

const TIME_SLOTS = generateSlots();

function AppointmentsPage() {
  useGsapReveal();
  
  const [date, setDate] = useState<Date | undefined>(new Date(new Date().setHours(0,0,0,0)));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Simple pseudo-random function to determine if a slot is booked based on date and time
  const isSlotBooked = (time: string, dt: Date) => {
    if (!dt) return false;
    const seed = dt.getDate() + dt.getMonth() + time.charCodeAt(0) + time.charCodeAt(3);
    return seed % 3 === 0; // Approx 1/3 of slots will be booked
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  useEffect(() => {
    // Elegant stagger slide for the time grid
    if (gridRef.current && date && !selectedTime && !bookingConfirmed) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [date, selectedTime, bookingConfirmed]);

  useEffect(() => {
    // Native awwwards-style slide up for the form
    if (formRef.current && selectedTime) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, height: 0, y: 40 },
        { opacity: 1, height: "auto", y: 0, duration: 1, ease: "expo.out" }
      );
    }
  }, [selectedTime]);

  return (
    <div className="min-h-dvh bg-paper text-ink overflow-x-hidden pb-24 md:pb-0 selection:bg-magenta selection:text-white">
      <SiteNav />

      <PageHero
        chapter="Care"
        eyebrow="Appointments"
        title={
          <>
            <span className="block italic text-magenta font-light -ml-4 pr-4">Book a</span>
            <span className="block ml-12 md:ml-32 mt-2">time.</span>
          </>
        }
        intro="Schedule your consultation with our leading medical experts quickly and easily. Select a date to view current availability."
      />

      {/* Awwwards specific: stark borders, monumental spacing, sticky elements */}
      <section className="px-6 md:px-12 lg:px-24 py-24 max-w-[1600px] mx-auto border-t border-ink/10" data-reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative">
          
          {/* Left Column: Calendar (Sticky on Desktop) */}
          <div className="col-span-1 lg:col-span-5 lg:sticky top-32">
            <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-8 flex items-center gap-4">
              <span className="block w-4 h-px bg-magenta"></span> Step 1
            </p>
            <h3 className="font-display text-4xl lg:text-5xl text-navy-deep tracking-tight mb-12">
              Select your date.
            </h3>
            
            <div className="border border-ink/10 p-8 backdrop-blur-sm bg-white/30">
              <div className="w-full flex justify-center scale-105 md:scale-110 transform origin-top">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    if (d) setDate(d);
                    setSelectedTime(null);
                    setBookingConfirmed(false);
                  }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="w-fit font-light"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Time Slots & Brutalist Form */}
          <div className="col-span-1 lg:col-span-7">
            
            {!bookingConfirmed ? (
              <>
                <div className="flex items-end justify-between mb-12 border-b border-ink/10 pb-8">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-4 flex items-center gap-4">
                       <span className="block w-4 h-px bg-magenta"></span> Step 2
                    </p>
                    <h3 className="font-display text-4xl lg:text-5xl text-navy-deep tracking-tight">
                      Available slots.
                    </h3>
                  </div>
                  {date && (
                    <div className="text-right">
                      <p className="text-sm font-light text-ink/50 uppercase tracking-widest">{date.getFullYear()}</p>
                      <p className="text-xl font-display">{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                    </div>
                  )}
                </div>

                {!date && (
                  <div className="py-24 text-center border-b border-ink/10">
                    <p className="text-2xl font-light text-ink/40">Awaiting date selection...</p>
                  </div>
                )}

                {date && !selectedTime && (
                  <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {TIME_SLOTS.map((time, idx) => {
                      const booked = isSlotBooked(time, date);
                      return (
                        <button
                          key={idx}
                          disabled={booked}
                          onClick={() => setSelectedTime(time)}
                          className={`
                            w-full py-5 px-0 flex justify-between items-center transition-all duration-500 border-b relative group overflow-hidden
                            ${booked 
                              ? "border-red-500/20 text-red-500 cursor-not-allowed" 
                              : "border-ink/10 text-ink hover:text-magenta hover:border-magenta hover:pl-4"}
                          `}
                        >
                          {/* Hover Background Accent */}
                          {!booked && (
                             <span className="absolute inset-0 bg-magenta/5 w-full h-full -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out -z-10" />
                          )}
                          
                          <span className={`font-display text-2xl tracking-wide z-10 ${booked ? "line-through opacity-70" : ""}`}>
                            {time}
                          </span>
                          <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-bold z-10 ${booked ? "text-red-500/80" : "text-magenta opacity-0 group-hover:opacity-100 transition-opacity duration-300"}`}>
                            {booked ? "Booked" : "Select"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Booking Form Native Revealer */}
                {date && selectedTime && (
                  <div ref={formRef} className="overflow-hidden">
                    <div className="bg-navy-deep text-paper p-10 md:p-16 mt-8 relative overflow-hidden">
                      {/* Decorative Form Background */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-magenta/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                      
                      <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
                        <div>
                          <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-4 flex items-center gap-4">
                             <span className="block w-4 h-px bg-magenta"></span> Final Step
                          </p>
                          <h4 className="font-display text-4xl md:text-5xl">
                            {selectedTime}
                          </h4>
                        </div>
                        <button 
                          onClick={() => setSelectedTime(null)}
                          className="text-[0.65rem] uppercase tracking-wider font-bold text-white/50 hover:text-magenta transition-colors hover:underline"
                        >
                          Change Time
                        </button>
                      </div>

                      <form onSubmit={handleBooking} className="space-y-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="relative">
                            <input required type="text" id="name" className="peer w-full bg-transparent border-b border-white/20 focus:border-magenta focus:outline-none py-4 text-xl font-light text-white placeholder-transparent transition-colors" placeholder="Full Name" />
                            <label htmlFor="name" className="absolute left-0 -top-3.5 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[0.65rem] peer-focus:text-magenta font-bold">Full Name *</label>
                          </div>
                          <div className="relative">
                            <input required type="tel" id="phone" className="peer w-full bg-transparent border-b border-white/20 focus:border-magenta focus:outline-none py-4 text-xl font-light text-white placeholder-transparent transition-colors" placeholder="Phone Number" />
                            <label htmlFor="phone" className="absolute left-0 -top-3.5 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[0.65rem] peer-focus:text-magenta font-bold">Phone Number *</label>
                          </div>
                        </div>
                        
                        <div className="relative mt-8">
                          <input type="text" id="reason" className="peer w-full bg-transparent border-b border-white/20 focus:border-magenta focus:outline-none py-4 text-xl font-light text-white placeholder-transparent transition-colors" placeholder="Reason for visit" />
                          <label htmlFor="reason" className="absolute left-0 -top-3.5 text-[0.65rem] tracking-[0.2em] uppercase text-white/50 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-[0.65rem] peer-focus:text-magenta font-bold">Reason for Visit</label>
                        </div>

                        <button type="submit" className="w-full mt-12 bg-magenta text-white py-6 text-sm uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-navy-deep transition-colors duration-500">
                          Confirm Appointment
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Success State - Minimalist */
              <div ref={formRef} className="py-24 flex flex-col items-start border-b border-ink/10">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-magenta mb-8 flex items-center gap-4">
                   <span className="block w-4 h-px bg-magenta"></span> Confirmed
                </p>
                <h4 className="font-display text-6xl md:text-7xl text-navy-deep mb-8 leading-[0.9]">
                  It's <br/><span className="text-magenta italic font-light">official.</span>
                </h4>
                <p className="text-xl md:text-2xl text-ink/70 max-w-lg mb-12 font-light">
                  Your time is reserved for <strong className="font-medium text-navy-deep">{selectedTime}</strong> on <strong className="font-medium text-navy-deep">{date?.toLocaleDateString()}</strong>.
                </p>
                <button 
                  onClick={() => {
                    setSelectedTime(null);
                    setBookingConfirmed(false);
                  }}
                  className="text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-magenta text-magenta hover:text-navy-deep hover:border-navy-deep transition-colors pb-1"
                >
                  Book another
                </button>
              </div>
            )}
            
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

