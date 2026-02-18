import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Preventivo from "./pages/Preventivo";
import Servizi from "./pages/Servizi";
import ChiSiamo from "./pages/ChiSiamo";
import Supporto from "./pages/Supporto";
import Success from "./pages/Success";
import Termini from "./pages/Termini";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/preventivo" element={<Preventivo />} />
          <Route path="/servizi" element={<Servizi />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/supporto" element={<Supporto />} />
          <Route path="/success" element={<Success />} />
          <Route path="/termini" element={<Termini />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
