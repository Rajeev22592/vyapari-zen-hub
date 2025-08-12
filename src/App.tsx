import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import BhavPage from "./pages/BhavPage";
import DirectoryPage from "./pages/DirectoryPage";
import BroadcastPage from "./pages/BroadcastPage";
import MorePage from "./pages/MorePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bhav" element={<BhavPage />} />
            <Route path="/bhav/:category" element={<BhavPage />} />
            <Route path="/directory" element={<DirectoryPage />} />
            <Route path="/broadcast" element={<BroadcastPage />} />
            <Route path="/more" element={<MorePage />} />
            <Route path="/analysis" element={<BhavPage />} />
            <Route path="/area-selection" element={<MorePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
