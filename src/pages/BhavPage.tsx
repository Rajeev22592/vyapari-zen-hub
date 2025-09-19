import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { ArrowUpDown, Filter, TrendingUp, TrendingDown, MapPin, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ENamFilters from "@/components/filters/ENamFilters";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPrices, fetchMarketsUp, fetchMarketsDown } from "@/services/prices";
import { fetchSegmentsWithCommodities } from "@/services/regions";
import { fetchOverviewStats } from "@/services/stats";
import { toPng } from "html-to-image";
import { useParams, Link } from "react-router-dom";

const BhavPage = () => {
  const { t } = useLanguage();
  const { category } = useParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: ""
  });

  const listRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Fetch segments data for category tabs
  const { data: segmentsData } = useQuery({
    queryKey: ["segments-with-commodities"],
    queryFn: fetchSegmentsWithCommodities,
  });

  // Fetch overview stats (to match Home page values)
  const { data: overview } = useQuery({
    queryKey: ["stats","overview"],
    queryFn: fetchOverviewStats,
  });


  useEffect(() => {
    const onScroll = () => {
      const scrolled = (listRef.current?.getBoundingClientRect().top || 0) < -200;
      setShowBackToTop(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Date param required by backend (YYYY-MM-DD). Replace with date picker later.
  const dateParam = new Date().toISOString().slice(0, 10);
  const commodityParam = useMemo(() => {
    const c = appliedFilters.commodity?.trim();
    if (!c) return {} as Record<string, unknown>;
    if (/^\d+$/.test(c)) return { commodity: c } as Record<string, unknown>;
    return { commodity_name: c.replace(/-/g, " ") } as Record<string, unknown>;
  }, [appliedFilters.commodity]);

  const { data: pricePage, isLoading, isError } = useQuery({
    queryKey: [
      "prices",
      { ...appliedFilters, ...commodityParam, segment: selectedCategory !== "all" ? selectedCategory : undefined },
    ],
    queryFn: () =>
      fetchPrices({
      state: appliedFilters.state || undefined,
      district: appliedFilters.district || undefined,
      market: appliedFilters.market || undefined,
        ...(commodityParam),
        segment: selectedCategory !== "all" ? selectedCategory : undefined,
      search: appliedFilters.search || undefined,
      page: 1,
      perPage: 50,
      _ts: `${selectedCategory}-${Date.now()}`,
    }),
  });

  // Markets up/down counts via meta.total with current filters
  const segmentParam = selectedCategory !== "all" ? selectedCategory : undefined;
  const stateIdParam = appliedFilters.state || undefined;
  const districtIdParam = appliedFilters.district || undefined;

  const { data: marketsUpPage } = useQuery({
    queryKey: ["markets-up", { state_id: stateIdParam, district_id: districtIdParam, segment: segmentParam, date: dateParam }],
    queryFn: () =>
      fetchMarketsUp({
        state_id: stateIdParam,
        district_id: districtIdParam,
        segment: segmentParam,
        date: dateParam,
        perPage: 1,
      }),
  });

  const { data: marketsDownPage } = useQuery({
    queryKey: ["markets-down", { state_id: stateIdParam, district_id: districtIdParam, segment: segmentParam, date: dateParam }],
    queryFn: () =>
      fetchMarketsDown({
        state_id: stateIdParam,
        district_id: districtIdParam,
        segment: segmentParam,
        date: dateParam,
        perPage: 1,
      }),
  });

  // Normalize totals from different pagination shapes (meta.total or total)
  const marketsUpTotal = useMemo(() => {
    const r = marketsUpPage as any;
    return r?.meta?.total ?? r?.total ?? undefined;
  }, [marketsUpPage]);

  const marketsDownTotal = useMemo(() => {
    const r = marketsDownPage as any;
    return r?.meta?.total ?? r?.total ?? undefined;
  }, [marketsDownPage]);

  const commodities = useMemo(() => {
    const data = pricePage?.data || [];
    return data.map((p: any) => {
      // Defensive mapping to support various backend shapes
      const commodityName = p?.commodity?.name || p?.commodity_name || p?.name || "-";
      const segmentRaw = p?.commodity?.segment || p?.segment || "";
      const marketName = p?.market?.name || p?.market_name || p?.mandi || "-";
      const stateName = p?.market?.state || p?.state || "-";

      const modal =
        p?.modal_price ?? p?.modal ?? p?.price ?? p?.max_price ?? p?.max ?? p?.min_price ?? 0;
      const changeAbs = p?.change_abs ?? p?.trend_change ?? 0;
      const changePct = p?.change_pct ?? undefined;
      const segmentSlug = String(segmentRaw || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      return {
        name: { en: commodityName, hi: commodityName },
        price: `₹${Number(modal).toLocaleString()}`,
        change: changeAbs ? `${changeAbs > 0 ? "+" : ""}${changeAbs}` : "",
        changePercent: changePct ? `${changePct > 0 ? "+" : ""}${changePct}%` : "",
        location: { en: marketName, hi: marketName },
        state: { en: stateName, hi: stateName },
        category: segmentSlug,
        trend: (changeAbs || 0) >= 0 ? "up" : "down",
        variety: { en: p?.variety || "", hi: p?.variety || "" },
        quality: { en: p?.grade || "", hi: p?.grade || "" },
        unit: { en: p?.unit || p?.commodity?.unit || "Quintal", hi: p?.unit || p?.commodity?.unit || "क्विंटल" },
        lastUpdated: p?.date || p?.priced_on || "",
      };
    });
  }, [pricePage]);

  const getSegmentSlug = (segmentName: string) => {
    const s = (segmentName || "").toLowerCase();
    if (s.includes("grain")) return "grains";
    if (s.includes("pulse")) return "pulses";
    if (s.includes("oil")) return "oils";
    if (s.includes("spice")) return "spices";
    if (s.includes("dry")) return "dry-fruits";
    if (s.includes("rice")) return "rice";
    if (s.includes("vegetable")) return "vegetables";
    if (s.includes("fruit")) return "fruits";
    return s.replace(/\s+/g, "-");
  };

  const getSegmentEmoji = (segmentName: string) => {
    const emojiMap: Record<string, string> = {
      "cereals": "🌾", "grains": "🌾", "spices": "🌶️", "oils": "🛢️", "oilseeds": "🛢️",
      "dry-fruits": "🧺", "dryfruits": "🧺", "rice": "🍚", "vegetables": "🥬", "fruits": "🍎", "pulses": "🟤"
    };
    const normalizedName = segmentName?.toLowerCase().replace(/\s+/g, '-') || '';
    return emojiMap[normalizedName] || "📦";
  };

  // Generate categories from API data
  const categories = useMemo(() => {
    const baseCategories = [
      { id: "all", name: { en: "All", hi: "सभी" }, emoji: "📊", commodityCount: overview ? (overview as any).commoditiesTraded : undefined }
    ];
    
    // Handle API response structure - it's an object with segment names as keys
    if (segmentsData && typeof segmentsData === 'object' && !Array.isArray(segmentsData)) {
      const segmentsArray = Object.values(segmentsData).filter((segment: any) => 
        segment && typeof segment === 'object' && segment.name
      );
      
      if (segmentsArray.length > 0) {
        const apiCategories = segmentsArray.slice(0, 5).map((segment: any) => {
          const segmentId = getSegmentSlug(segment.name) || segment.segment;
          return {
            id: segmentId,
            name: { en: segment.name, hi: segment.name },
            emoji: getSegmentEmoji(segment.name),
            commodityCount: (segment as any).total_commodities ?? segment.commodities?.length ?? 0
          };
        });
        return [...baseCategories, ...apiCategories];
      }
    }
    
    // Fallback to static categories
    return [
      { id: "all", name: { en: "All", hi: "सभी" }, emoji: "📊", commodityCount: overview ? (overview as any).commoditiesTraded : undefined },
    { id: "cereals", name: { en: "Cereals", hi: "अनाज" }, emoji: "🌾" },
    { id: "spices", name: { en: "Spices", hi: "मसाले" }, emoji: "🌶️" },
    { id: "oilseeds", name: { en: "Oil Seeds", hi: "तिलहन" }, emoji: "🛢️" },
    { id: "vegetables", name: { en: "Vegetables", hi: "सब्जियां" }, emoji: "🥬" },
    { id: "pulses", name: { en: "Pulses", hi: "दालें" }, emoji: "🟤" },
  ];
  }, [segmentsData]);

  const handleFiltersChange = useCallback((filters: any) => {
    setAppliedFilters(filters);
  }, []);

  const filteredCommodities = commodities.filter((commodity) => {
    // Respect selected segment tab
    if (selectedCategory !== "all") {
      if ((commodity.category || "").toLowerCase() !== selectedCategory) return false;
    }
    // Text search
    if (
      appliedFilters.search &&
      !commodity.name.en.toLowerCase().includes(appliedFilters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const onShareImage = async () => {
    if (!listRef.current) return;
    const dataUrl = await toPng(listRef.current, { cacheBust: true, backgroundColor: '#0b0b0c' });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'mandi-prices.png';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t("bhav.title")}</h1>
            <p className="text-muted-foreground">{t("bhav.subtitle")}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary text-primary-foreground" : ""}
          >
            <Filter className="h-4 w-4 mr-2" />
            {t("common.filter")}
          </Button>
        </div>

        {/* e-NAM Filters with slide animation */}
        <div className={`transition-all duration-300 overflow-hidden ${showFilters ? 'max-h-[800px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
          {showFilters && <ENamFilters onFiltersChange={handleFiltersChange} />}
          </div>

        {/* Debug info while integrating APIs (hidden after stable) */}
        <div className="text-xs text-muted-foreground">
          Params → state:{appliedFilters.state||'-'} district:{appliedFilters.district||'-'} market:{appliedFilters.market||'-'} commodity:{appliedFilters.commodity||'-'} date:{dateParam} • count:{(pricePage?.data||[]).length}
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/50">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="mr-1">{category.emoji}</span>
                <span className="hidden sm:inline">{category.name[t("language") === "hi" ? "hi" : "en"]}</span>
                {'commodityCount' in category && category.commodityCount && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.commodityCount}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4 mt-6">
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Link to="/markets-up" className="group">
                <Card className="bg-gradient-success/10 border-primary/20 hover:bg-gradient-success/20 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:scale-105">
                <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                      {marketsUpTotal !== undefined ? Number(marketsUpTotal).toLocaleString() : "-"}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {t("stats.marketsUp")}
                    </div>
                    <div className="text-xs text-primary/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view details →
                    </div>
                </CardContent>
              </Card>
              </Link>
              <Link to="/markets-down" className="group">
                <Card className="bg-destructive/10 border-destructive/20 hover:bg-destructive/20 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:scale-105">
                <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-destructive group-hover:text-destructive/80 transition-colors">
                      {marketsDownTotal !== undefined ? Number(marketsDownTotal).toLocaleString() : "-"}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {t("stats.marketsDown")}
                    </div>
                    <div className="text-xs text-destructive/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view details →
                    </div>
                </CardContent>
              </Card>
              </Link>
              <Link to="/total-mandis" className="group">
                <Card className="bg-muted/50 hover:bg-muted/70 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:scale-105">
                <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                      {overview ? String((overview as any).totalRegisteredMandis).toLocaleString() : "-"}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {t("stats.totalMandis")}
                    </div>
                    <div className="text-xs text-muted-foreground/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view details →
                    </div>
                </CardContent>
              </Card>
              </Link>
              <Link to="/total-commodities" className="group">
                <Card className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer group-hover:shadow-lg group-hover:scale-105">
                <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-accent-foreground group-hover:text-accent-foreground/80 transition-colors">
                      {overview ? String((overview as any).commoditiesTraded).toLocaleString() : "-"}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {t("stats.commodities")}
                    </div>
                    <div className="text-xs text-accent-foreground/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to view details →
                    </div>
                </CardContent>
              </Card>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onShareImage}>Share as Image</Button>
            </div>

            {/* Commodity List */}
            <div className="space-y-4" ref={listRef}>
              {isLoading && (
                <>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={`s-${i}`} className="bg-muted/30 animate-pulse border-border/40">
                      <CardContent className="p-6">
                        <div className="h-5 w-40 bg-muted rounded mb-4" />
                        <div className="h-8 w-32 bg-muted rounded" />
                      </CardContent>
                </Card>
                  ))}
                </>
              )}
              {isError && (
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-6 text-sm">Error loading prices</CardContent>
                </Card>
              )}
              {filteredCommodities.map((commodity, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {commodity.name[t("language") === "hi" ? "hi" : "en"]}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {commodity.variety[t("language") === "hi" ? "hi" : "en"]}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="w-4 h-4" />
                            <span>{commodity.location[t("language") === "hi" ? "hi" : "en"]}</span>
                            <span>•</span>
                            <span>{commodity.state[t("language") === "hi" ? "hi" : "en"]}</span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price & Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-2xl font-bold text-foreground">{commodity.price}</div>
                            <div className="text-xs text-muted-foreground">
                              per {commodity.unit[t("language") === "hi" ? "hi" : "en"]}
                            </div>
                          </div>
                          
                          <Badge 
                            variant={commodity.trend === "up" ? "default" : "destructive"}
                            className={`text-sm ${
                              commodity.trend === "up" 
                                ? "bg-gradient-success text-primary-foreground" 
                                : "bg-destructive text-destructive-foreground"
                            }`}
                          >
                            {commodity.trend === "up" ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {commodity.change} ({commodity.changePercent})
                          </Badge>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium text-foreground">
                            {commodity.quality[t("language") === "hi" ? "hi" : "en"]}
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {commodity.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredCommodities.length === 0 && (
                <Card className="bg-muted/20 border-dashed">
                  <CardContent className="p-8 text-center">
                    <div className="text-muted-foreground">
                      {t("bhav.noResults")}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 z-40 rounded-full bg-primary text-primary-foreground shadow-elevated px-4 py-2 text-sm"
        >
          Back to top
        </button>
      )}

      <BottomNav />
    </div>
  );
};

export default BhavPage;