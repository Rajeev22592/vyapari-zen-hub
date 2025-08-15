import { useState, useCallback } from "react";
import { ArrowUpDown, Filter, TrendingUp, TrendingDown, MapPin, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ENamFilters from "@/components/filters/ENamFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

const BhavPage = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: ""
  });

  // Sample commodity data with e-NAM style data
  const commodities = [
    { 
      name: { en: "Wheat", hi: "गेहूं" }, 
      price: "₹2,830", 
      change: "+20", 
      changePercent: "+0.7%", 
      location: { en: "Bikaner APMC", hi: "बीकानेर एपीएमसी" }, 
      state: { en: "Rajasthan", hi: "राजस्थान" },
      category: "cereals", 
      trend: "up",
      variety: { en: "HD-2967", hi: "एचडी-2967" },
      quality: { en: "FAQ", hi: "एफएक्यू" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "2 mins ago"
    },
    { 
      name: { en: "Cumin", hi: "जीरा" }, 
      price: "₹38,100", 
      change: "-150", 
      changePercent: "-0.4%", 
      location: { en: "Rajkot APMC", hi: "राजकोट एपीएमसी" }, 
      state: { en: "Gujarat", hi: "गुजरात" },
      category: "spices", 
      trend: "down",
      variety: { en: "Bold", hi: "बोल्ड" },
      quality: { en: "Good", hi: "अच्छी" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "5 mins ago"
    },
    { 
      name: { en: "Basmati Rice", hi: "बासमती चावल" }, 
      price: "₹4,200", 
      change: "+50", 
      changePercent: "+1.2%", 
      location: { en: "Karnal Mandi", hi: "करनाल मंडी" }, 
      state: { en: "Haryana", hi: "हरियाणा" },
      category: "cereals", 
      trend: "up",
      variety: { en: "Pusa 1121", hi: "पूसा 1121" },
      quality: { en: "Superfine", hi: "सुपरफाइन" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "1 min ago"
    },
    { 
      name: { en: "Turmeric", hi: "हल्दी" }, 
      price: "₹12,500", 
      change: "+200", 
      changePercent: "+1.6%", 
      location: { en: "Nashik APMC", hi: "नासिक एपीएमसी" }, 
      state: { en: "Maharashtra", hi: "महाराष्ट्र" },
      category: "spices", 
      trend: "up",
      variety: { en: "Finger", hi: "फिंगर" },
      quality: { en: "Good", hi: "अच्छी" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "3 mins ago"
    },
    { 
      name: { en: "Groundnut", hi: "मूंगफली" }, 
      price: "₹6,450", 
      change: "-25", 
      changePercent: "-0.4%", 
      location: { en: "Guntur APMC", hi: "गुंटूर एपीएमसी" }, 
      state: { en: "Andhra Pradesh", hi: "आंध्र प्रदेश" },
      category: "oilseeds", 
      trend: "down",
      variety: { en: "Bold", hi: "बोल्ड" },
      quality: { en: "FAQ", hi: "एफएक्यू" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "4 mins ago"
    },
    { 
      name: { en: "Onion", hi: "प्याज" }, 
      price: "₹3,200", 
      change: "+100", 
      changePercent: "+3.2%", 
      location: { en: "Lasalgaon APMC", hi: "लासलगांव एपीएमसी" }, 
      state: { en: "Maharashtra", hi: "महाराष्ट्र" },
      category: "vegetables", 
      trend: "up",
      variety: { en: "Red", hi: "लाल" },
      quality: { en: "Medium", hi: "मध्यम" },
      unit: { en: "Quintal", hi: "क्विंटल" },
      lastUpdated: "6 mins ago"
    }
  ];

  const categories = [
    { id: "all", name: { en: "All", hi: "सभी" }, emoji: "📊" },
    { id: "cereals", name: { en: "Cereals", hi: "अनाज" }, emoji: "🌾" },
    { id: "spices", name: { en: "Spices", hi: "मसाले" }, emoji: "🌶️" },
    { id: "oilseeds", name: { en: "Oil Seeds", hi: "तिलहन" }, emoji: "🛢️" },
    { id: "vegetables", name: { en: "Vegetables", hi: "सब्जियां" }, emoji: "🥬" },
    { id: "pulses", name: { en: "Pulses", hi: "दालें" }, emoji: "🟤" },
  ];

  const handleFiltersChange = useCallback((filters: any) => {
    setAppliedFilters(filters);
  }, []);

  const filteredCommodities = commodities.filter(commodity => {
    if (selectedCategory !== "all" && commodity.category !== selectedCategory) return false;
    if (appliedFilters.search && !commodity.name.en.toLowerCase().includes(appliedFilters.search.toLowerCase())) return false;
    return true;
  });

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

        {/* e-NAM Filters */}
        {showFilters && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <ENamFilters onFiltersChange={handleFiltersChange} />
          </div>
        )}

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
                {category.name[t("language") === "hi" ? "hi" : "en"]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-4 mt-6">
            {/* Market Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-success/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">{t("stats.marketsUp")}</div>
                </CardContent>
              </Card>
              <Card className="bg-destructive/10 border-destructive/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">42</div>
                  <div className="text-sm text-muted-foreground">{t("stats.marketsDown")}</div>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-foreground">1,522</div>
                  <div className="text-sm text-muted-foreground">{t("stats.totalMandis")}</div>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-accent-foreground">231</div>
                  <div className="text-sm text-muted-foreground">{t("stats.commodities")}</div>
                </CardContent>
              </Card>
            </div>

            {/* Commodity List */}
            <div className="space-y-4">
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

      <BottomNav />
    </div>
  );
};

export default BhavPage;