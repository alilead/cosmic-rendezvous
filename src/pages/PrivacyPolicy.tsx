import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 px-4 pb-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-2xl tracking-wider text-primary mb-4">
            Privacy Policy
          </h1>

          <p className="text-muted-foreground text-sm mb-4">
            This page displays the privacy policy PDF for Cosmic Cafe.
          </p>

          <div className="rounded-lg border border-border overflow-hidden bg-card">
            <iframe
              src="/cosmic-privacy-policy-en.pdf"
              title="Cosmic Cafe Privacy Policy"
              className="w-full h-[72vh] md:h-[80vh]"
            />
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            If the PDF doesn&apos;t load, you can{" "}
            <a className="text-primary underline" href="/cosmic-privacy-policy-en.pdf" download>
              download it here
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
}

