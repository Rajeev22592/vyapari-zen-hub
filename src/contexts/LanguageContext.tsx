import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    "header.title": "Vyapari Darbaar",
    "header.subtitle": "Trading Excellence Platform",
    "header.search": "Search commodities, traders...",
    
    // Navigation
    "nav.home": "Home",
    "nav.bhav": "Bhav",
    "nav.network": "Network",
    "nav.news": "News",
    "nav.more": "More",
    
    // Home Page
    "home.hero.title": "Vyapari Darbaar",
    "home.hero.subtitle": "Connecting Farmers & Traders - Building Trust, Growing Together",
    "home.hero.search": "Search commodities...",
    "home.hero.searchBtn": "Search",
    "home.hero.location": "Select your trading area",
    
    // Bhav Highlights
    "bhav.highlights.title": "Daily Bhav Highlights",
    "bhav.highlights.viewAll": "View All",
    "bhav.wheat": "Gehu (Wheat)",
    "bhav.cumin": "Jeera (Cumin)",
    "bhav.mustardOil": "Sarson Oil",
    "bhav.basmatiRice": "Basmati Rice",
    "bhav.cashewNuts": "Cashew Nuts",
    "bhav.turmeric": "Turmeric (Haldi)",
    "bhav.location.bikaner": "Bikaner Mandi",
    "bhav.location.rajkot": "Rajkot Mandi",
    "bhav.location.delhi": "Delhi Mandi",
    "bhav.location.karnal": "Karnal Mandi",
    "bhav.location.kerala": "Kerala Mandi",
    "bhav.location.sangli": "Sangli Mandi",
    
    // Categories
    "categories.title": "Explore Segments",
    "categories.grains": "Grains",
    "categories.spices": "Spices",
    "categories.oils": "Oils",
    "categories.dryFruits": "Dry Fruits",
    "categories.rice": "Rice",
    "categories.grains.desc": "Wheat, Rice, Bajra",
    "categories.spices.desc": "Turmeric, Coriander, Cumin",
    "categories.oils.desc": "Mustard, Groundnut, Sunflower",
    "categories.dryFruits.desc": "Almonds, Cashews, Dates",
    "categories.rice.desc": "Basmati, Non-Basmati, Broken",
    
    // Quick Actions
    "actions.title": "Quick Actions",
    "actions.directory": "Trader Directory",
    "actions.directory.desc": "Connect with verified traders",
    "actions.analysis": "Market Analysis",
    "actions.analysis.desc": "Detailed price trends & insights",
    "actions.area": "Area Selection",
    "actions.area.desc": "Set your trading region",
    "actions.news": "News & Updates",
    "actions.news.desc": "Latest market news",
    
    // News
    "news.title": "Today's News",
    "news.allNews": "All News",
    "news.readMore": "Read More",
    "news.urgent": "Urgent",
    "news.category.market": "Market Update",
    "news.category.policy": "Policy",
    "news.category.export": "Export",
    "news.category.weather": "Weather",
    
    // Bhav Page
    "bhav.page.title": "Market Prices",
    "bhav.page.subtitle": "Live commodity rates",
    "bhav.filter": "Filter",
    "bhav.all": "All",
    "bhav.stats.up": "Markets Up",
    "bhav.stats.down": "Markets Down",
    "bhav.stats.total": "Total Markets",
    "bhav.stats.fresh": "Data Fresh",
    
    // Directory Page
    "directory.title": "Trader Directory",
    "directory.subtitle": "Connect with verified traders",
    "directory.search": "Search traders, business, speciality...",
    "directory.join": "Join Network",
    "directory.stats.active": "Active Traders",
    "directory.stats.verified": "Verified",
    "directory.stats.cities": "Cities",
    "directory.stats.rating": "Avg Rating",
    "directory.verified": "Verified",
    "directory.speciality": "Speciality:",
    "directory.viewProfile": "View Profile",
    "directory.connect": "Connect",
    
    // More Page
    "more.profile": "Profile Settings",
    "more.profile.desc": "Manage your account details",
    "more.notifications": "Notifications",
    "more.notifications.desc": "Manage alerts and updates",
    "more.settings": "App Settings",
    "more.settings.desc": "Customize your experience",
    "more.privacy": "Privacy & Security",
    "more.privacy.desc": "Control your data and privacy",
    "more.help": "Help & Support",
    "more.help.desc": "Get help and contact support",
    "more.about": "About Vyapari Darbaar",
    "more.about.desc": "App version and information",
    "more.editProfile": "Edit Profile",
    "more.verifiedTrader": "Verified Trader",
    "more.monthlyTrading": "Monthly Trading",
    "more.connections": "Connections",
    "more.rating": "Rating",
    "more.yearsActive": "Years Active",
    "more.settingsMore": "Settings & More",
    "more.logout": "Log Out",
    
    // Broadcast Page
    "broadcast.title": "News & Updates",
    "broadcast.subtitle": "Latest market developments",
    "broadcast.saved": "Saved",
    "broadcast.breaking": "BREAKING",
    "broadcast.justNow": "Just now",
    "broadcast.share": "Share",
    "broadcast.save": "Save",
    "broadcast.readFull": "Read Full Article",
    "broadcast.all": "All News",
    "broadcast.urgent": "Urgent",
    "broadcast.market": "Market",
    "broadcast.policy": "Policy",
    
    // Common
    "common.viewAll": "View All",
    "common.save": "Save",
    "common.share": "Share",
    "common.loading": "Loading...",
    "common.error": "Error occurred",
    "common.retry": "Retry",
    "common.cancel": "Cancel",
    "common.ok": "OK",
    "common.language": "Language",
    
    // Filters
    "filters.title": "Filters",
    "filters.subtitle": "Choose your area and commodity. Selections auto-save.",
    "filters.state": "State",
    "filters.district": "District", 
    "filters.market": "Market",
    "filters.commodity": "Commodity",
    "filters.search": "Search",
    "filters.selectState": "Select State",
    "filters.selectDistrict": "Select District",
    "filters.selectMarket": "Select Market",
    "filters.selectCommodity": "Select Commodity",
    "filters.searchPlaceholder": "Type commodity name...",
    
    // e-NAM specific
    "enam.title": "e-NAM Portal",
    "enam.subtitle": "National Agriculture Market",
    "enam.description": "A pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities.",
    "enam.totalMandis": "Total Registered Mandis",
    "enam.totalStates": "States & UTs",
    "enam.liveMarkets": "Live Markets Today",
    "enam.commoditiesTraded": "Commodities Traded",
    
    // Bhav Page
    "bhav.title": "e-NAM Live Prices",
    "bhav.subtitle": "Real-time commodity rates from mandis",
    "bhav.noResults": "No commodities found matching your filters",
    
    // Stats
    "stats.marketsUp": "Markets Up",
    "stats.marketsDown": "Markets Down", 
    "stats.totalMandis": "Total Mandis",
    "stats.commodities": "Commodities",
    
    // Common
    "common.filter": "Filter",
    "language": "en"
  },
  hi: {
    // Header
    "header.title": "व्यापारी दरबार",
    "header.subtitle": "व्यापारिक उत्कृष्टता मंच",
    "header.search": "वस्तुओं, व्यापारियों को खोजें...",
    
    // Navigation
    "nav.home": "होम",
    "nav.bhav": "भाव",
    "nav.network": "नेटवर्क",
    "nav.news": "न्यूज़",
    "nav.more": "और",
    
    // Home Page
    "home.hero.title": "व्यापारी दरबार",
    "home.hero.subtitle": "किसान और व्यापारी को जोड़ना - विश्वास निर्माण, एक साथ बढ़ना",
    "home.hero.search": "वस्तुओं को खोजें...",
    "home.hero.searchBtn": "खोजें",
    "home.hero.location": "अपना व्यापारिक क्षेत्र चुनें",
    
    // Bhav Highlights
    "bhav.highlights.title": "दैनिक भाव मुख्य बातें",
    "bhav.highlights.viewAll": "सभी देखें",
    "bhav.wheat": "गेहूं",
    "bhav.cumin": "जीरा",
    "bhav.mustardOil": "सरसों का तेल",
    "bhav.basmatiRice": "बासमती चावल",
    "bhav.cashewNuts": "काजू",
    "bhav.turmeric": "हल्दी",
    "bhav.location.bikaner": "बीकानेर मंडी",
    "bhav.location.rajkot": "राजकोट मंडी",
    "bhav.location.delhi": "दिल्ली मंडी",
    "bhav.location.karnal": "करनाल मंडी",
    "bhav.location.kerala": "केरल मंडी",
    "bhav.location.sangli": "सांगली मंडी",
    
    // Categories
    "categories.title": "खंड एक्सप्लोर करें",
    "categories.grains": "अनाज",
    "categories.spices": "मसाले",
    "categories.oils": "तेल",
    "categories.dryFruits": "सूखे मेवे",
    "categories.rice": "चावल",
    "categories.grains.desc": "गेहूं, चावल, बाजरा",
    "categories.spices.desc": "हल्दी, धनिया, जीरा",
    "categories.oils.desc": "सरसों, मूंगफली, सूरजमुखी",
    "categories.dryFruits.desc": "बादाम, काजू, खजूर",
    "categories.rice.desc": "बासमती, नॉन-बासमती, टूटा",
    
    // Quick Actions
    "actions.title": "त्वरित कार्य",
    "actions.directory": "व्यापारी निर्देशिका",
    "actions.directory.desc": "सत्यापित व्यापारियों से जुड़ें",
    "actions.analysis": "बाजार विश्लेषण",
    "actions.analysis.desc": "विस्तृत मूल्य रुझान और अंतर्दृष्टि",
    "actions.area": "क्षेत्र चयन",
    "actions.area.desc": "अपना व्यापारिक क्षेत्र सेट करें",
    "actions.news": "समाचार और अपडेट",
    "actions.news.desc": "नवीनतम बाजार समाचार",
    
    // News
    "news.title": "आज की खबरें",
    "news.allNews": "सभी समाचार",
    "news.readMore": "और पढ़ें",
    "news.urgent": "तत्काल",
    "news.category.market": "बाजार अपडेट",
    "news.category.policy": "नीति",
    "news.category.export": "निर्यात",
    "news.category.weather": "मौसम",
    
    // Bhav Page
    "bhav.page.title": "बाजार दर",
    "bhav.page.subtitle": "लाइव कमोडिटी दरें",
    "bhav.filter": "फिल्टर",
    "bhav.all": "सभी",
    "bhav.stats.up": "बढ़ते बाजार",
    "bhav.stats.down": "गिरते बाजार",
    "bhav.stats.total": "कुल बाजार",
    "bhav.stats.fresh": "डेटा फ्रेश",
    
    // Directory Page
    "directory.title": "व्यापारी निर्देशिका",
    "directory.subtitle": "सत्यापित व्यापारियों से जुड़ें",
    "directory.search": "व्यापारी, व्यवसाय, विशेषता खोजें...",
    "directory.join": "नेटवर्क में शामिल हों",
    "directory.stats.active": "सक्रिय व्यापारी",
    "directory.stats.verified": "सत्यापित",
    "directory.stats.cities": "शहर",
    "directory.stats.rating": "औसत रेटिंग",
    "directory.verified": "सत्यापित",
    "directory.speciality": "विशेषता:",
    "directory.viewProfile": "प्रोफाइल देखें",
    "directory.connect": "कनेक्ट करें",
    
    // More Page
    "more.profile": "प्रोफाइल सेटिंग्स",
    "more.profile.desc": "अपने खाते का विवरण प्रबंधित करें",
    "more.notifications": "सूचनाएं",
    "more.notifications.desc": "अलर्ट और अपडेट प्रबंधित करें",
    "more.settings": "ऐप सेटिंग्स",
    "more.settings.desc": "अपना अनुभव कस्टमाइज़ करें",
    "more.privacy": "गोपनीयता और सुरक्षा",
    "more.privacy.desc": "अपने डेटा और गोपनीयता को नियंत्रित करें",
    "more.help": "सहायता और समर्थन",
    "more.help.desc": "सहायता प्राप्त करें और समर्थन से संपर्क करें",
    "more.about": "व्यापारी दरबार के बारे में",
    "more.about.desc": "ऐप संस्करण और जानकारी",
    "more.editProfile": "प्रोफाइल संपादित करें",
    "more.verifiedTrader": "सत्यापित व्यापारी",
    "more.monthlyTrading": "मासिक व्यापार",
    "more.connections": "कनेक्शन",
    "more.rating": "रेटिंग",
    "more.yearsActive": "वर्ष सक्रिय",
    "more.settingsMore": "सेटिंग्स और अधिक",
    "more.logout": "लॉग आउट",
    
    // Broadcast Page
    "broadcast.title": "समाचार और अपडेट",
    "broadcast.subtitle": "नवीनतम बाजार विकास",
    "broadcast.saved": "सेव किया गया",
    "broadcast.breaking": "ब्रेकिंग",
    "broadcast.justNow": "अभी-अभी",
    "broadcast.share": "साझा करें",
    "broadcast.save": "सेव करें",
    "broadcast.readFull": "पूरा लेख पढ़ें",
    "broadcast.all": "सभी समाचार",
    "broadcast.urgent": "तत्काल",
    "broadcast.market": "बाजार",
    "broadcast.policy": "नीति",
    
    // Common
    "common.viewAll": "सभी देखें",
    "common.save": "सेव करें",
    "common.share": "साझा करें",
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि हुई",
    "common.retry": "पुनः प्रयास करें",
    "common.cancel": "रद्द करें",
    "common.ok": "ठीक है",
    "common.language": "भाषा",
    
    // Filters
    "filters.title": "फिल्टर",
    "filters.subtitle": "अपना क्षेत्र और कमोडिटी चुनें। चयन स्वतः सेव हो जाता है।",
    "filters.state": "राज्य",
    "filters.district": "जिला",
    "filters.market": "मंडी",
    "filters.commodity": "कमोडिटी",
    "filters.search": "खोज",
    "filters.selectState": "राज्य चुनें",
    "filters.selectDistrict": "जिला चुनें",
    "filters.selectMarket": "मंडी चुनें",
    "filters.selectCommodity": "कमोडिटी चुनें",
    "filters.searchPlaceholder": "कमोडिटी का नाम टाइप करें...",
    
    // e-NAM specific
    "enam.title": "ई-नाम पोर्टल",
    "enam.subtitle": "राष्ट्रीय कृषि बाजार",
    "enam.description": "एक अखिल भारतीय इलेक्ट्रॉनिक ट्रेडिंग पोर्टल जो मौजूदा APMC मंडियों को नेटवर्क करता है और कृषि वस्तुओं के लिए एक एकीकृत राष्ट्रीय बाजार बनाता है।",
    "enam.totalMandis": "कुल पंजीकृत मंडियां",
    "enam.totalStates": "राज्य और केंद्र शासित प्रदेश",
    "enam.liveMarkets": "आज लाइव मार्केट",
    "enam.commoditiesTraded": "व्यापार की जाने वाली कमोडिटी",
    
    // Bhav Page
    "bhav.title": "ई-नाम लाइव भाव",
    "bhav.subtitle": "मंडियों से रियल-टाइम कमोडिटी दरें",
    "bhav.noResults": "आपके फिल्टर से मेल खाने वाली कोई वस्तु नहीं मिली",
    
    // Stats
    "stats.marketsUp": "बाजार ऊपर",
    "stats.marketsDown": "बाजार नीचे",
    "stats.totalMandis": "कुल मंडियां",
    "stats.commodities": "कमोडिटीज़",
    
    // Common
    "common.filter": "फिल्टर",
    "language": "hi"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("vyapari-language");
    return (saved as Language) || "hi"; // Default to Hindi
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("vyapari-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;