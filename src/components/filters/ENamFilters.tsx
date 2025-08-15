import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterState {
  state: string;
  district: string;
  market: string;
  commodity: string;
  search: string;
}

interface ENamFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

interface MandiData {
  id: string;
  name: { en: string; hi: string };
}

interface DistrictData {
  name: { en: string; hi: string };
  mandis: MandiData[];
}

interface StateData {
  name: { en: string; hi: string };
  districts: Record<string, DistrictData>;
}

const ENamFilters: React.FC<ENamFiltersProps> = ({ onFiltersChange }) => {
  const { t } = useLanguage();
  const [filters, setFilters] = useState<FilterState>({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: ""
  });

  // Indian states with their districts and mandis
  const statesData: Record<string, StateData> = {
    "rajasthan": {
      name: { en: "Rajasthan", hi: "राजस्थान" },
      districts: {
        "bikaner": {
          name: { en: "Bikaner", hi: "बीकानेर" },
          mandis: [
            { id: "bikaner-mandi", name: { en: "Bikaner Mandi", hi: "बीकानेर मंडी" } },
            { id: "nokha-mandi", name: { en: "Nokha Mandi", hi: "नोखा मंडी" } }
          ]
        },
        "jaipur": {
          name: { en: "Jaipur", hi: "जयपुर" },
          mandis: [
            { id: "jaipur-mandi", name: { en: "Jaipur Mandi", hi: "जयपुर मंडी" } },
            { id: "chomu-mandi", name: { en: "Chomu Mandi", hi: "चोमू मंडी" } }
          ]
        }
      }
    },
    "punjab": {
      name: { en: "Punjab", hi: "पंजाब" },
      districts: {
        "ludhiana": {
          name: { en: "Ludhiana", hi: "लुधियाना" },
          mandis: [
            { id: "ludhiana-mandi", name: { en: "Ludhiana Mandi", hi: "लुधियाना मंडी" } }
          ]
        },
        "amritsar": {
          name: { en: "Amritsar", hi: "अमृतसर" },
          mandis: [
            { id: "amritsar-mandi", name: { en: "Amritsar Mandi", hi: "अमृतसर मंडी" } }
          ]
        }
      }
    },
    "haryana": {
      name: { en: "Haryana", hi: "हरियाणा" },
      districts: {
        "karnal": {
          name: { en: "Karnal", hi: "करनाल" },
          mandis: [
            { id: "karnal-mandi", name: { en: "Karnal Mandi", hi: "करनाल मंडी" } }
          ]
        }
      }
    },
    "gujarat": {
      name: { en: "Gujarat", hi: "गुजरात" },
      districts: {
        "rajkot": {
          name: { en: "Rajkot", hi: "राजकोट" },
          mandis: [
            { id: "rajkot-mandi", name: { en: "Rajkot Mandi", hi: "राजकोट मंडी" } }
          ]
        }
      }
    }
  };

  const commodities = [
    { id: "all", name: { en: "All", hi: "सभी" } },
    { id: "wheat", name: { en: "Wheat", hi: "गेहूं" } },
    { id: "rice", name: { en: "Rice", hi: "चावल" } },
    { id: "cumin", name: { en: "Cumin", hi: "जीरा" } },
    { id: "turmeric", name: { en: "Turmeric", hi: "हल्दी" } },
    { id: "mustard", name: { en: "Mustard", hi: "सरसों" } },
    { id: "groundnut", name: { en: "Groundnut", hi: "मूंगफली" } },
    { id: "cotton", name: { en: "Cotton", hi: "कपास" } },
    { id: "soybean", name: { en: "Soybean", hi: "सोयाबीन" } }
  ];

  const { language } = useLanguage();

  // Get available districts based on selected state
  const getAvailableDistricts = () => {
    if (!filters.state || !statesData[filters.state]) return [];
    const stateData = statesData[filters.state];
    return Object.entries(stateData.districts).map(([key, district]) => ({
      id: key,
      name: district.name[language]
    }));
  };

  // Get available mandis based on selected district
  const getAvailableMandis = () => {
    const stateData = statesData[filters.state];
    if (!filters.state || !filters.district || !stateData?.districts[filters.district]) return [];
    const districtData = stateData.districts[filters.district];
    return districtData.mandis.map(mandi => ({
      id: mandi.id,
      name: mandi.name[language]
    }));
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    let newFilters = { ...filters, [key]: value };
    
    // Reset dependent filters when parent changes
    if (key === "state") {
      newFilters.district = "";
      newFilters.market = "";
    } else if (key === "district") {
      newFilters.market = "";
    }
    
    setFilters(newFilters);
  };

  // Auto-save filters to localStorage
  useEffect(() => {
    localStorage.setItem("enam-filters", JSON.stringify(filters));
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  // Load saved filters on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("enam-filters");
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setFilters(parsed);
      } catch (error) {
        console.error("Error loading saved filters:", error);
      }
    }
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{t("filters.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("filters.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* State Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.state")}</label>
            <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectState")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {Object.entries(statesData).map(([key, state]) => (
                  <SelectItem key={key} value={key} className="hover:bg-muted">
                    {state.name[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.district")}</label>
            <Select 
              value={filters.district} 
              onValueChange={(value) => handleFilterChange("district", value)}
              disabled={!filters.state}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectDistrict")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {getAvailableDistricts().map((district) => (
                  <SelectItem key={district.id} value={district.id} className="hover:bg-muted">
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Market Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.market")}</label>
            <Select 
              value={filters.market} 
              onValueChange={(value) => handleFilterChange("market", value)}
              disabled={!filters.district}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectMarket")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {getAvailableMandis().map((mandi) => (
                  <SelectItem key={mandi.id} value={mandi.id} className="hover:bg-muted">
                    {mandi.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Commodity Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.commodity")}</label>
            <Select value={filters.commodity} onValueChange={(value) => handleFilterChange("commodity", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectCommodity")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {commodities.map((commodity) => (
                  <SelectItem key={commodity.id} value={commodity.id} className="hover:bg-muted">
                    {commodity.name[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.search")}</label>
            <Input
              placeholder={t("filters.searchPlaceholder")}
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ENamFilters;