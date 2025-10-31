import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NABCEPCertifiedInstallers from "./pages/NABCEPCertifiedInstallers.tsx";
import UpgradeToPremium from "./pages/UpgradeToPremium.tsx";
import TexasSolarIncentives from "./pages/TexasSolarIncentives.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import TexasGuide from "./pages/TexasGuide";
import Premium from "./pages/Premium";
import InstallerDetail from "./pages/InstallerDetail";
import FAQ from "./pages/FAQ";
import TexasSolarIncentives2025 from "./pages/TexasSolarIncentives2025";
import BadgeWidgetPage from "./pages/BadgeWidget";
import { StickyCta } from "@/components/StickyCta";
import { FloatingShareBar } from "@/components/FloatingShareBar";
import { CookieConsent } from "@/components/CookieConsent";
// New silo pages
import Installers from "./pages/Installers";
import Learn from "./pages/Learn";
import Quote from "./pages/Quote";
import CityPage from "./pages/CityPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AffiliateDisclosurePage from "./pages/AffiliateDisclosurePage";
import SolarBuyingGuide from "./pages/guides/SolarBuyingGuide";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <StickyCta />
          <FloatingShareBar />
          <CookieConsent />
          <Routes>
            {/* Homepage */}
            <Route path="/" element={<Index />} />
            
            {/* Main Silo Pages */}
            <Route path="/installers" element={<Installers />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/solar-buying-guide-texas" element={<SolarBuyingGuide />} />
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
            
            {/* Legacy pages - keep for SEO */}
            <Route path="/texas-guide" element={<TexasGuide />} />
            <Route path="/texas-solar-incentives" element={<TexasSolarIncentives />} />
            <Route path="/texas-solar-incentives-2025" element={<TexasSolarIncentives2025 />} />
            <Route path="/nabcep-certified-installers" element={<NABCEPCertifiedInstallers />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/upgrade-to-premium" element={<UpgradeToPremium />} />
            <Route path="/badge" element={<BadgeWidgetPage />} />
            <Route path="/admin" element={<Admin />} />
            
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
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
