import { TrendingUp, MapPin, BarChart3, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ENamStats = () => {
  const { t } = useLanguage();

  const stats = [
    {
      icon: MapPin,
      value: "1,361",
      label: t("enam.totalMandis"),
      trend: "+47",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      value: "22",
      label: t("enam.totalStates"),
      trend: "+3",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      value: "856",
      label: t("enam.liveMarkets"),
      trend: "+124",
      color: "text-green-600"
    },
    {
      icon: ShoppingCart,
      value: "236",
      label: t("enam.commoditiesTraded"),
      trend: "+18",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="px-4 py-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">{t("header.title")}</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("header.subtitle")} - Market insights and trading opportunities
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary/10 flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600 font-medium">{stat.trend}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ENamStats;