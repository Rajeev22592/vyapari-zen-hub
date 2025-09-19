import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSegmentsWithCommodities } from "@/services/regions";

const CategorySegments = () => {
  const { t } = useLanguage();
  
  // Fetch real segments data from API
  const { data: apiSegments } = useQuery({
    queryKey: ["segments-with-commodities"],
    queryFn: fetchSegmentsWithCommodities,
  });

  // Map API segments to UI format with emojis and colors
  const getSegmentConfig = (segmentName: string) => {
    const configs: Record<string, { emoji: string; color: string; path: string }> = {
      "cereals": { emoji: "🌾", color: "grain", path: "/bhav/cereals" },
      "grains": { emoji: "🌾", color: "grain", path: "/bhav/grains" },
      "spices": { emoji: "🌶️", color: "spice", path: "/bhav/spices" },
      "oils": { emoji: "🛢️", color: "oil", path: "/bhav/oils" },
      "oilseeds": { emoji: "🛢️", color: "oil", path: "/bhav/oilseeds" },
      "dry-fruits": { emoji: "🧺", color: "fruit", path: "/bhav/dry-fruits" },
      "dryfruits": { emoji: "🧺", color: "fruit", path: "/bhav/dryfruits" },
      "rice": { emoji: "🍚", color: "rice", path: "/bhav/rice" },
      "vegetables": { emoji: "🥬", color: "green", path: "/bhav/vegetables" },
      "pulses": { emoji: "🟤", color: "brown", path: "/bhav/pulses" },
    };
    
    const normalizedName = segmentName.toLowerCase().replace(/\s+/g, '-');
    return configs[normalizedName] || { emoji: "📦", color: "muted", path: `/bhav/${normalizedName}` };
  };

  // Use API data if available, fallback to static data
  const segments = (() => {
    // Handle API response structure - it's an object with segment names as keys
    if (apiSegments && typeof apiSegments === 'object' && !Array.isArray(apiSegments)) {
      const segmentsArray = Object.values(apiSegments).filter((segment: any) => 
        segment && typeof segment === 'object' && segment.name
      );
      
      if (segmentsArray.length > 0) {
        return segmentsArray.slice(0, 5).map((segment: any) => {
          const config = getSegmentConfig(segment.name);
          return {
            emoji: config.emoji,
            name: segment.name,
            path: config.path,
            color: config.color,
            description: `${segment.total_commodities ?? segment.commodities?.length ?? 0} commodities`,
            commodityCount: segment.total_commodities ?? segment.commodities?.length ?? 0
          };
        });
      }
    }
    
    // Fallback to static data
    return [
        { 
          emoji: "🌾", 
          name: t("categories.grains"), 
          path: "/bhav/grains",
          color: "grain",
          description: t("categories.grains.desc"),
          commodityCount: 120
        },
        { 
          emoji: "🌶️", 
          name: t("categories.spices"), 
          path: "/bhav/spices",
          color: "spice",
          description: t("categories.spices.desc"),
          commodityCount: 9
        },
        { 
          emoji: "🛢️", 
          name: t("categories.oils"), 
          path: "/bhav/oils",
          color: "oil",
          description: t("categories.oils.desc"),
          commodityCount: 11
        },
        { 
          emoji: "🧺", 
          name: t("categories.dryFruits"), 
          path: "/bhav/dry-fruits",
          color: "fruit",
          description: t("categories.dryFruits.desc"),
          commodityCount: 5
        },
        { 
          emoji: "🍚", 
          name: t("categories.rice"), 
          path: "/bhav/rice",
          color: "rice",
          description: t("categories.rice.desc"),
          commodityCount: 1
        },
        { 
          emoji: "🥬", 
          name: t("categories.vegetables"), 
          path: "/bhav/vegetables",
          color: "green",
          description: t("categories.vegetables.desc"),
          commodityCount: 28
        },
        { 
          emoji: "🍎", 
          name: t("categories.fruits"), 
          path: "/bhav/fruits",
          color: "red",
          description: t("categories.fruits.desc"),
          commodityCount: 31
        },
        { 
          emoji: "🟤", 
          name: t("categories.pulses"), 
          path: "/bhav/pulses",
          color: "brown",
          description: t("categories.pulses.desc"),
          commodityCount: 35
        }
      ];
  })();

  return (
    <section className="mx-4 my-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        🌾 {t("categories.title")}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {segments.map((segment: any) => (
          <Link key={segment.path} to={segment.path}>
            <Card className={`
              bg-gradient-card border-border/50 shadow-soft hover:shadow-elevated 
              transition-all duration-300 hover:scale-105 cursor-pointer
              group relative overflow-hidden
            `}>
              <CardContent className="p-4 text-center space-y-2">
                <div className="text-3xl animate-float group-hover:scale-110 transition-transform duration-300">
                  {segment.emoji}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {segment.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {segment.description}
                  </p>
                </div>
                
                {/* Background gradient */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                  bg-${segment.color}
                `} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySegments;