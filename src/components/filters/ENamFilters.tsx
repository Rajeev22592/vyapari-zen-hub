import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { fetchStates, fetchDistricts, fetchMarketsByDistrict, fetchCommoditiesBySegment, fetchSegmentsWithCommodities } from "@/services/regions";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterState>({
    state: "",
    district: "",
    market: "",
    commodity: "",
    search: ""
  });

  // Backend-driven lists (phase-1 defaults to grains segment for commodities)
  const { data: apiStates, isError: statesError } = useQuery({ queryKey: ["filters","states"], queryFn: fetchStates });
  const { data: apiDistricts, isError: districtsError } = useQuery({
    queryKey: ["filters","districts", filters.state],
    queryFn: () => fetchDistricts(filters.state),
    enabled: Boolean(filters.state)
  });
  const { data: apiMarkets, isError: marketsError } = useQuery({
    queryKey: ["filters","markets", filters.state, filters.district],
    queryFn: () => fetchMarketsByDistrict(filters.state, filters.district),
    enabled: Boolean(filters.state && filters.district)
  });
  const { data: apiCommodities, isError: commoditiesError } = useQuery({
    queryKey: ["filters","commodities","grains"],
    queryFn: () => fetchCommoditiesBySegment("grains"),
  });

  // Get all segments with commodities for better commodity selection
  const { data: segmentsWithCommodities } = useQuery({
    queryKey: ["filters","segments-with-commodities"],
    queryFn: fetchSegmentsWithCommodities,
  });

  useEffect(() => {
    if (statesError || districtsError || marketsError || commoditiesError) {
      toast({ title: "Network error", description: "Some filter data failed to load.", variant: "destructive" });
    }
  }, [statesError, districtsError, marketsError, commoditiesError, toast]);

  // e-NAM registered states with districts and mandis (based on actual e-NAM data)
  const statesData: Record<string, StateData> = {
    "andhra-pradesh": {
      name: { en: "Andhra Pradesh", hi: "आंध्र प्रदेश" },
      districts: {
        "krishna": {
          name: { en: "Krishna", hi: "कृष्णा" },
          mandis: [
            { id: "vijayawada-mandi", name: { en: "Vijayawada APMC", hi: "विजयवाड़ा एपीएमसी" } },
            { id: "machilipatnam-mandi", name: { en: "Machilipatnam APMC", hi: "मछलीपट्टनम एपीएमसी" } }
          ]
        },
        "guntur": {
          name: { en: "Guntur", hi: "गुंटूर" },
          mandis: [
            { id: "guntur-mandi", name: { en: "Guntur APMC", hi: "गुंटूर एपीएमसी" } },
            { id: "tenali-mandi", name: { en: "Tenali APMC", hi: "तेनाली एपीएमसी" } }
          ]
        }
      }
    },
    "karnataka": {
      name: { en: "Karnataka", hi: "कर्नाटक" },
      districts: {
        "bangalore": {
          name: { en: "Bangalore", hi: "बेंगलुरु" },
          mandis: [
            { id: "hessarghatta-mandi", name: { en: "Hessarghatta APMC", hi: "हेसरघट्टा एपीएमसी" } },
            { id: "yeshwantpur-mandi", name: { en: "Yeshwantpur APMC", hi: "येशवंतपुर एपीएमसी" } }
          ]
        },
        "mysore": {
          name: { en: "Mysore", hi: "मैसूर" },
          mandis: [
            { id: "mysore-mandi", name: { en: "Mysore APMC", hi: "मैसूर एपीएमसी" } },
            { id: "mandya-mandi", name: { en: "Mandya APMC", hi: "मांड्या एपीएमसी" } }
          ]
        }
      }
    },
    "maharashtra": {
      name: { en: "Maharashtra", hi: "महाराष्ट्र" },
      districts: {
        "pune": {
          name: { en: "Pune", hi: "पुणे" },
          mandis: [
            { id: "pune-mandi", name: { en: "Pune APMC", hi: "पुणे एपीएमसी" } },
            { id: "maval-mandi", name: { en: "Maval APMC", hi: "मावल एपीएमसी" } }
          ]
        },
        "nashik": {
          name: { en: "Nashik", hi: "नासिक" },
          mandis: [
            { id: "nashik-mandi", name: { en: "Nashik APMC", hi: "नासिक एपीएमसी" } },
            { id: "lasalgaon-mandi", name: { en: "Lasalgaon APMC", hi: "लासलगांव एपीएमसी" } }
          ]
        }
      }
    },
    "uttar-pradesh": {
      name: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
      districts: {
        "agra": {
          name: { en: "Agra", hi: "आगरा" },
          mandis: [
            { id: "agra-mandi", name: { en: "Agra Mandi", hi: "आगरा मंडी" } },
            { id: "etmadpur-mandi", name: { en: "Etmadpur Mandi", hi: "एतमादपुर मंडी" } }
          ]
        },
        "lucknow": {
          name: { en: "Lucknow", hi: "लखनऊ" },
          mandis: [
            { id: "lucknow-mandi", name: { en: "Lucknow Mandi", hi: "लखनऊ मंडी" } },
            { id: "malihabad-mandi", name: { en: "Malihabad Mandi", hi: "मलीहाबाद मंडी" } }
          ]
        }
      }
    },
    "rajasthan": {
      name: { en: "Rajasthan", hi: "राजस्थान" },
      districts: {
        "jaipur": {
          name: { en: "Jaipur", hi: "जयपुर" },
          mandis: [
            { id: "jaipur-mandi", name: { en: "Jaipur Mandi", hi: "जयपुर मंडी" } },
            { id: "chomu-mandi", name: { en: "Chomu Mandi", hi: "चोमू मंडी" } }
          ]
        },
        "bikaner": {
          name: { en: "Bikaner", hi: "बीकानेर" },
          mandis: [
            { id: "bikaner-mandi", name: { en: "Bikaner Mandi", hi: "बीकानेर मंडी" } },
            { id: "nokha-mandi", name: { en: "Nokha Mandi", hi: "नोखा मंडी" } }
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
            { id: "ludhiana-mandi", name: { en: "Ludhiana Mandi", hi: "लुधियाना मंडी" } },
            { id: "khanna-mandi", name: { en: "Khanna Mandi", hi: "खन्ना मंडी" } }
          ]
        },
        "amritsar": {
          name: { en: "Amritsar", hi: "अमृतसर" },
          mandis: [
            { id: "amritsar-mandi", name: { en: "Amritsar Mandi", hi: "अमृतसर मंडी" } },
            { id: "ajnala-mandi", name: { en: "Ajnala Mandi", hi: "अजनाला मंडी" } }
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
            { id: "karnal-mandi", name: { en: "Karnal Mandi", hi: "करनाल मंडी" } },
            { id: "taraori-mandi", name: { en: "Taraori Mandi", hi: "तरावड़ी मंडी" } }
          ]
        },
        "hisar": {
          name: { en: "Hisar", hi: "हिसार" },
          mandis: [
            { id: "hisar-mandi", name: { en: "Hisar Mandi", hi: "हिसार मंडी" } },
            { id: "hansi-mandi", name: { en: "Hansi Mandi", hi: "हांसी मंडी" } }
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
            { id: "rajkot-mandi", name: { en: "Rajkot APMC", hi: "राजकोट एपीएमसी" } },
            { id: "gondal-mandi", name: { en: "Gondal APMC", hi: "गोंडल एपीएमसी" } }
          ]
        },
        "ahmedabad": {
          name: { en: "Ahmedabad", hi: "अहमदाबाद" },
          mandis: [
            { id: "ahmedabad-mandi", name: { en: "Ahmedabad APMC", hi: "अहमदाबाद एपीएमसी" } },
            { id: "bavla-mandi", name: { en: "Bavla APMC", hi: "बावला एपीएमसी" } }
          ]
        }
      }
    },
    "madhya-pradesh": {
      name: { en: "Madhya Pradesh", hi: "मध्य प्रदेश" },
      districts: {
        "indore": {
          name: { en: "Indore", hi: "इंदौर" },
          mandis: [
            { id: "indore-mandi", name: { en: "Indore Mandi", hi: "इंदौर मंडी" } },
            { id: "dewas-mandi", name: { en: "Dewas Mandi", hi: "देवास मंडी" } }
          ]
        },
        "bhopal": {
          name: { en: "Bhopal", hi: "भोपाल" },
          mandis: [
            { id: "bhopal-mandi", name: { en: "Bhopal Mandi", hi: "भोपाल मंडी" } },
            { id: "sehore-mandi", name: { en: "Sehore Mandi", hi: "सीहोर मंडी" } }
          ]
        }
      }
    },
    "telangana": {
      name: { en: "Telangana", hi: "तेलंगाना" },
      districts: {
        "hyderabad": {
          name: { en: "Hyderabad", hi: "हैदराबाद" },
          mandis: [
            { id: "gaddiannaram-mandi", name: { en: "Gaddiannaram APMC", hi: "गड्डियानराम एपीएमसी" } },
            { id: "bowenpally-mandi", name: { en: "Bowenpally APMC", hi: "बोवेनपल्ली एपीएमसी" } }
          ]
        },
        "warangal": {
          name: { en: "Warangal", hi: "वारंगल" },
          mandis: [
            { id: "warangal-mandi", name: { en: "Warangal APMC", hi: "वारंगल एपीएमसी" } },
            { id: "hanamkonda-mandi", name: { en: "Hanamkonda APMC", hi: "हनमकोंडा एपीएमसी" } }
          ]
        }
      }
    }
  };

  // e-NAM commodity categories (based on actual e-NAM portal data)
  const commodities = [
    { id: "all", name: { en: "All Commodities", hi: "सभी जिंसें" } },
    
    // Cereals/Food Grains
    { id: "wheat", name: { en: "Wheat", hi: "गेहूं" } },
    { id: "rice", name: { en: "Rice", hi: "चावल" } },
    { id: "basmati-rice", name: { en: "Basmati Rice", hi: "बासमती चावल" } },
    { id: "bajra", name: { en: "Bajra", hi: "बाजरा" } },
    { id: "jowar", name: { en: "Jowar", hi: "ज्वार" } },
    { id: "maize", name: { en: "Maize", hi: "मक्का" } },
    { id: "barley", name: { en: "Barley", hi: "जौ" } },
    
    // Pulses
    { id: "arhar", name: { en: "Arhar/Tur", hi: "अरहर/तुअर" } },
    { id: "chana", name: { en: "Chana", hi: "चना" } },
    { id: "masur", name: { en: "Masur", hi: "मसूर" } },
    { id: "urad", name: { en: "Urad", hi: "उड़द" } },
    { id: "moong", name: { en: "Moong", hi: "मूंग" } },
    { id: "kabuli-chana", name: { en: "Kabuli Chana", hi: "काबुली चना" } },
    
    // Oil Seeds
    { id: "groundnut", name: { en: "Groundnut", hi: "मूंगफली" } },
    { id: "mustard", name: { en: "Mustard", hi: "सरसों" } },
    { id: "soybean", name: { en: "Soybean", hi: "सोयाबीन" } },
    { id: "sunflower", name: { en: "Sunflower", hi: "सूरजमुखी" } },
    { id: "sesame", name: { en: "Sesame", hi: "तिल" } },
    { id: "safflower", name: { en: "Safflower", hi: "कुसुम" } },
    
    // Spices
    { id: "turmeric", name: { en: "Turmeric", hi: "हल्दी" } },
    { id: "coriander", name: { en: "Coriander", hi: "धनिया" } },
    { id: "cumin", name: { en: "Cumin", hi: "जीरा" } },
    { id: "fenugreek", name: { en: "Fenugreek", hi: "मेथी" } },
    { id: "red-chilli", name: { en: "Red Chilli", hi: "लाल मिर्च" } },
    { id: "black-pepper", name: { en: "Black Pepper", hi: "काली मिर्च" } },
    
    // Vegetables
    { id: "onion", name: { en: "Onion", hi: "प्याज" } },
    { id: "potato", name: { en: "Potato", hi: "आलू" } },
    { id: "tomato", name: { en: "Tomato", hi: "टमाटर" } },
    { id: "cabbage", name: { en: "Cabbage", hi: "पत्ता गोभी" } },
    { id: "cauliflower", name: { en: "Cauliflower", hi: "फूल गोभी" } },
    { id: "brinjal", name: { en: "Brinjal", hi: "बैंगन" } },
    
    // Fruits
    { id: "apple", name: { en: "Apple", hi: "सेब" } },
    { id: "banana", name: { en: "Banana", hi: "केला" } },
    { id: "orange", name: { en: "Orange", hi: "संतरा" } },
    { id: "grapes", name: { en: "Grapes", hi: "अंगूर" } },
    { id: "pomegranate", name: { en: "Pomegranate", hi: "अनार" } },
    
    // Cash Crops
    { id: "cotton", name: { en: "Cotton", hi: "कपास" } },
    { id: "sugarcane", name: { en: "Sugarcane", hi: "गन्ना" } },
    { id: "jute", name: { en: "Jute", hi: "जूट" } },
    
    // Others
    { id: "coconut", name: { en: "Coconut", hi: "नारियल" } },
    { id: "gur", name: { en: "Gur/Jaggery", hi: "गुड़" } },
    { id: "honey", name: { en: "Honey", hi: "शहद" } }
  ];

  const { language } = useLanguage();

  // Get available districts based on selected state
  const getAvailableDistricts = () => {
    if (apiDistricts && Array.isArray(apiDistricts)) {
      return apiDistricts.map((d: any) => ({ id: String(d.id), name: d.name }));
    }
    if (!filters.state || !statesData[filters.state]) return [];
    const stateData = statesData[filters.state];
    return Object.entries(stateData.districts).map(([key, district]) => ({
      id: key,
      name: district.name[language]
    }));
  };

  // Get available mandis based on selected district
  const getAvailableMandis = () => {
    if (apiMarkets && Array.isArray(apiMarkets)) {
      return apiMarkets.map((m: any) => ({ id: String(m.id), name: m.name }));
    }
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
    toast({ title: "Filters updated", description: `${key} set.`, variant: "default" });
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

        {/* Applied filters pill bar */}
        <div className="flex flex-wrap gap-2 text-xs">
          {filters.state && (
            <span className="px-2 py-1 bg-muted text-foreground rounded-full border">
              {t("filters.state")}:
              <button className="ml-1 text-primary hover:underline" onClick={() => handleFilterChange("state", "")}>×</button>
            </span>
          )}
          {filters.district && (
            <span className="px-2 py-1 bg-muted text-foreground rounded-full border">
              {t("filters.district")}:
              <button className="ml-1 text-primary hover:underline" onClick={() => handleFilterChange("district", "")}>×</button>
            </span>
          )}
          {filters.market && (
            <span className="px-2 py-1 bg-muted text-foreground rounded-full border">
              {t("filters.market")}:
              <button className="ml-1 text-primary hover:underline" onClick={() => handleFilterChange("market", "")}>×</button>
            </span>
          )}
          {filters.commodity && (
            <span className="px-2 py-1 bg-muted text-foreground rounded-full border">
              {t("filters.commodity")}:
              <button className="ml-1 text-primary hover:underline" onClick={() => handleFilterChange("commodity", "")}>×</button>
            </span>
          )}
          {(filters.state || filters.district || filters.market || filters.commodity || filters.search) && (
            <button className="px-2 py-1 bg-destructive/10 text-destructive rounded-full border border-destructive/30" onClick={() => setFilters({ state: "", district: "", market: "", commodity: "", search: "" })}>
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* State Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.state")}</label>
            <Select value={filters.state || undefined} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectState")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {(apiStates && Array.isArray(apiStates)
                  ? apiStates.map((s: any) => (
                      <SelectItem key={s.id} value={String(s.id)} className="hover:bg-muted">
                        {s.name}
                      </SelectItem>
                    ))
                  : Object.entries(statesData).map(([key, state]) => (
                      <SelectItem key={key} value={key} className="hover:bg-muted">
                        {state.name[language]}
                      </SelectItem>
                    )))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">{t("filters.district")}</label>
            <Select 
              value={filters.district || undefined} 
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
              value={filters.market || undefined} 
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
            <Select value={filters.commodity || undefined} onValueChange={(value) => handleFilterChange("commodity", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("filters.selectCommodity")} />
              </SelectTrigger>
              <SelectContent className="bg-background border border-border shadow-elevated z-50">
                {(segmentsWithCommodities && Array.isArray(segmentsWithCommodities)
                  ? segmentsWithCommodities.flatMap(segment => 
                      segment.commodities.map((c: any) => (
                        <SelectItem key={c.id} value={String(c.id)} className="hover:bg-muted">
                          {c.name}
                        </SelectItem>
                      ))
                    )
                  : (apiCommodities && Array.isArray(apiCommodities)
                    ? apiCommodities.map((c: any) => (
                        <SelectItem key={c.id} value={String(c.id)} className="hover:bg-muted">
                          {c.name}
                        </SelectItem>
                      ))
                    : commodities.map((commodity) => (
                        <SelectItem key={commodity.id} value={commodity.id} className="hover:bg-muted">
                          {commodity.name[language]}
                        </SelectItem>
                      ))))}
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