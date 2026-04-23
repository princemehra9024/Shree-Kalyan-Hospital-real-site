import React from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-6 selection:bg-magenta selection:text-white">
          <div className="max-w-2xl w-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-magenta/10 rounded-full">
                <AlertCircle className="size-6 text-magenta" />
              </div>
              <span className="text-[0.65rem] font-syne font-bold tracking-[0.4em] text-magenta uppercase">
                System Encountered an Exception
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl text-navy-deep leading-[0.9] mb-8 tracking-tighter">
              Precision was <br />
              <em className="italic font-light text-magenta">interrupted.</em>
            </h1>

            <p className="text-xl text-ink/60 font-light leading-relaxed mb-12 max-w-lg">
              We encountered an unexpected technical issue. Our systems have logged this event for
              immediate clinical review. Please try refreshing or return to our homepage.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-navy-deep text-paper px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest hover:bg-magenta transition-colors duration-500 inline-flex items-center gap-3"
              >
                <RotateCcw className="size-4" />
                Retry Connection
              </button>
              <Link
                to="/"
                className="border border-navy/20 px-10 py-5 text-[0.65rem] font-syne font-bold uppercase tracking-widest text-ink/60 hover:border-navy hover:text-ink transition-all inline-flex items-center gap-3"
              >
                <Home className="size-4" />
                Return Home
              </Link>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-20 p-8 bg-secondary/50 border border-navy/5 rounded-lg overflow-hidden">
                <p className="text-[0.6rem] font-bold tracking-widest text-magenta uppercase mb-4">
                  Developer Insight
                </p>
                <pre className="text-xs font-mono text-ink/70 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
