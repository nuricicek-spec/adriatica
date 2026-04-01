import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Careers from "@/pages/Careers";
import News from "@/pages/News";
import Insights from "@/pages/Insights";
import InsightDetail from "@/pages/InsightDetail";
import Services from "@/pages/Services";
import CaseStudies from "@/pages/CaseStudies";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import About from "@/pages/About";
import Deliverables from "@/pages/Deliverables"; // Yeni import

// Service detail pages
import EngineeringPlans from "@/pages/services/EngineeringPlans";
import EngineeringDocs from "@/pages/services/EngineeringDocs";
import StructuralIntegrity from "@/pages/services/StructuralIntegrity";
import SustainableTech from "@/pages/services/SustainableTech";
import RegulatoryCompliance from "@/pages/services/RegulatoryCompliance";
import ProjectManagement from "@/pages/services/ProjectManagement";

import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CookiePolicy from "@/pages/CookiePolicy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Spesifik route'lar üstte */}
      <Route path="/services/engineering-plans" component={EngineeringPlans} />
      <Route path="/services/engineering-documentation" component={EngineeringDocs} />
      <Route path="/services/structural-integrity" component={StructuralIntegrity} />
      <Route path="/services/sustainable-technologies" component={SustainableTech} />
      <Route path="/services/regulatory-compliance" component={RegulatoryCompliance} />
      <Route path="/services/project-management" component={ProjectManagement} />

      <Route path="/services" component={Services} />
      <Route path="/insights/:slug" component={InsightDetail} />
      <Route path="/insights" component={Insights} />
      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/careers" component={Careers} />
      <Route path="/news" component={News} />
      <Route path="/about" component={About} />
      <Route path="/deliverables" component={Deliverables} /> {/* Yeni route */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-policy" component={CookiePolicy} />

      {/* En genel route en altta */}
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;