import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ErrorBoundary from "@/components/ErrorBoundary";
import { lazy, Suspense } from "react";
const Index = lazy(() => import("./pages/Index"));
const BhavPage = lazy(() => import("./pages/BhavPage"));
const DirectoryPage = lazy(() => import("./pages/DirectoryPage"));
const BroadcastPage = lazy(() => import("./pages/BroadcastPage"));
const MorePage = lazy(() => import("./pages/MorePage"));
const MarketplacePage = lazy(() => import("./pages/MarketplacePage"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const PriceHistoryPage = lazy(() => import("./pages/PriceHistoryPage"));
const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const TransactionPage = lazy(() => import("./pages/TransactionPage"));
const TraderProfilePage = lazy(() => import("./pages/TraderProfilePage"));
const NewsDetailPage = lazy(() => import("./pages/NewsDetailPage"));
const NotificationsPage = lazy(() => import("./pages/NotificationsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const PrivacySecurityPage = lazy(() => import("./pages/PrivacySecurityPage"));
const HelpSupportPage = lazy(() => import("./pages/HelpSupportPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const JoinNetworkPage = lazy(() => import("./pages/JoinNetworkPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AreaSelectionPage = lazy(() => import("./pages/AreaSelectionPage"));
const MarketsUpPage = lazy(() => import("./pages/MarketsUpPage"));
const MarketsDownPage = lazy(() => import("./pages/MarketsDownPage"));
const TotalMandisPage = lazy(() => import("./pages/TotalMandisPage"));
const TotalCommoditiesPage = lazy(() => import("./pages/TotalCommoditiesPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <Suspense fallback={<div className="p-4 text-sm text-muted-foreground">Loading...</div>}>
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
              <Route path="/analysis" element={<AnalysisPage />} />
              <Route path="/area-selection" element={<AreaSelectionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/directory/join" element={<JoinNetworkPage />} />
              <Route path="/directory/:traderId" element={<TraderProfilePage />} />
              <Route path="/broadcast/:articleId" element={<NewsDetailPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/privacy-security" element={<PrivacySecurityPage />} />
              <Route path="/help" element={<HelpSupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/markets-up" element={<MarketsUpPage />} />
              <Route path="/markets-down" element={<MarketsDownPage />} />
              <Route path="/total-mandis" element={<TotalMandisPage />} />
              <Route path="/total-commodities" element={<TotalCommoditiesPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
