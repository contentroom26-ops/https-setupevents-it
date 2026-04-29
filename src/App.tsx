import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load secondary pages
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const CorporateEvents = lazy(() => import("./pages/CorporateEvents"));
const BrandActivation = lazy(() => import("./pages/BrandActivation"));
const EventProductions = lazy(() => import("./pages/EventProductions"));
const HostessStaff = lazy(() => import("./pages/HostessStaff"));
const PublicRelations = lazy(() => import("./pages/PublicRelations"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const Contatti = lazy(() => import("./pages/Contatti"));
const PrenotaCall = lazy(() => import("./pages/PrenotaCall"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/corporate-events" element={<CorporateEvents />} />
            <Route path="/brand-activation" element={<BrandActivation />} />
            <Route path="/event-productions" element={<EventProductions />} />
            <Route path="/hostess-staff" element={<HostessStaff />} />
            <Route path="/public-relations" element={<PublicRelations />} />
            <Route path="/termini-condizioni" element={<TermsConditions />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/prenota-call" element={<PrenotaCall />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
