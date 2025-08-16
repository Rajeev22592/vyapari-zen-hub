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
import MarketplacePage from "./pages/MarketplacePage";
import WatchlistPage from "./pages/WatchlistPage";
import PriceHistoryPage from "./pages/PriceHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";
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
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/price-history" element={<PriceHistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/transactions" element={<TransactionPage />} />
            <Route path="/analysis" element={<PriceHistoryPage />} />
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
