import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto border-border/50 shadow-xl bg-white/50 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-destructive" />
            <h1 className="text-2xl font-display font-bold text-foreground">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            The coordinates you have entered do not correspond to a known location in our chart.
          </p>
          
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-[#0B3B5C] text-white font-medium hover:bg-[#1A4B7A] transition-colors rounded-sm w-full">
              Return to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
