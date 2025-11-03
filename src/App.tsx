import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { StickyCta } from "@/components/StickyCta";
import { FloatingShareBar } from "@/components/FloatingShareBar";
import { CookieConsent } from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Critical pages - load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load all other pages - they split into separate chunks
const NABCEPCertifiedInstallers = lazy(() => import("./pages/NABCEPCertifiedInstallers.tsx"));
const UpgradeToPremium = lazy(() => import("./pages/UpgradeToPremium.tsx"));
const TexasSolarIncentives = lazy(() => import("./pages/TexasSolarIncentives.tsx"));
const Auth = lazy(() => import("./pages/Auth"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Admin = lazy(() => import("./pages/Admin"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));
const TexasGuide = lazy(() => import("./pages/TexasGuide"));
const Premium = lazy(() => import("./pages/Premium"));
const InstallerDetail = lazy(() => import("./pages/InstallerDetail"));
const FAQ = lazy(() => import("./pages/FAQ"));
const TexasSolarIncentives2025 = lazy(() => import("./pages/TexasSolarIncentives2025"));
const BadgeWidgetPage = lazy(() => import("./pages/BadgeWidget"));
const Installers = lazy(() => import("./pages/Installers"));
const Learn = lazy(() => import("./pages/Learn"));
const Quote = lazy(() => import("./pages/Quote"));
const CityPage = lazy(() => import("./pages/CityPage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AffiliateDisclosurePage = lazy(() => import("./pages/AffiliateDisclosurePage"));
const SolarBuyingGuide = lazy(() => import("./pages/guides/SolarBuyingGuide"));
const TexasIncentivesGuide = lazy(() => import("./pages/guides/TexasIncentivesGuide"));
const ChoosingInstallerGuide = lazy(() => import("./pages/guides/ChoosingInstallerGuide"));
const SolarPanelTypesGuide = lazy(() => import("./pages/guides/SolarPanelTypesGuide"));
const BatteryStorageGuide = lazy(() => import("./pages/guides/BatteryStorageGuide"));
const SolarFinancingGuide = lazy(() => import("./pages/guides/SolarFinancingGuide"));
const SafetyScoreExplained = lazy(() => import("./pages/SafetyScoreExplained"));
const ReportBankruptcy = lazy(() => import("./pages/ReportBankruptcy"));
const SunnovaHelp = lazy(() => import("./pages/SunnovaHelp"));
const HowWeProtectYou = lazy(() => import("./pages/HowWeProtectYou"));
const SafetyScoreManagement = lazy(() => import("./pages/admin/SafetyScoreManagement"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <StickyCta />
            <FloatingShareBar />
            <CookieConsent />
            <Suspense fallback={<PageLoader />}>
              <Routes>
            {/* Homepage */}
            <Route path="/" element={<Index />} />
            
            {/* Main Silo Pages */}
            <Route path="/installers" element={<Installers />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/solar-buying-guide-texas" element={<SolarBuyingGuide />} />
            <Route path="/learn/texas-incentives" element={<TexasIncentivesGuide />} />
            <Route path="/learn/choosing-installer" element={<ChoosingInstallerGuide />} />
            <Route path="/learn/solar-panel-types" element={<SolarPanelTypesGuide />} />
            <Route path="/learn/battery-storage" element={<BatteryStorageGuide />} />
            <Route path="/learn/solar-financing" element={<SolarFinancingGuide />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/cities/:city" element={<CityPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Legacy city pages - redirect to new structure */}
            <Route path="/austin" element={<Navigate to="/cities/austin" replace />} />
            <Route path="/houston" element={<Navigate to="/cities/houston" replace />} />
            <Route path="/dallas" element={<Navigate to="/cities/dallas" replace />} />
            <Route path="/san-antonio" element={<Navigate to="/cities/san-antonio" replace />} />
            <Route path="/fort-worth" element={<Navigate to="/cities/fort-worth" replace />} />
            
            {/* Installer detail pages */}
            <Route path="/installers/:city/:slug" element={<InstallerDetail />} />
            <Route path="/installer/:slug" element={<InstallerDetail />} />
            
            {/* Utility pages */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />

            {/* Trust & Safety pages */}
            <Route path="/safety-score-explained" element={<SafetyScoreExplained />} />
            <Route path="/report-bankruptcy" element={<ReportBankruptcy />} />
            <Route path="/sunnova-help" element={<SunnovaHelp />} />
            <Route path="/how-we-protect-you" element={<HowWeProtectYou />} />
            
            {/* Legacy pages - keep for SEO */}
            <Route path="/texas-guide" element={<TexasGuide />} />
            <Route path="/texas-solar-incentives" element={<TexasSolarIncentives />} />
            <Route path="/texas-solar-incentives-2025" element={<TexasSolarIncentives2025 />} />
            <Route path="/nabcep-certified-installers" element={<NABCEPCertifiedInstallers />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/upgrade-to-premium" element={<UpgradeToPremium />} />
            <Route path="/badge" element={<BadgeWidgetPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/safety-scores" element={<SafetyScoreManagement />} />
            
            {/* Legacy city pages - redirect to new structure */}
            <Route path="/san-antonio-solar-installers" element={<Navigate to="/cities/san-antonio" replace />} />
            <Route path="/fort-worth-solar-installers" element={<Navigate to="/cities/fort-worth" replace />} />
            <Route path="/el-paso-solar-installers" element={<Navigate to="/cities/el-paso" replace />} />
            <Route path="/corpus-christi-solar-installers" element={<Navigate to="/cities/corpus-christi" replace />} />
            <Route path="/lubbock-solar-installers" element={<Navigate to="/cities/lubbock" replace />} />
            <Route path="/amarillo-solar-installers" element={<Navigate to="/cities/amarillo" replace />} />
            <Route path="/plano-solar-installers" element={<Navigate to="/cities/plano" replace />} />
            <Route path="/arlington-solar-installers" element={<Navigate to="/cities/arlington" replace />} />
            <Route path="/garland-solar-installers" element={<Navigate to="/cities/garland" replace />} />
            <Route path="/irving-solar-installers" element={<Navigate to="/cities/irving" replace />} />
            <Route path="/mesquite-solar-installers" element={<Navigate to="/cities/mesquite" replace />} />
            <Route path="/pasadena-solar-installers" element={<Navigate to="/cities/pasadena" replace />} />
            <Route path="/laredo-solar-installers" element={<Navigate to="/cities/laredo" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
