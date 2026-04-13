import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { AssistantProvider } from "@/components/assistant/AssistantProvider";
import { AssistantBar }      from "@/components/assistant/AssistantBar";
import { AssistantPanel }    from "@/components/assistant/AssistantPanel";

// Lazy loading
const Home                = lazy(() => import("@/pages/Home"));
const Careers             = lazy(() => import("@/pages/Careers"));
const News                = lazy(() => import("@/pages/News"));
const Insights            = lazy(() => import("@/pages/Insights"));
const InsightDetail       = lazy(() => import("@/pages/InsightDetail"));
const Services            = lazy(() => import("@/pages/Services"));
const CaseStudies         = lazy(() => import("@/pages/CaseStudies"));
const CaseStudyDetail     = lazy(() => import("@/pages/CaseStudyDetail"));
const About               = lazy(() => import("@/pages/About"));
const Deliverables        = lazy(() => import("@/pages/Deliverables"));
const RequestConsultation = lazy(() => import("@/pages/RequestConsultation"));
const Philosophy          = lazy(() => import("@/pages/Philosophy"));

// Service detail pages
const EngineeringPlans     = lazy(() => import("@/pages/services/EngineeringPlans"));
const EngineeringDocs      = lazy(() => import("@/pages/services/EngineeringDocs"));
const StructuralIntegrity  = lazy(() => import("@/pages/services/StructuralIntegrity"));
const SustainableTech      = lazy(() => import("@/pages/services/SustainableTech"));
const RegulatoryCompliance = lazy(() => import("@/pages/services/RegulatoryCompliance"));
const ProjectManagement    = lazy(() => import("@/pages/services/ProjectManagement"));
const YachtSurvey          = lazy(() => import("@/pages/services/YachtSurvey"));

const PrivacyPolicy  = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const CookiePolicy   = lazy(() => import("@/pages/CookiePolicy"));
const NotFound       = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading Adriatica...</p>
      </div>
    </div>
  );
}

// GA4 sayfa görüntüleme takibi
function GAPageTracker() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    const timer = setTimeout(() => {
      window.gtag("event", "page_view", {
        page_path: location,
        page_title: document.title,
        page_location: window.location.href,
        send_to: "G-WPWD3K7JHR",
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/services/engineering-plans"         component={EngineeringPlans} />
        <Route path="/services/engineering-documentation" component={EngineeringDocs} />
        <Route path="/services/structural-integrity"      component={StructuralIntegrity} />
        <Route path="/services/sustainable-technologies"  component={SustainableTech} />
        <Route path="/services/regulatory-compliance"     component={RegulatoryCompliance} />
        <Route path="/services/project-management"        component={ProjectManagement} />
        <Route path="/services/yacht-survey"              component={YachtSurvey} />

        <Route path="/services"             component={Services} />
        <Route path="/insights/:slug"       component={InsightDetail} />
        <Route path="/insights"             component={Insights} />
        <Route path="/case-studies/:slug"   component={CaseStudyDetail} />
        <Route path="/case-studies"         component={CaseStudies} />
        <Route path="/careers"              component={Careers} />
        <Route path="/news"                 component={News} />
        <Route path="/about"                component={About} />
        <Route path="/deliverables"         component={Deliverables} />
        <Route path="/request-consultation" component={RequestConsultation} />
        <Route path="/philosophy"           component={Philosophy} />
        <Route path="/privacy-policy"       component={PrivacyPolicy} />
        <Route path="/terms-of-service"     component={TermsOfService} />
        <Route path="/cookie-policy"        component={CookiePolicy} />

        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <AssistantProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
            <GAPageTracker />
            <CookieConsent />
            <AssistantBar />
            <AssistantPanel />
          </TooltipProvider>
        </QueryClientProvider>
      </AssistantProvider>
    </HelmetProvider>
  );
}

export default App;