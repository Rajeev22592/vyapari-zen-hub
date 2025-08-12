import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const CategorySegments = () => {
  const { t } = useLanguage();
  const segments = [
    { 
      emoji: "🌾", 
      name: t("categories.grains"), 
      path: "/bhav/grains",
      color: "grain",
      description: t("categories.grains.desc")
    },
    { 
      emoji: "🌶️", 
      name: t("categories.spices"), 
      path: "/bhav/spices",
      color: "spice",
      description: t("categories.spices.desc")
    },
    { 
      emoji: "🛢️", 
      name: t("categories.oils"), 
      path: "/bhav/oils",
      color: "oil",
      description: t("categories.oils.desc")
    },
    { 
      emoji: "🧺", 
      name: t("categories.dryFruits"), 
      path: "/bhav/dry-fruits",
      color: "fruit",
      description: t("categories.dryFruits.desc")
    },
    { 
      emoji: "🍚", 
      name: t("categories.rice"), 
      path: "/bhav/rice",
      color: "rice",
      description: t("categories.rice.desc")
    }
  ];

  return (
    <section className="mx-4 my-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        🌾 {t("categories.title")}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {segments.map((segment) => (
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