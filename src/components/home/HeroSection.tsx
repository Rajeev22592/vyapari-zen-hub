import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero rounded-2xl mx-4 mt-4 shadow-elevated">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-foreground">
            Vyapari Darbaar
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Your trusted mandi companion
          </p>
          
          {/* Quick Search */}
          <div className="flex items-center space-x-2 bg-background/95 backdrop-blur rounded-lg p-3 shadow-soft">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search commodities..."
              className="border-0 bg-transparent focus:ring-0 flex-1"
            />
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              खोजें
            </Button>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-primary-foreground/80">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">Select your trading area</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;