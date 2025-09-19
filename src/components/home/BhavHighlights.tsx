import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchPrices, fetchPriceHighlights } from "@/services/prices";

type Filters = {
  state?: string;
  district?: string;
  market?: string;
  commodity?: string;
  search?: string;
};

const STORAGE_KEY = "enam-filters";

const BhavHighlights: React.FC<{ filters?: Filters }> = ({ filters }) => {
  const { t } = useLanguage();
  const today = new Date().toISOString().slice(0, 10);
  const saved: Filters | undefined = (() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  })();
  const applied: Filters = { ...(saved || {}), ...(filters || {}) };
  const commodityParam = (() => {
    const c = (applied.commodity || "").trim();
    if (!c) return {} as Record<string, unknown>;
    if (/^\d+$/.test(c)) return { commodity: c } as Record<string, unknown>;
    return { commodity_name: c.replace(/-/g, " ") } as Record<string, unknown>;
  })();
  const { data } = useQuery({
    queryKey: ["bhav","highlights", { ...applied, ...commodityParam, date: today }],
    queryFn: async () => {
      // Use highlights API if no filters applied, otherwise use bhav API with filters
      if (!applied.state && !applied.district && !applied.market && !applied.commodity && !applied.search) {
        return await fetchPriceHighlights();
      }
      const result = await fetchPrices({
        state: applied.state || undefined,
        district: applied.district || undefined,
        market: applied.market || undefined,
        ...(commodityParam),
        search: applied.search || undefined,
        date: today,
        page: 1,
        perPage: 3,
      });
      return result.data || [];
    },
  });
  const highlights = (() => {
    const items = data || [];
    return items.slice(0, 3).map((p: any) => ({
      commodity: p.commodity?.name,
      price: `₹${(p.modal_price ?? p.max_price ?? 0).toLocaleString()}`,
      change: p.change_abs ? `${p.change_abs > 0 ? "+" : ""}${p.change_abs}` : "",
      location: p.market?.name,
      trend: (p.change_abs || 0) >= 0 ? "up" : "down",
      category: p.commodity?.segment || "",
    }));
  })();

  return (
    <section className="mx-4 my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center">
          📊 {t("bhav.highlights.title")}
        </h2>
        <Link to="/bhav">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            {t("bhav.highlights.viewAll")} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {highlights.map((item: any, index: number) => (
          <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.commodity}
                </CardTitle>
                <Badge 
                  variant={item.trend === "up" ? "default" : "destructive"}
                  className={`text-xs ${
                    item.trend === "up" 
                      ? "bg-gradient-success text-primary-foreground" 
                      : "bg-destructive text-destructive-foreground"
                  }`}
                >
                  {item.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {item.change}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-foreground">{item.price}</div>
                <div className="text-sm text-muted-foreground flex items-center">
                  <span className="text-xs bg-muted px-2 py-1 rounded-full">
                    {item.location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default BhavHighlights;