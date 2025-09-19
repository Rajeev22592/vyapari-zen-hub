import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchOverviewStats } from "@/services/stats";
import { fetchMandis } from "@/services/regions";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Building2, ChevronLeft, ChevronRight } from "lucide-react";

const TotalMandisPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: statsData } = useQuery({
    queryKey: ["overview-stats"],
    queryFn: () => fetchOverviewStats(),
  });

  // Use proper server-side pagination (NO FILTERS)
  const { data: mandisData, isLoading: mandisLoading, error: mandisError } = useQuery({
    queryKey: ["mandis", currentPage],
    queryFn: async () => {
      const params = {
        page: currentPage,
        perPage: 20,
        _ts: Date.now(), // Cache busting
        _cache: 'no-cache', // Additional cache busting
      };
      
      try {
        const result = await fetchMandis(params);
        return result;
      } catch (error) {
        console.error('API call failed for page', currentPage, ':', error);
        throw error;
      }
    },
    staleTime: 0, // Always consider data stale
    retry: 1, // Retry once on failure
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // Always refetch on mount
  });

  const totalMandis = statsData?.totalRegisteredMandis ?? 0;
  const totalStates = statsData?.totalStatesAndUTs ?? 0;
  const liveMarkets = statsData?.liveMarketsToday ?? 0;
  const commoditiesTraded = statsData?.commoditiesTraded ?? 0;

  // Get mandis from API response (server-side pagination)
  const mandis = (mandisData as any)?.data || [];
  
  // Extract pagination info from API response
  const apiData = mandisData as any;
  const totalCount = apiData?.total || totalMandis;
  const totalPages = apiData?.last_page || Math.ceil(totalCount / 20);
  const currentTotal = totalCount;
  

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };




  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link to="/bhav">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Bhav
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Total Mandis</h1>
            </div>
            <p className="text-muted-foreground">Registered agricultural markets across India • {totalMandis.toLocaleString()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary/10 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalMandis.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Mandis</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-success/10 border-success/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{liveMarkets.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Live Today</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-accent/10 border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground">{totalStates}</div>
              <div className="text-sm text-muted-foreground">States & UTs</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-warning/10 border-warning/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{commoditiesTraded.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Commodities</div>
            </CardContent>
          </Card>
        </div>



              <div className="space-y-4">
                {mandisLoading && !mandisData && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-blue-600">Loading page {currentPage}...</p>
                    </CardContent>
                  </Card>
                )}
                {mandisLoading && !mandisData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="bg-muted/30 animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-5 w-32 bg-muted rounded mb-2" />
                    <div className="h-4 w-24 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : mandisError ? (
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="p-6 text-center">
                <p className="text-destructive">Failed to load mandis data</p>
                <p className="text-sm text-destructive/70 mt-2">
                  Error: {mandisError?.message || 'Unknown error'}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Check console for more details
                </p>
              </CardContent>
            </Card>
          ) : mandis.length === 0 ? (
            <Card className="bg-muted/20 border-dashed">
              <CardContent className="p-8 text-center text-muted-foreground">
                No mandis found matching your filters.
                <p className="text-xs mt-2">API Response: {mandisData ? 'Received' : 'Not received'}</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {mandis.map((mandi: any) => (
                  <Card key={mandi.market_id} className="bg-background border-border/70 shadow-soft hover:shadow-elevated transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm truncate">{mandi.market}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{mandi.district_name}, {mandi.state_name}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {(totalPages > 1 || mandis.length > 0) && (
                <Card className="bg-background border-border/70 shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing {apiData?.from || ((currentPage - 1) * 20) + 1} to {apiData?.to || Math.min(currentPage * 20, currentTotal)} of {currentTotal.toLocaleString()} mandis
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageClick(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: Math.max(1, Math.min(5, totalPages)) }, (_, i) => {
                            const page = i + 1;
                            return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => handlePageClick(page)}
                              className="w-8 h-8 p-0"
                            >
                                {page}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageClick(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default TotalMandisPage;