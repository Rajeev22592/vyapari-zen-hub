import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, MapPin, BarChart3, Download } from "lucide-react";

const PriceHistoryPage = () => {
  const { t } = useLanguage();

  // Sample price history data
  const dailyData = [
    { date: '01/01', price: 2000, volume: 45 },
    { date: '02/01', price: 2020, volume: 52 },
    { date: '03/01', price: 1980, volume: 48 },
    { date: '04/01', price: 2050, volume: 55 },
    { date: '05/01', price: 2100, volume: 62 },
    { date: '06/01', price: 2080, volume: 58 },
    { date: '07/01', price: 2120, volume: 65 }
  ];

  const weeklyData = [
    { date: 'सप्ताह 1', price: 2010, volume: 320 },
    { date: 'सप्ताह 2', price: 2040, volume: 350 },
    { date: 'सप्ताह 3', price: 2080, volume: 380 },
    { date: 'सप्ताह 4', price: 2100, volume: 400 }
  ];

  const monthlyData = [
    { date: 'जनवरी', price: 2050, volume: 1500 },
    { date: 'फरवरी', price: 2100, volume: 1600 },
    { date: 'मार्च', price: 2080, volume: 1550 },
    { date: 'अप्रैल', price: 2120, volume: 1700 }
  ];

  const priceStats = {
    current: "₹2,120",
    highest: "₹2,150",
    lowest: "₹1,980",
    average: "₹2,065",
    change: "+70",
    changePercent: "+3.4%",
    isPositive: true
  };

  const marketComparison = [
    { market: "कानपुर मंडी", price: "₹2,120", change: "+3.4%" },
    { market: "दिल्ली मंडी", price: "₹2,100", change: "+2.9%" },
    { market: "जयपुर मंडी", price: "₹2,080", change: "+1.5%" },
    { market: "लुधियाना मंडी", price: "₹2,140", change: "+4.1%" }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`तारीख: ${label}`}</p>
          <p className="text-primary">{`मूल्य: ₹${payload[0].value}`}</p>
          {payload[1] && <p className="text-accent">{`वॉल्यूम: ${payload[1].value} क्विंटल`}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="p-4 space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">मूल्य इतिहास</h1>
            <p className="text-muted-foreground">कमोडिटी के ऐतिहासिक मूल्य और ट्रेंड देखें</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            डाउनलोड
          </Button>
        </div>

        {/* Commodity Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select defaultValue="wheat">
            <SelectTrigger>
              <SelectValue placeholder="कमोडिटी चुनें" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wheat">गेहूं</SelectItem>
              <SelectItem value="rice">धान</SelectItem>
              <SelectItem value="mustard">सरसों</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="kanpur">
            <SelectTrigger>
              <SelectValue placeholder="मंडी चुनें" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kanpur">कानपुर मंडी</SelectItem>
              <SelectItem value="delhi">दिल्ली मंडी</SelectItem>
              <SelectItem value="jaipur">जयपुर मंडी</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="grade-a">
            <SelectTrigger>
              <SelectValue placeholder="गुणवत्ता चुनें" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade-a">Grade A</SelectItem>
              <SelectItem value="grade-b">Grade B</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current Price Stats */}
        <Card className="border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{priceStats.current}</div>
                <div className="text-sm text-muted-foreground">वर्तमान मूल्य</div>
                <div className={`flex items-center justify-center gap-1 text-sm font-medium ${
                  priceStats.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {priceStats.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {priceStats.change} ({priceStats.changePercent})
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-green-600">{priceStats.highest}</div>
                <div className="text-sm text-muted-foreground">उच्चतम मूल्य</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-red-600">{priceStats.lowest}</div>
                <div className="text-sm text-muted-foreground">न्यूनतम मूल्य</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-semibold text-foreground">{priceStats.average}</div>
                <div className="text-sm text-muted-foreground">औसत मूल्य</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Chart */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              मूल्य चार्ट
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">दैनिक</TabsTrigger>
                <TabsTrigger value="weekly">साप्ताहिक</TabsTrigger>
                <TabsTrigger value="monthly">मासिक</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="weekly" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
              
              <TabsContent value="monthly" className="mt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="price" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Market Comparison */}
        <Card className="border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle>मंडी तुलना</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketComparison.map((market, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{market.market}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{market.price}</span>
                    <Badge variant="outline" className="text-green-600">
                      {market.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
};

export default PriceHistoryPage;