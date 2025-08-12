import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const CategorySegments = () => {
  const segments = [
    { 
      emoji: "🌾", 
      name: "Grains", 
      path: "/bhav/grains",
      color: "grain",
      description: "Wheat, Rice, Bajra"
    },
    { 
      emoji: "🌶️", 
      name: "Spices", 
      path: "/bhav/spices",
      color: "spice",
      description: "Turmeric, Coriander, Cumin"
    },
    { 
      emoji: "🛢️", 
      name: "Oils", 
      path: "/bhav/oils",
      color: "oil",
      description: "Mustard, Groundnut, Sunflower"
    },
    { 
      emoji: "🧺", 
      name: "Dry Fruits", 
      path: "/bhav/dry-fruits",
      color: "fruit",
      description: "Almonds, Cashews, Dates"
    },
    { 
      emoji: "🍚", 
      name: "Rice", 
      path: "/bhav/rice",
      color: "rice",
      description: "Basmati, Non-Basmati, Broken"
    }
  ];

  return (
    <section className="mx-4 my-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">
        🌾 Explore Segments
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