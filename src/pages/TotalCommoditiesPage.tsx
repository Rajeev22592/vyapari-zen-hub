import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchOverviewStats } from "@/services/stats";
import { fetchCommoditiesPaginated, fetchCommodities } from "@/services/prices";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, ChevronLeft, ChevronRight } from "lucide-react";

const TotalCommoditiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSegment, setSelectedSegment] = useState("");

  const { data: statsData } = useQuery({
    queryKey: ["overview-stats"],
    queryFn: () => fetchOverviewStats(),
  });


  const { data: commoditiesData, isLoading: commoditiesLoading, error: commoditiesError } = useQuery({
    queryKey: ["commodities-paginated", currentPage, selectedSegment],
    queryFn: async () => {
      console.log('=== FETCHING COMMODITIES (NO FILTERS) ===');
      console.log('Current page:', currentPage);
      console.log('Selected segment:', selectedSegment);
      
      const params = {
        page: currentPage,
        perPage: 20,
        segment: selectedSegment || undefined,
        _ts: Date.now(),
        _cache: 'no-cache',
      };
      
      console.log('API params:', params);
      
      try {
        // Try paginated API first
        const result = await fetchCommoditiesPaginated(params);
        console.log('Paginated API result:', result);
        return result;
      } catch (error) {
        console.error('Paginated API failed, trying regular API:', error);
        
        // Fallback to regular commodities API
        try {
          const allCommodities = await fetchCommodities();
          console.log('Regular API result:', allCommodities);
          
          // Simulate pagination for regular API
          const startIndex = (currentPage - 1) * 20;
          const endIndex = startIndex + 20;
          const paginatedCommodities = Array.isArray(allCommodities) ? allCommodities.slice(startIndex, endIndex) : [];
          
          return {
            data: paginatedCommodities,
            meta: {
              page: currentPage,
              perPage: 20,
              total: Array.isArray(allCommodities) ? allCommodities.length : 0,
              nextPage: endIndex < (Array.isArray(allCommodities) ? allCommodities.length : 0) ? currentPage + 1 : undefined,
              prevPage: currentPage > 1 ? currentPage - 1 : undefined,
            }
          };
        } catch (fallbackError) {
          console.error('Both APIs failed:', fallbackError);
          throw fallbackError;
        }
      }
    },
  });

  const totalCommodities = statsData?.commoditiesTraded ?? 0;
  const totalMandis = statsData?.totalRegisteredMandis ?? 0;
  const liveMarkets = statsData?.liveMarketsToday ?? 0;

  // Get commodities from API response
  const commodities = Array.isArray(commoditiesData) ? commoditiesData : (commoditiesData?.data || []);
  const totalPages = commoditiesData?.meta?.total ? Math.ceil(commoditiesData.meta.total / 20) : Math.ceil(commodities.length / 20);
  const currentTotal = commoditiesData?.meta?.total || commodities.length || 0;


  // Generate segments - always use static segments to ensure all are available
  const segments = [
    { value: "", label: "All Segments", emoji: "📊" },
    { value: "grains", label: "Grains", emoji: "🌾" },
    { value: "pulses", label: "Pulses", emoji: "🟤" },
    { value: "oils", label: "Oils", emoji: "🛢️" },
    { value: "spices", label: "Spices", emoji: "🌶️" },
    { value: "dry-fruits", label: "Dry Fruits", emoji: "🧺" },
    { value: "rice", label: "Rice", emoji: "🍚" },
    { value: "vegetables", label: "Vegetables", emoji: "🥬" },
    { value: "fruits", label: "Fruits", emoji: "🍎" },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSegmentChange = (segment: string) => {
    setSelectedSegment(segment);
    setCurrentPage(1); // Reset to first page when changing segment
  };


  const getSegmentColor = (segment: string) => {
    switch (segment?.toLowerCase()) {
      case "grains": return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case "oils": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "spices": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "pulses": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "dry-fruits": return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "rice": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400";
      case "vegetables": return "bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400";
      case "fruits": return "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getCommodityImage = (commodity: any) => {
    const name = (commodity.name || '').toLowerCase();
    const segment = (commodity.segment || '').toLowerCase();
    
    // Grains
    if (name.includes('wheat') || name.includes('गेहूं')) return '🌾';
    if (name.includes('barley') || name.includes('जौ')) return '🌾';
    if (name.includes('bajra') || name.includes('बाजरा')) return '🌾';
    if (name.includes('jowar') || name.includes('ज्वार')) return '🌾';
    if (name.includes('maize') || name.includes('मक्का')) return '🌽';
    if (name.includes('corn')) return '🌽';
    
    // Rice
    if (name.includes('rice') || name.includes('चावल') || name.includes('basmati')) return '🍚';
    
    // Pulses
    if (name.includes('chana') || name.includes('चना') || name.includes('gram')) return '🟤';
    if (name.includes('arhar') || name.includes('अरहर') || name.includes('tur')) return '🟤';
    if (name.includes('moong') || name.includes('मूंग')) return '🟤';
    if (name.includes('urad') || name.includes('उड़द')) return '🟤';
    if (name.includes('masur') || name.includes('मसूर') || name.includes('lentil')) return '🟤';
    if (name.includes('kabuli') || name.includes('काबुली')) return '🟤';
    
    // Oilseeds
    if (name.includes('mustard') || name.includes('सरसों')) return '🛢️';
    if (name.includes('groundnut') || name.includes('मूंगफली') || name.includes('peanut')) return '🥜';
    if (name.includes('soybean') || name.includes('सोयाबीन')) return '🫘';
    if (name.includes('sunflower') || name.includes('सूरजमुखी')) return '🌻';
    if (name.includes('sesame') || name.includes('तिल')) return '🫘';
    if (name.includes('safflower') || name.includes('कुसुम')) return '🌻';
    
    // Spices
    if (name.includes('turmeric') || name.includes('हल्दी')) return '🟡';
    if (name.includes('coriander') || name.includes('धनिया')) return '🌿';
    if (name.includes('cumin') || name.includes('जीरा')) return '🌿';
    if (name.includes('fenugreek') || name.includes('मेथी')) return '🌿';
    if (name.includes('chilli') || name.includes('मिर्च') || name.includes('pepper')) return '🌶️';
    if (name.includes('cardamom') || name.includes('इलायची')) return '🟢';
    if (name.includes('clove') || name.includes('लौंग')) return '🟤';
    if (name.includes('cinnamon') || name.includes('दालचीनी')) return '🟤';
    
    // Dry Fruits
    if (name.includes('almond') || name.includes('बादाम')) return '🥜';
    if (name.includes('cashew') || name.includes('काजू')) return '🥜';
    if (name.includes('walnut') || name.includes('अखरोट')) return '🥜';
    if (name.includes('pistachio') || name.includes('पिस्ता')) return '🥜';
    if (name.includes('date') || name.includes('खजूर')) return '🫐';
    if (name.includes('raisin') || name.includes('किशमिश')) return '🍇';
    
    // Vegetables
    if (name.includes('tomato') || name.includes('टमाटर')) return '🍅';
    if (name.includes('onion') || name.includes('प्याज')) return '🧅';
    if (name.includes('potato') || name.includes('आलू')) return '🥔';
    if (name.includes('cabbage') || name.includes('पत्ता गोभी')) return '🥬';
    if (name.includes('cauliflower') || name.includes('फूल गोभी')) return '🥦';
    if (name.includes('brinjal') || name.includes('बैंगन') || name.includes('eggplant')) return '🍆';
    if (name.includes('carrot') || name.includes('गाजर')) return '🥕';
    if (name.includes('cucumber') || name.includes('खीरा')) return '🥒';
    if (name.includes('spinach') || name.includes('पालक')) return '🥬';
    if (name.includes('ginger') || name.includes('अदरक')) return '🫚';
    if (name.includes('garlic') || name.includes('लहसुन')) return '🧄';
    if (name.includes('chili') || name.includes('हरी मिर्च')) return '🌶️';
    if (name.includes('peas') || name.includes('मटर')) return '🫛';
    if (name.includes('beans') || name.includes('बीन्स')) return '🫛';
    if (name.includes('okra') || name.includes('भिंडी')) return '🫛';
    
    // Fruits
    if (name.includes('apple') || name.includes('सेब')) return '🍎';
    if (name.includes('banana') || name.includes('केला')) return '🍌';
    if (name.includes('orange') || name.includes('संतरा')) return '🍊';
    if (name.includes('mango') || name.includes('आम')) return '🥭';
    if (name.includes('grapes') || name.includes('अंगूर')) return '🍇';
    if (name.includes('pomegranate') || name.includes('अनार')) return '🍎';
    if (name.includes('papaya') || name.includes('पपीता')) return '🥭';
    if (name.includes('guava') || name.includes('अमरूद')) return '🍎';
    if (name.includes('watermelon') || name.includes('तरबूज')) return '🍉';
    if (name.includes('melon') || name.includes('खरबूजा')) return '🍈';
    if (name.includes('lemon') || name.includes('नींबू')) return '🍋';
    if (name.includes('lime') || name.includes('कागजी नींबू')) return '🍋';
    if (name.includes('amla') || name.includes('आंवला')) return '🫐';
    if (name.includes('coconut') || name.includes('नारियल')) return '🥥';
    
    // Fallback based on segment
    if (segment.includes('grain')) return '🌾';
    if (segment.includes('pulse')) return '🟤';
    if (segment.includes('oil')) return '🛢️';
    if (segment.includes('spice')) return '🌶️';
    if (segment.includes('dry')) return '🥜';
    if (segment.includes('rice')) return '🍚';
    if (segment.includes('vegetable')) return '🥬';
    if (segment.includes('fruit')) return '🍎';
    
    // Default fallback
    return '📦';
  };

  // Simple commodity display with pagination
  const displayCommodities = useMemo(() => {
    if (!Array.isArray(commodities)) return [];
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;
    return commodities.slice(startIndex, endIndex);
  }, [commodities, currentPage]);

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
              <h1 className="text-2xl font-bold">Total Commodities</h1>
            </div>
            <p className="text-muted-foreground">Agricultural commodities traded across India • {totalCommodities.toLocaleString()}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary/10 border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalCommodities.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Commodities</div>
            </CardContent>
          </Card>
           <Card className="bg-gradient-success/10 border-success/20">
             <CardContent className="p-4 text-center">
               <div className="text-2xl font-bold text-green-600">{selectedSegment ? 1 : 6}</div>
               <div className="text-sm text-muted-foreground">Categories</div>
             </CardContent>
           </Card>
          <Card className="bg-gradient-accent/10 border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-foreground">{totalMandis.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Trading Mandis</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-warning/10 border-warning/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{liveMarkets.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Markets</div>
            </CardContent>
          </Card>
        </div>



         {/* Segment Filter */}
         <Card className="bg-background border-border/70 shadow-soft">
           <CardContent className="p-4">
             <div className="flex items-center gap-4">
               <label className="text-sm font-medium">Filter by Segment:</label>
               <div className="flex flex-wrap gap-2">
                 {segments.map((segment) => (
                   <Button
                     key={segment.value}
                     variant={selectedSegment === segment.value ? "default" : "outline"}
                     size="sm"
                     onClick={() => handleSegmentChange(segment.value)}
                     className="text-xs"
                   >
                     {segment.label}
                   </Button>
                 ))}
               </div>
             </div>
           </CardContent>
         </Card>

         {/* Segment Columns Layout */}
         <div className="space-y-6">
           {commoditiesLoading ? (
             <div className="space-y-4">
               {Array.from({ length: 3 }).map((_, i) => (
                 <Card key={i} className="bg-muted/30 animate-pulse">
                   <CardContent className="p-6">
                     <div className="h-5 w-40 bg-muted rounded mb-4" />
                     <div className="grid grid-cols-4 gap-4">
                       {Array.from({ length: 4 }).map((_, j) => (
                         <div key={j} className="h-16 bg-muted rounded" />
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               ))}
             </div>
           ) : commoditiesError ? (
             <Card className="bg-destructive/10 border-destructive/20">
               <CardContent className="p-6 text-center">
                 <p className="text-destructive">Failed to load commodities data</p>
               </CardContent>
             </Card>
           ) : (
             <>
               {/* Simple commodities grid */}
               <Card className="bg-background border-border/70 shadow-soft">
                 <CardHeader className="pb-4">
                   <CardTitle className="text-lg flex items-center gap-3">
                     <Package className="h-5 w-5 text-primary" />
                     <span>Commodities</span>
                     <Badge className="bg-muted text-muted-foreground">
                       {currentTotal} total commodities
                     </Badge>
                   </CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                     {displayCommodities.map((commodity, idx) => (
                       <div
                         key={commodity.id || idx}
                         className="flex flex-col items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors text-center group"
                       >
                         <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200">
                           <span className="text-2xl">{getCommodityImage(commodity)}</span>
                         </div>
                         <div className="font-medium text-sm mb-1 line-clamp-2">{commodity.name || 'Unknown Commodity'}</div>
                         <div className="text-xs text-muted-foreground mb-2">
                           Unit: {commodity.unit || "Quintal"}
                         </div>
                         {commodity.segment && (
                           <Badge className={`${getSegmentColor(commodity.segment)} text-xs`} variant="outline">
                             {commodity.segment}
                           </Badge>
                         )}
                       </div>
                     ))}
                   </div>
                 </CardContent>
               </Card>

               {/* Pagination */}
               {totalPages > 1 && (
                 <Card className="bg-background border-border/70 shadow-soft">
                   <CardContent className="p-4">
                     <div className="flex items-center justify-between">
                       <div className="text-sm text-muted-foreground">
                         Showing {((currentPage - 1) * 20) + 1} to {Math.min(currentPage * 20, currentTotal)} of {currentTotal} commodities
                       </div>
                       <div className="flex items-center gap-2">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => handlePageChange(currentPage - 1)}
                           disabled={currentPage === 1}
                         >
                           <ChevronLeft className="h-4 w-4" />
                           Previous
                         </Button>
                         <div className="flex items-center gap-1">
                           {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                             const page = i + 1;
                             return (
                               <Button
                                 key={page}
                                 variant={currentPage === page ? "default" : "outline"}
                                 size="sm"
                                 onClick={() => handlePageChange(page)}
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
                           onClick={() => handlePageChange(currentPage + 1)}
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

export default TotalCommoditiesPage;