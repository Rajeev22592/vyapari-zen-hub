import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, TrendingDown, MapPin, Bell, Star, Trash2, BarChart3, Settings } from "lucide-react";

const WatchlistPage = () => {
  const { t } = useLanguage();

  const watchlistItems = [
    {
      id: 1,
      commodity: "गेहूं",
      market: "कानपुर मंडी",
      currentPrice: "₹2,100",
      lastPrice: "₹2,050",
      change: "+50",
      changePercent: "+2.4%",
      isPositive: true,
      targetPrice: "₹2,200",
      avgPrice: "₹2,075",
      highAlert: true,
      lowAlert: false
    },
    {
      id: 2,
      commodity: "धान",
      market: "लुधियाना मंडी",
      currentPrice: "₹1,850",
      lastPrice: "₹1,900",
      change: "-50",
      changePercent: "-2.6%",
      isPositive: false,
      targetPrice: "₹1,800",
      avgPrice: "₹1,875",
      highAlert: false,
      lowAlert: true
    },
    {
      id: 3,
      commodity: "सरसों",
      market: "जयपुर मंडी",
      currentPrice: "₹4,800",
      lastPrice: "₹4,750",
      change: "+50",
      changePercent: "+1.1%",
      isPositive: true,
      targetPrice: "₹5,000",
      avgPrice: "₹4,775",
      highAlert: false,
      lowAlert: false
    }
  ];

  const priceAlerts = [
    {
      id: 1,
      commodity: "गेहूं",
      message: "₹2,100 के ऊपर पहुंच गया",
      time: "10 मिनट पहले",
      type: "high"
    },
    {
      id: 2,
      commodity: "धान",
      message: "₹1,850 के नीचे गिर गया",
      time: "25 मिनट पहले",
      type: "low"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Watchlist</h1>
            <p className="text-muted-foreground">अपनी पसंदीदा कमोडिटी पर नज़र रखें</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            सेटिंग्स
          </Button>
        </div>

        {/* Price Alerts */}
        {priceAlerts.length > 0 && (
          <Card className="border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-600" />
                हाल की अलर्ट
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {priceAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 bg-background rounded-md">
                  <div>
                    <div className="font-medium text-sm">{alert.commodity}</div>
                    <div className="text-xs text-muted-foreground">{alert.message}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Watchlist Items */}
        <div className="space-y-4">
          {watchlistItems.map((item) => (
            <Card key={item.id} className="border-border/50 shadow-soft hover:shadow-elevated transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{item.commodity}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {item.market}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-foreground">{item.currentPrice}</div>
                    <div className="flex items-center gap-1">
                      {item.isPositive ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        item.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change} ({item.changePercent})
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">टारगेट प्राइस</div>
                    <div className="font-semibold">{item.targetPrice}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">पिछला भाव: </span>
                    <span className="font-medium">{item.lastPrice}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">औसत भाव: </span>
                    <span className="font-medium">{item.avgPrice}</span>
                  </div>
                </div>

                {/* Price Alerts Settings */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">मूल्य अलर्ट:</span>
                    <div className="flex gap-2">
                      <Badge variant={item.highAlert ? "default" : "outline"} className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        हाई
                      </Badge>
                      <Badge variant={item.lowAlert ? "default" : "outline"} className="text-xs">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        लो
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add to Watchlist */}
        <Card className="border-dashed border-2 border-border/50">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <h3 className="font-medium mb-1">नई कमोडिटी जोड़ें</h3>
            <p className="text-sm text-muted-foreground mb-4">
              अपनी वॉचलिस्ट में नई कमोडिटी जोड़कर मूल्य पर नज़र रखें
            </p>
            <Button variant="outline">
              वॉचलिस्ट में जोड़ें
            </Button>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default WatchlistPage;