import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Game() {
  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col pt-16 overflow-hidden px-4">
        <div className="flex flex-col items-center flex-1 min-h-0 max-w-[800px] w-full mx-auto py-4">
          <h1 className="font-display text-2xl tracking-wider text-primary mb-2 shrink-0">Alien Jump</h1>
          <p className="text-muted-foreground text-sm mb-4 shrink-0">The Alien · Jump between platforms</p>
          <div className="flex-1 min-h-0 w-full flex justify-center">
            <iframe
              src="/alien-jump.html"
              title="Alien Jump"
              className="w-[740px] max-w-full border-0 rounded-lg shadow-lg bg-transparent min-h-[calc(100vh-14rem)]"
            />
          </div>
          <Button variant="ghost" asChild className="mt-4 shrink-0">
            <Link to="/">← Back to site</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
