import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import InstallerDetail from "./pages/InstallerDetail";
import { FAQPage } from "./pages/SEOPages";
import SanAntonioSolar from "./pages/SanAntonioSolar";
import FortWorthSolar from "./pages/FortWorthSolar";
import ElPasoSolar from "./pages/ElPasoSolar";
import CorpusChristiSolar from "./pages/CorpusChristiSolar";
import LubbockSolar from "./pages/LubbockSolar";
import AmarilloSolar from "./pages/AmarilloSolar";
import PlanoSolar from "./pages/PlanoSolar";
import ArlingtonSolar from "./pages/ArlingtonSolar";
import GarlandSolar from "./pages/GarlandSolar";
import IrvingSolar from "./pages/IrvingSolar";
import MesquiteSolar from "./pages/MesquiteSolar";
import PasadenaSolar from "./pages/PasadenaSolar";
import LaredoSolar from "./pages/LaredoSolar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/installer/:slug" element={<InstallerDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/texas-guide" element={<TexasGuide />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/san-antonio-solar-installers" element={<SanAntonioSolar />} />
            <Route path="/fort-worth-solar-installers" element={<FortWorthSolar />} />
            <Route path="/el-paso-solar-installers" element={<ElPasoSolar />} />
            <Route path="/corpus-christi-solar-installers" element={<CorpusChristiSolar />} />
            <Route path="/lubbock-solar-installers" element={<LubbockSolar />} />
            <Route path="/amarillo-solar-installers" element={<AmarilloSolar />} />
            <Route path="/plano-solar-installers" element={<PlanoSolar />} />
            <Route path="/arlington-solar-installers" element={<ArlingtonSolar />} />
            <Route path="/garland-solar-installers" element={<GarlandSolar />} />
            <Route path="/irving-solar-installers" element={<IrvingSolar />} />
            <Route path="/mesquite-solar-installers" element={<MesquiteSolar />} />
            <Route path="/pasadena-solar-installers" element={<PasadenaSolar />} />
            <Route path="/laredo-solar-installers" element={<LaredoSolar />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
