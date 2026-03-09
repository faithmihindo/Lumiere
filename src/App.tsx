/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  Twitter,
  UtensilsCrossed,
  ChefHat,
  Calendar
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
  image: string;
}

// --- Constants ---
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Truffle Burrata",
    description: "Creamy burrata, shaved black truffle, heirloom tomatoes, basil oil.",
    price: "$18",
    category: 'Starters',
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Pan-Seared Scallops",
    description: "Hokkaido scallops, cauliflower purée, crispy pancetta, lemon butter.",
    price: "$22",
    category: 'Starters',
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Wagyu Ribeye",
    description: "A5 Wagyu, roasted bone marrow, garlic confit, red wine reduction.",
    price: "$65",
    category: 'Mains',
    image: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, porcini, chanterelles, 24-month aged parmesan.",
    price: "$32",
    category: 'Mains',
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Miso Glazed Cod",
    description: "Black cod, bok choy, ginger-soy emulsion, sesame seeds.",
    price: "$42",
    category: 'Mains',
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Dark Chocolate Fondant",
    description: "Warm lava cake, vanilla bean gelato, raspberry coulis.",
    price: "$14",
    category: 'Desserts',
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Lemon Tart",
    description: "Shortcrust pastry, zesty lemon curd, toasted meringue.",
    price: "$12",
    category: 'Desserts',
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Smoked Old Fashioned",
    description: "Bourbon, maple syrup, bitters, cedar wood smoke.",
    price: "$16",
    category: 'Drinks',
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-widest ${scrolled ? 'text-stone-900' : 'text-white'}`}>
          LUMIÈRE
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm uppercase tracking-widest hover:opacity-60 transition-opacity ${scrolled ? 'text-stone-900' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest transition-colors ${scrolled ? 'bg-stone-900 text-white hover:bg-stone-800' : 'bg-white text-stone-900 hover:bg-stone-100'}`}>
            Reservations
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-stone-900' : 'text-white'} /> : <MenuIcon className={scrolled ? 'text-stone-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-stone-900 text-lg font-serif"
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-stone-900 text-white py-3 rounded-full uppercase tracking-widest text-sm">
                Reservations
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1920" 
        alt="Restaurant Interior" 
        className="w-full h-full object-cover scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
    
    <div className="relative z-10 text-center px-6 max-w-4xl">
      <motion.span 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/80 uppercase tracking-[0.3em] text-sm mb-4 block"
      >
        Exquisite Culinary Experience
      </motion.span>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl md:text-8xl text-white font-serif mb-8 leading-tight"
      >
        Artistry on <br /> Every Plate
      </motion.h1>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row gap-4 justify-center"
      >
        <a href="#menu" className="bg-white text-stone-900 px-10 py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-stone-100 transition-colors">
          View Menu
        </a>
        <button className="border border-white text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-white/10 transition-colors">
          Book a Table
        </button>
      </motion.div>
    </div>
    
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center"
    >
      <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
      <div className="w-px h-12 bg-white/20" />
    </motion.div>
  </section>
);

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<'Starters' | 'Mains' | 'Desserts' | 'Drinks'>('Starters');
  const categories: ('Starters' | 'Mains' | 'Desserts' | 'Drinks')[] = ['Starters', 'Mains', 'Desserts', 'Drinks'];

  return (
    <section id="menu" className="py-24 bg-[#fdfcfb]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-stone-400 uppercase tracking-widest text-xs mb-2 block">Our Selection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Seasonal Menu</h2>
        </div>

        <div className="flex justify-center mb-12 space-x-4 md:space-x-8 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <AnimatePresence mode="wait">
            {MENU_ITEMS.filter(item => item.category === activeCategory).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex gap-6 group"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-xl font-serif text-stone-900">{item.name}</h3>
                    <span className="text-stone-600 font-medium">{item.price}</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
            alt="Chef at work" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-stone-900 rounded-2xl p-8 text-white hidden lg:flex flex-col justify-center">
          <ChefHat className="mb-4 w-10 h-10" />
          <p className="text-lg font-serif italic mb-2">"Cooking is an act of love and patience."</p>
          <span className="text-xs uppercase tracking-widest opacity-60">— Executive Chef Julian</span>
        </div>
      </div>
      
      <div>
        <span className="text-stone-400 uppercase tracking-widest text-xs mb-2 block">Our Story</span>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-8">A Culinary Journey Rooted in Tradition</h2>
        <p className="text-stone-600 leading-relaxed mb-6">
          Founded in 2012, Lumière was born from a simple vision: to create a space where fine dining feels intimate and approachable. We believe in the power of seasonal ingredients, sourced directly from local farmers who share our passion for quality.
        </p>
        <p className="text-stone-600 leading-relaxed mb-8">
          Every dish is a testament to our commitment to excellence, blending classical techniques with modern innovation. Join us for an evening of discovery, where every flavor tells a story.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <span className="text-3xl font-serif text-stone-900 block mb-1">12+</span>
            <span className="text-xs uppercase tracking-widest text-stone-400">Years of Excellence</span>
          </div>
          <div>
            <span className="text-3xl font-serif text-stone-900 block mb-1">24</span>
            <span className="text-xs uppercase tracking-widest text-stone-400">Local Suppliers</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 bg-stone-900 text-white">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
      <div>
        <h2 className="text-4xl font-serif mb-8">Visit Us</h2>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-stone-400 mt-1" />
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-2">Location</h4>
              <p className="text-stone-300">123 Culinary Avenue, Gastronomy District<br />New York, NY 10001</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-stone-400 mt-1" />
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-2">Hours</h4>
              <p className="text-stone-300">Tue – Thu: 5:00 PM – 10:00 PM</p>
              <p className="text-stone-300">Fri – Sat: 5:00 PM – 11:00 PM</p>
              <p className="text-stone-300">Sun: 11:00 AM – 9:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-stone-400 mt-1" />
            <div>
              <h4 className="text-sm uppercase tracking-widest mb-2">Contact</h4>
              <p className="text-stone-300">+1 (212) 555-0123</p>
              <p className="text-stone-300">hello@lumieredining.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm">
        <h3 className="text-2xl font-serif mb-6">Make a Reservation</h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Name" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="date" 
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
            />
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors appearance-none">
              <option className="bg-stone-900">2 People</option>
              <option className="bg-stone-900">3 People</option>
              <option className="bg-stone-900">4 People</option>
              <option className="bg-stone-900">5+ People</option>
            </select>
          </div>
          <textarea 
            placeholder="Special Requests" 
            rows={4}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white/40 transition-colors"
          ></textarea>
          <button className="w-full bg-white text-stone-900 py-4 rounded-lg uppercase tracking-widest text-sm font-bold hover:bg-stone-100 transition-colors">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-stone-950 text-white/40 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-xl font-serif tracking-widest text-white">LUMIÈRE</div>
      
      <div className="flex space-x-8">
        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
      </div>
      
      <div className="text-xs uppercase tracking-widest">
        © 2024 Lumière Dining. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-stone-900 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
