import { Search, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";

const Header = () => {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-lg">VD</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-foreground">{t("header.title")}</h1>
            <p className="text-xs text-muted-foreground">{t("header.subtitle")}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("header.search")}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
          </Button>
          <Button variant="ghost" size="sm" className="sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;