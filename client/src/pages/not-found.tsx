import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const notFoundSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/404/#webpage",
        "url": "https://www.adriaticadoo.com/404",
        "name": "Page Not Found | Adriatica D.O.O.",
        "description": "The page you are looking for does not exist. Return to Adriatica D.O.O. homepage.",
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        "url": "https://www.adriaticadoo.com/",
        "name": "Adriatica D.O.O.",
        "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.com/#organization" }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist. Return to Adriatica D.O.O. homepage."
        canonical="https://www.adriaticadoo.com/404"
        noindex={true}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(notFoundSchema).replace(/</g, '\\u003c')}
        </script>
      </Helmet>

      <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md mx-auto border-border/50 shadow-xl bg-white/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-display font-bold text-foreground">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              The coordinates you entered do not match any known location on our chart.
            </p>
            
            <div className="mt-8">
              <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#0B3B5C] text-white font-medium hover:bg-[#1A4B7A] transition-colors rounded-sm w-full">
                Return to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}