import { useMemo, useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketsUp } from "@/services/prices";
import ENamFilters from "@/components/filters/ENamFilters";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const MarketsUpPage = () => {
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const dateParam = new Date().toISOString().slice(0, 10);
  const { data } = useQuery({
    queryKey: ["markets-up", filters, dateParam, currentPage, perPage],
    queryFn: () =>
      fetchMarketsUp({
        state_id: filters.state || undefined,
        district_id: filters.district || undefined,
        segment: undefined,
        date: dateParam,
        page: currentPage,
        perPage,
      }),
  });

  const items = useMemo(() => (data?.data ? data.data : []), [data]);
  const total = (data as any)?.meta?.total ?? (data as any)?.total ?? 0;
  const totalPages = total ? Math.ceil(Number(total) / perPage) : 1;

  const getCommodityImage = (commodity: string, segment?: string) => {
    const commodityLower = commodity?.toLowerCase() || "";
    const segmentLower = segment?.toLowerCase() || "";
    
    // Segment-based images
    if (segmentLower.includes("grain") || segmentLower.includes("cereal")) {
      return "🌾";
    } else if (segmentLower.includes("pulse")) {
      return "🟤";
    } else if (segmentLower.includes("oil")) {
      return "🛢️";
    } else if (segmentLower.includes("spice")) {
      return "🌶️";
    } else if (segmentLower.includes("dry") || segmentLower.includes("fruit")) {
      return "🧺";
    } else if (segmentLower.includes("rice")) {
      return "🍚";
    } else if (segmentLower.includes("vegetable")) {
      return "🥬";
    }
    
    // Commodity-specific images
    if (commodityLower.includes("wheat") || commodityLower.includes("गेहूं")) {
      return "🌾";
    } else if (commodityLower.includes("rice") || commodityLower.includes("चावल")) {
      return "🍚";
    } else if (commodityLower.includes("corn") || commodityLower.includes("मक्का")) {
      return "🌽";
    } else if (commodityLower.includes("barley") || commodityLower.includes("जौ")) {
      return "🌾";
    } else if (commodityLower.includes("millet") || commodityLower.includes("बाजरा")) {
      return "🌾";
    } else if (commodityLower.includes("dal") || commodityLower.includes("दाल")) {
      return "🟤";
    } else if (commodityLower.includes("lentil") || commodityLower.includes("मसूर")) {
      return "🟤";
    } else if (commodityLower.includes("chickpea") || commodityLower.includes("चना")) {
      return "🟤";
    } else if (commodityLower.includes("oil") || commodityLower.includes("तेल")) {
      return "🛢️";
    } else if (commodityLower.includes("mustard") || commodityLower.includes("सरसों")) {
      return "🛢️";
    } else if (commodityLower.includes("sunflower") || commodityLower.includes("सूरजमुखी")) {
      return "🌻";
    } else if (commodityLower.includes("spice") || commodityLower.includes("मसाला")) {
      return "🌶️";
    } else if (commodityLower.includes("turmeric") || commodityLower.includes("हल्दी")) {
      return "🟡";
    } else if (commodityLower.includes("cumin") || commodityLower.includes("जीरा")) {
      return "🌶️";
    } else if (commodityLower.includes("coriander") || commodityLower.includes("धनिया")) {
      return "🌿";
    } else if (commodityLower.includes("dry") || commodityLower.includes("सूखा")) {
      return "🧺";
    } else if (commodityLower.includes("almond") || commodityLower.includes("बादाम")) {
      return "🥜";
    } else if (commodityLower.includes("cashew") || commodityLower.includes("काजू")) {
      return "🥜";
    } else if (commodityLower.includes("walnut") || commodityLower.includes("अखरोट")) {
      return "🥜";
    } else if (commodityLower.includes("vegetable") || commodityLower.includes("सब्जी")) {
      return "🥬";
    } else if (commodityLower.includes("tomato") || commodityLower.includes("टमाटर")) {
      return "🍅";
    } else if (commodityLower.includes("onion") || commodityLower.includes("प्याज")) {
      return "🧅";
    } else if (commodityLower.includes("potato") || commodityLower.includes("आलू")) {
      return "🥔";
    }
    
    // Default fallback
    return "📦";
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
              <h1 className="text-2xl font-bold">Markets Up</h1>
            </div>
            <p className="text-muted-foreground">Average modal price rose vs yesterday • {total}</p>
          </div>
        </div>

        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-4">
            <ENamFilters onFiltersChange={setFilters} />
          </CardContent>
        </Card>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((row: any, idx: number) => {
            // API: data[].market, data[].today_modal, data[].yesterday_modal, data[].delta, data[].items
            const market = row?.market || row?.market_name || "-";
            const price = Number(row?.today_modal ?? 0);
            const change = Number(row?.delta ?? 0);
            const primaryCommodity = row?.commodity || "-";
            const state = row?.state_name || row?.state || "-";
            const district = row?.district_name || row?.district || row?.market_district || "";
            const segment = row?.segment || "";
            const commodityImage = getCommodityImage(primaryCommodity, segment);
            return (
              <Card key={idx} className="bg-background border-border/70 shadow-soft hover:shadow-elevated transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="truncate mr-2">{primaryCommodity}</span>
                    <Badge className="bg-gradient-success">{change > 0 ? `+${change}` : change}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center text-lg">
                        {commodityImage}
                      </div>
                      <div className="text-foreground text-xl font-semibold">₹{Number(price).toLocaleString()}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {market}{district ? ` • ${district}` : ""}{state && state !== "-" ? ` • ${state}` : ""}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {primaryCommodity}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>Date: {row?.date || row?.priced_on || dateParam}</div>
                    <div className="text-xs">Unit: {row?.unit || row?.commodity?.unit || "Quintal"}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {items.length === 0 && (
            <Card className="bg-muted/20 border-dashed col-span-full">
              <CardContent className="p-8 text-center text-muted-foreground">No markets found.</CardContent>
            </Card>
          )}
        </div>

        {totalPages > 1 && (
          <Card className="bg-background border-border/70 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * perPage) + 1} to {Math.min(currentPage * perPage, total)} of {total}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page)} className="w-8 h-8 p-0">
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default MarketsUpPage;

