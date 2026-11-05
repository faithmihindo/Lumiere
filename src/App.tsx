/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter,
  ChefHat,
  Calendar,
  Sparkles,
  CheckCircle,
  CreditCard,
  Wine,
  Leaf,
  Users
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
  image: string;
  badge?: string;
  localOrigin?: string;
}

// --- Kenyan Menu Items ---
const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 1,
    name: "Swahili Garlic Butter Scallops",
    description: "Plump Indian Ocean scallops, sweet tamarind reduction, coconut emulsion, and crisp cassava tuiles.",
    price: "KSh 2,400",
    category: 'Starters',
    badge: "Coastal Specialty",
    localOrigin: "Kilifi Coast",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Naivasha Farm Burrata & Charred Figs",
    description: "Creamy artisan burrata from Naivasha dairy, heirloom highland tomatoes, wild basil oil, and toasted sourdough.",
    price: "KSh 1,850",
    category: 'Starters',
    badge: "Vegetarian",
    localOrigin: "Great Rift Valley",
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Lake Victoria Tilapia Croquettes",
    description: "Crispy herb-crusted fish croquettes, kachumbari aioli, lime caviar, and micro mountain coriander.",
    price: "KSh 1,600",
    category: 'Starters',
    badge: "Chef's Pick",
    localOrigin: "Kisumu & Lake Victoria",
    image: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Slow-Braised Kajiado Goat Sambusas",
    description: "Handcrafted golden phyllo triangles filled with cardamom-spiced goat meat, fresh mint chutney, and pomegranate pearls.",
    price: "KSh 1,450",
    category: 'Starters',
    badge: "Popular",
    localOrigin: "Kajiado Ranches",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800"
  },

  // Mains
  {
    id: 5,
    name: "Aged 35-Day Laikipia Ribeye Steak",
    description: "Grass-fed Kenyan highland beef grilled over acacia wood, roasted marrow butter, garlic confit, sukuma wiki cream, and red wine jus.",
    price: "KSh 4,950",
    category: 'Mains',
    badge: "Signature Cut",
    localOrigin: "Laikipia Plateau",
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Swahili Coconut & Cardamom King Prawns",
    description: "Jumbo wild-caught ocean prawns, fragrant Swahili coconut curry broth, cassava mash, and saffron pilau pearls.",
    price: "KSh 4,200",
    category: 'Mains',
    badge: "Guest Favorite",
    localOrigin: "Malindi Waters",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Pan-Seared Lake Victoria Tilapia",
    description: "Crisp golden skin fillet, sweet potato puree, braised mountain greens, and baobab citrus glaze.",
    price: "KSh 3,200",
    category: 'Mains',
    badge: "Fresh Catch",
    localOrigin: "Lake Victoria",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Aberdare Wild Truffle & Mushroom Risotto",
    description: "Forest porcini and chanterelles, velvety arborio rice, aged Kenyan artisan cheddar, and Timau cold-pressed herb oil.",
    price: "KSh 3,400",
    category: 'Mains',
    badge: "Vegetarian",
    localOrigin: "Aberdare Ranges",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 9,
    name: "Slow-Roasted Nyama Choma Royale",
    description: "Tender herb-crusted highland lamb cutlets slow-charred over open embers, fresh kachumbari salsa, and rosemary potato rosti.",
    price: "KSh 4,400",
    category: 'Mains',
    badge: "Modern Classic",
    localOrigin: "Mt. Kenya Foothills",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
  },

  // Desserts
  {
    id: 10,
    name: "Kericho Spiced Chai Crème Brûlée",
    description: "Rich custard infused with single-estate black tea leaves, crushed green cardamom, caramelized cane sugar crust, and ginger sablé.",
    price: "KSh 1,350",
    category: 'Desserts',
    badge: "Tea Infusion",
    localOrigin: "Kericho Highlands",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 11,
    name: "Belgian-Kenyan Dark Chocolate Fondant",
    description: "Warm molten cocoa cake made with fair-trade African cocoa, toasted Mt. Kenya macadamia crumble, and vanilla bean gelato.",
    price: "KSh 1,500",
    category: 'Desserts',
    badge: "Decadent",
    localOrigin: "Mt. Kenya Macadamias",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 12,
    name: "Malindi Passionfruit & Mango Pavlova",
    description: "Crisp and chewy coastal meringue cloud, tangy passion fruit curd, sweet sun-ripened mango cubes, and fresh mint.",
    price: "KSh 1,250",
    category: 'Desserts',
    badge: "Tropical",
    localOrigin: "Malindi Coast",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800"
  },

  // Drinks
  {
    id: 13,
    name: "The Grand Nairobi Dawa",
    description: "Premium vodka, fresh muddled Key limes, crushed ice, and raw Baringo acacia honey stirred tableside with an authentic wooden dawa stick.",
    price: "KSh 1,400",
    category: 'Drinks',
    badge: "Iconic Cocktail",
    localOrigin: "Baringo Honey",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 14,
    name: "Kilifi Sunset Coconut Spritz",
    description: "Spiced coastal gold rum, fresh young coconut water (madafu), passionfruit liqueur, sparkling wine, and torched rosemary.",
    price: "KSh 1,500",
    category: 'Drinks',
    badge: "Coastal Breeze",
    localOrigin: "Kilifi Palms",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 15,
    name: "Great Rift Smoked Old Fashioned",
    description: "Kentucky bourbon, Kenyan highland AA coffee liqueur, spiced bitters, served over crystal ice with cedarwood smoke aroma.",
    price: "KSh 1,650",
    category: 'Drinks',
    badge: "Smoked",
    localOrigin: "Kenyan AA Coffee",
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 16,
    name: "Zobo Hibiscus & Spiced Ginger Fizz (Mocktail)",
    description: "Slow-steeped organic hibiscus blossom tea, fresh Naivasha ginger juice, sweet pineapple pulp, star anise, and club soda.",
    price: "KSh 950",
    category: 'Drinks',
    badge: "Zero-Proof",
    localOrigin: "Naivasha Orchards",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=800"
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'Starters' | 'Mains' | 'Desserts' | 'Drinks'>('Starters');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Reservation modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '2026-11-06',
    time: '19:30',
    guests: '2 Guests',
    occasion: 'Casual Dining',
    notes: ''
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const resetBooking = () => {
    setBookingSubmitted(false);
    setIsBookingOpen(false);
    setBookingData({
      name: '',
      phone: '',
      email: '',
      date: '2026-11-06',
      time: '19:30',
      guests: '2 Guests',
      occasion: 'Casual Dining',
      notes: ''
    });
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Our Terroir', href: '#terroir' },
    { name: 'Story', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 selection:bg-amber-900 selection:text-white">
      {/* Top Banner with Kenyan Context */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Karibu Lumière • Plot 42, General Mathenge Drive, Westlands, Nairobi</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Tel: +254 712 345 678</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">Lipa na M-Pesa Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'top-0 bg-stone-950/95 backdrop-blur-md py-4 shadow-xl border-b border-stone-800' : 'top-8 bg-gradient-to-b from-stone-950/80 to-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex flex-col">
            <span className="text-2xl font-serif tracking-[0.25em] text-white font-medium">
              LUMIÈRE
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-sans -mt-1">
              Nairobi • Kenya
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-[0.2em] text-stone-200 hover:text-amber-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-stone-950 border-b border-stone-800 md:hidden overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-stone-200 hover:text-amber-400 text-base font-serif tracking-wider"
                  >
                    {link.name}
                  </a>
                ))}
                <button 
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-3 rounded-full uppercase tracking-widest text-xs font-bold text-center"
                >
                  Book a Table (Reservations)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920" 
            alt="Lumière Nairobi Dining Ambiance" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl py-24">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs uppercase tracking-[0.25em] mb-6"
          >
            <Sparkles size={14} />
            <span>Karibu • Westlands, Nairobi</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl text-white font-serif mb-6 leading-[1.1] tracking-tight"
          >
            Where Kenyan Soul <br />
            <span className="italic font-light text-amber-200">Meets Haute Cuisine</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-stone-300 text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            An extraordinary culinary celebration of Kenya’s bountiful terroir. Savor pasture-raised Laikipia beef, pristine Kilifi coastal seafood, Rift Valley greens, and artisanal Nairobi cocktails.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#menu" 
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-stone-950 px-9 py-4 rounded-full uppercase tracking-widest text-xs font-bold transition-all shadow-xl shadow-amber-500/25 active:scale-95"
            >
              Explore Kenyan Menu
            </a>
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="w-full sm:w-auto border border-white/40 text-white hover:bg-white/10 px-9 py-4 rounded-full uppercase tracking-widest text-xs font-medium transition-all backdrop-blur-sm cursor-pointer"
            >
              Reserve a Table
            </button>
          </motion.div>

          {/* Quick Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-stone-300 text-xs"
          >
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-serif text-lg font-bold">100%</span>
              <span className="text-stone-400 uppercase tracking-wider text-[11px]">Kenyan Sourced</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-serif text-lg font-bold">Laikipia</span>
              <span className="text-stone-400 uppercase tracking-wider text-[11px]">35-Day Aged Steaks</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-serif text-lg font-bold">Kilifi & Malindi</span>
              <span className="text-stone-400 uppercase tracking-wider text-[11px]">Fresh Ocean Seafood</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-amber-400 font-serif text-lg font-bold">Lipa na M-Pesa</span>
              <span className="text-stone-400 uppercase tracking-wider text-[11px]">Till & Cards Welcomed</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terroir & Sourcing Section */}
      <section id="terroir" className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold block mb-2">
              From Soil to Savor
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-white">
              The Bounty of Kenya’s Terroir
            </h2>
            <p className="text-stone-400 text-sm mt-3">
              We partner directly with sustainable farmers, traditional Maasai and Laikipia cattle ranchers, and Swahili artisanal fisherfolk across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Great Rift Valley & Highlands</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Crisp baby greens, edible mountain flowers, heirloom carrots, and sweet figs harvested daily from volcanic soils in Naivasha, Timau, and Kinangop.
              </p>
              <span className="text-xs text-amber-300/80 font-mono">0-Hour Farm Fresh</span>
            </div>

            <div className="p-8 rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <ChefHat size={24} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Laikipia & Mt. Kenya Grasslands</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Free-range, ethically reared Boran and Angus crossbreeds grazing across natural savannah pasturelands, dry-aged in our custom Himalayan salt room in Westlands.
              </p>
              <span className="text-xs text-amber-300/80 font-mono">35-Day Salt-Block Aging</span>
            </div>

            <div className="p-8 rounded-2xl bg-stone-950/60 border border-stone-800 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                <Wine size={24} />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">Swahili Coast & Lake Victoria</h3>
              <p className="text-stone-400 text-sm leading-relaxed mb-4">
                Fresh jumbo tiger prawns and line-caught snapper flown in daily from Kilifi and Malindi, paired with sweet Lake Victoria tilapia from Kisumu.
              </p>
              <span className="text-xs text-amber-300/80 font-mono">Daily Direct Catch</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Menu Section */}
      <section id="menu" className="py-24 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-amber-800/80 uppercase tracking-[0.25em] text-xs font-semibold mb-2 block">
              Curated by Chef Wanjiku Mwangi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 tracking-tight">
              Seasonal Nairobi Menu
            </h2>
            <p className="text-stone-600 text-sm max-w-xl mx-auto mt-3">
              All prices are inclusive of all statutory taxes and 16% VAT in Kenyan Shillings (KSh).
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-14 space-x-2 sm:space-x-4 border-b border-stone-200 pb-4 overflow-x-auto no-scrollbar">
            {(['Starters', 'Mains', 'Desserts', 'Drinks'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-[0.15em] transition-all cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-stone-900 text-white shadow-md' 
                    : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <AnimatePresence mode="wait">
              {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-5 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group"
                >
                  <div className="w-28 h-28 flex-shrink-0 overflow-hidden rounded-xl relative bg-stone-100">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {item.badge && (
                      <span className="absolute top-1.5 left-1.5 bg-stone-950/80 backdrop-blur-sm text-amber-300 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline gap-2 mb-1">
                        <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-amber-800 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-base font-serif font-bold text-amber-900 whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-2">
                        {item.description}
                      </p>
                    </div>

                    {item.localOrigin && (
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                        <MapPin size={12} className="text-amber-600" />
                        <span>Origin: {item.localOrigin}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 px-6 rounded-2xl bg-amber-50 border border-amber-200 text-stone-700 text-xs">
              <span className="font-semibold text-amber-900">Have dietary preferences or allergies?</span>
              <span>Our kitchen provides certified Halal options, vegetarian alternatives, and bespoke wine pairings upon request.</span>
            </div>
          </div>
        </div>
      </section>

      {/* About & Chef Story Section */}
      <section id="about" className="py-24 bg-white overflow-hidden border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
                alt="Executive Chef in Nairobi" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold block mb-1">
                  Westlands, Nairobi
                </span>
                <h4 className="text-xl font-serif">Executive Chef Wanjiku Mwangi</h4>
                <p className="text-stone-300 text-xs font-light">Culinary Director & Foraging Enthusiast</p>
              </div>
            </div>

            <div className="absolute -bottom-8 -right-6 w-64 bg-stone-900 text-white rounded-2xl p-6 shadow-xl border border-stone-800 hidden sm:block">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sparkles size={16} />
                <span className="text-xs uppercase tracking-widest font-bold">Philosophy</span>
              </div>
              <p className="text-sm font-serif italic text-stone-300 mb-2">
                "Our ancestors mastered fire and spice; we honor their spirit with contemporary culinary art."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-stone-500">— Chef Wanjiku</span>
            </div>
          </div>
          
          <div>
            <span className="text-amber-700 uppercase tracking-[0.25em] text-xs font-semibold mb-2 block">
              Our Journey in Nairobi
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">
              Honoring Kenyan Heritage Through Modern Gastronomy
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-6">
              Situated in the heart of Westlands on General Mathenge Drive, Lumière was founded to showcase the depth, elegance, and sheer variety of Kenya’s agricultural abundance.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base mb-8">
              We reimagined familiar flavors—from the comforting warmth of Kericho spiced tea to the smoky depths of highland nyama choma and coastal tamarind marinades. Each dish is meticulously plated to deliver an unforgettable dining affair right in the green city in the sun.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-100">
              <div>
                <span className="text-3xl font-serif text-amber-900 font-bold block mb-1">12+</span>
                <span className="text-xs uppercase tracking-wider text-stone-500">Years in Westlands</span>
              </div>
              <div>
                <span className="text-3xl font-serif text-amber-900 font-bold block mb-1">35+</span>
                <span className="text-xs uppercase tracking-wider text-stone-500">Kenyan Farm Partners</span>
              </div>
              <div>
                <span className="text-3xl font-serif text-amber-900 font-bold block mb-1">4.9 ★</span>
                <span className="text-xs uppercase tracking-wider text-stone-500">Google & TripAdvisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation & Visit Section */}
      <section id="contact" className="py-24 bg-stone-950 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Location & Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-amber-400 uppercase tracking-[0.25em] text-xs font-semibold block mb-2">
                Karibu Lumière
              </span>
              <h2 className="text-4xl font-serif text-white tracking-tight mb-4">
                Visit Us in Westlands
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Enjoy serene garden terrace seating or an intimate indoor dining experience surrounded by bespoke Kenyan art and soft candlelight.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400 mt-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">Location</h4>
                  <p className="text-stone-200">Plot 42, General Mathenge Drive</p>
                  <p className="text-stone-400 text-xs">Westlands, Nairobi • (Opposite The Oval)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400 mt-1">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">Operating Hours</h4>
                  <p className="text-stone-200">Tue – Thu: 12:00 PM – 10:30 PM</p>
                  <p className="text-stone-200">Fri – Sat: 12:00 PM – 11:30 PM</p>
                  <p className="text-stone-300 text-xs text-amber-300/90 mt-1">
                    Sunday Karibu Brunch: 11:00 AM – 9:00 PM
                  </p>
                  <p className="text-stone-500 text-xs mt-0.5">Closed on Mondays for kitchen prep</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400 mt-1">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">Contact & Bookings</h4>
                  <p className="text-stone-200">+254 712 345 678 (Direct & WhatsApp)</p>
                  <p className="text-stone-400 text-xs">+254 20 445 6789 (Landline)</p>
                  <p className="text-stone-400 text-xs mt-1">reservations@lumierenairobi.co.ke</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-amber-400 mt-1">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">Payment Methods</h4>
                  <p className="text-stone-300 text-xs">
                    Lipa na M-Pesa Buy Goods Till No: <span className="text-amber-400 font-mono font-bold">582910</span>
                  </p>
                  <p className="text-stone-400 text-xs mt-0.5">Visa, Mastercard, American Express & Cash</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 p-8 sm:p-10 rounded-3xl backdrop-blur-md shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-serif text-white">Reserve Your Table</h3>
                <p className="text-stone-400 text-xs mt-1">Instant confirmation with SMS & Email alert</p>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
                Tables Available Tonight
              </span>
            </div>

            {bookingSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle size={36} />
                </div>
                <h4 className="text-2xl font-serif text-white">Ahsante Sana, {bookingData.name || 'Valued Guest'}!</h4>
                <p className="text-stone-300 text-sm max-w-md mx-auto leading-relaxed">
                  Your table for <span className="text-amber-300 font-semibold">{bookingData.guests}</span> has been provisionally reserved for <span className="text-amber-300 font-semibold">{bookingData.date}</span> at <span className="text-amber-300 font-semibold">{bookingData.time}</span>.
                </p>
                <div className="p-4 bg-stone-950/70 rounded-xl max-w-sm mx-auto text-xs text-stone-400 border border-stone-800 text-left space-y-1">
                  <p><strong className="text-stone-200">Confirmation Code:</strong> LMR-NBO-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong className="text-stone-200">Contact:</strong> {bookingData.phone || '+254 7XX XXX XXX'}</p>
                  <p><strong className="text-stone-200">Occasion:</strong> {bookingData.occasion}</p>
                </div>
                <p className="text-xs text-stone-400">
                  Our reservations host will verify your table via WhatsApp or phone call.
                </p>
                <button 
                  onClick={resetBooking}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Amani Kamau" 
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      className="w-full bg-stone-950/60 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Kenyan Phone / WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+254 712 345 678" 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                      className="w-full bg-stone-950/60 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="amani@example.co.ke" 
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="w-full bg-stone-950/60 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Date *
                    </label>
                    <input 
                      type="date" 
                      required
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      className="w-full bg-stone-950/60 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Time Slot *
                    </label>
                    <select 
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      className="w-full bg-stone-950/80 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    >
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:30">1:30 PM (Lunch)</option>
                      <option value="17:30">5:30 PM (Sunset / Dawa Hour)</option>
                      <option value="19:00">7:00 PM (Dinner)</option>
                      <option value="19:30">7:30 PM (Dinner)</option>
                      <option value="20:30">8:30 PM (Dinner)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Party Size *
                    </label>
                    <select 
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                      className="w-full bg-stone-950/80 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="5-8 Guests">5 – 8 Guests (Group)</option>
                      <option value="9+ Guests">9+ Guests (Private Dining)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                      Occasion
                    </label>
                    <select 
                      value={bookingData.occasion}
                      onChange={(e) => setBookingData({...bookingData, occasion: e.target.value})}
                      className="w-full bg-stone-950/80 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                    >
                      <option value="Casual Dining">Casual Dining</option>
                      <option value="Romantic Date">Romantic Date</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="Business Meeting">Business Dinner</option>
                      <option value="Anniversary">Anniversary</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-1.5 font-medium">
                    Special Requests or Dietary Preferences
                  </label>
                  <textarea 
                    placeholder="e.g. Garden terrace seating requested, Halal-friendly preparation, or celebrating an anniversary..." 
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    className="w-full bg-stone-950/60 border border-stone-700/80 rounded-xl px-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition-colors text-sm"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-4 rounded-xl uppercase tracking-widest text-xs font-bold transition-all shadow-lg shadow-amber-500/25 active:scale-[0.99] cursor-pointer"
                >
                  Confirm Reservation at Lumière Nairobi
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Booking Modal (Accessible from anywhere) */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative text-white max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 text-stone-400 hover:text-white"
                aria-label="Close Modal"
              >
                <X size={22} />
              </button>

              <div className="mb-6">
                <span className="text-amber-400 uppercase tracking-widest text-xs font-bold">Fast Reservation</span>
                <h3 className="text-2xl font-serif text-white">Book a Table at Lumière</h3>
                <p className="text-xs text-stone-400 mt-1">Westlands, Nairobi • We confirm via WhatsApp or call</p>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle size={48} className="text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-serif">Table Requested!</h4>
                  <p className="text-xs text-stone-300">
                    Ahsante sana. We will connect with you immediately to finalize your booking details.
                  </p>
                  <button 
                    onClick={resetBooking}
                    className="mt-4 px-6 py-2 rounded-full bg-amber-500 text-stone-950 text-xs font-bold uppercase tracking-wider"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-stone-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Grace Njeri"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Kenyan Phone</label>
                      <input 
                        type="tel" 
                        required 
                        placeholder="+254 7XX XXX XXX"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Guests</label>
                      <select 
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white"
                      >
                        <option>2 Guests</option>
                        <option>4 Guests</option>
                        <option>6 Guests</option>
                        <option>8+ Guests</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Date</label>
                      <input 
                        type="date" 
                        required
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-stone-400 mb-1">Time</label>
                      <select 
                        value={bookingData.time}
                        onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-4 py-2.5 text-sm text-white"
                      >
                        <option value="12:30">12:30 PM</option>
                        <option value="18:00">6:00 PM</option>
                        <option value="19:30">7:30 PM</option>
                        <option value="20:30">8:30 PM</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 py-3 rounded-xl uppercase tracking-widest text-xs font-bold"
                  >
                    Confirm Reservation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-14 bg-stone-950 text-white/50 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-3">
              <span className="text-xl font-serif tracking-[0.2em] text-white block">LUMIÈRE</span>
              <p className="text-xs text-stone-400 leading-relaxed">
                Nairobi’s benchmark for contemporary fine dining, celebrating the bounty and heritage of Kenyan terroir.
              </p>
              <div className="pt-2 text-xs text-amber-400/90">
                Plot 42, General Mathenge Drive, Westlands, Nairobi
              </div>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-stone-300 font-semibold mb-3">Quick Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-amber-400 transition-colors">Seasonal Menu (KSh)</a></li>
                <li><a href="#terroir" className="hover:text-amber-400 transition-colors">Kenyan Terroir & Sourcing</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-colors">Chef Wanjiku's Story</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-colors">Reserve a Table</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-stone-300 font-semibold mb-3">Dining & Hospitality</h5>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>Chef's Tasting Menu</li>
                <li>Sunday Karibu Brunch</li>
                <li>Private Dining & Wine Cellar</li>
                <li>Corporate & Diplomatic Hosting</li>
                <li>Cocktail Lounge & Dawa Bar</li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-stone-300 font-semibold mb-3">Payment & Connect</h5>
              <p className="text-xs text-stone-400 mb-3">
                Lipa na M-Pesa Till: <span className="text-amber-400 font-mono font-bold">582910</span>
              </p>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center hover:text-white hover:bg-stone-800 transition-colors" aria-label="Instagram">
                  <Instagram size={15} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center hover:text-white hover:bg-stone-800 transition-colors" aria-label="Facebook">
                  <Facebook size={15} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center hover:text-white hover:bg-stone-800 transition-colors" aria-label="Twitter">
                  <Twitter size={15} />
                </a>
              </div>
              <p className="text-[11px] text-stone-500">
                Inquiries: reservations@lumierenairobi.co.ke
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div>
              © 2026 Lumière Nairobi. All rights reserved. Crafted for Nairobi’s vibrant culinary scene.
            </div>
            <div className="flex space-x-6 text-stone-500">
              <a href="#" className="hover:text-stone-300">Privacy Policy</a>
              <a href="#" className="hover:text-stone-300">Terms of Service</a>
              <a href="#" className="hover:text-stone-300">Hygiene & Halal Standards</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
