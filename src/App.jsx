import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { FaDumbbell, FaUsers, FaTrophy, FaWhatsapp, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import AdminUpload from './components/AdminUpload';

// --- YEH TUMHARA MAIN WEBSITE (HOME PAGE) HAI ---
function Home() {
  const [gallery, setGallery] = useState([]);

  // Database se sirf Gallery layenge (LIVE URL)
  useEffect(() => {
    axios.get('https://gym-backend-live.onrender.com/api/gallery/all')
      .then(res => setGallery(res.data))
      .catch(err => console.error(err));
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/919999999999?text=Hi,%20I%20want%20to%20join%20the%20gym!', '_blank');
  };

  const scrollToExplore = () => {
    document.getElementById('explore-gym-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body selection:bg-[#39FF14] selection:text-black">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center bg-black/80 backdrop-blur-md fixed w-full z-50 border-b border-[#1a1a1a]">
        <h1 className="text-3xl font-heading tracking-wider neon-glow text-[#39FF14]">FITNESS<span className="text-white">PRO</span></h1>
        <div className="flex gap-6 items-center">
          {/* LINK TO SECURE ADMIN PANEL */}
          <Link to="/admin" className="text-gray-400 hover:text-[#39FF14] text-sm font-bold border border-[#333] px-4 py-1 rounded-full hover:border-[#39FF14] transition">Admin Panel</Link>
          <button onClick={openWhatsApp} className="hidden md:flex items-center gap-2 px-6 py-2 bg-[#39FF14] text-black font-bold rounded-full hover:bg-[#2ecc11] transition-all">
            <FaWhatsapp className="text-xl" /> Join Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
        
        <div className="relative z-10 px-6">
          <h2 className="text-6xl md:text-8xl font-heading mb-4 tracking-wider">
            BUILD YOUR <span className="text-[#39FF14] neon-glow">LEGACY</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-xl">The ultimate destination for serious fitness enthusiasts. Best equipments, premium vibe.</p>
          <button onClick={scrollToExplore} className="px-10 py-4 bg-[#39FF14] text-black font-bold text-xl hover:scale-105 transition-transform rounded shadow-[0_0_20px_#39FF14]">
            EXPLORE GYM
          </button>
        </div>
      </section>

      {/* EXPLORE GYM SECTION (Sab kuch idhar hai) */}
      <div id="explore-gym-section">
        
        {/* Dynamic Gallery Section (Admin panel se upload ki hui photos yahan aayengi) */}
        <section className="py-20 bg-[#0a0a0a]">
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">LIVE <span className="text-[#39FF14]">GALLERY</span></h2>
          
          {gallery.length === 0 ? (
             <div className="text-center text-gray-500 border border-[#333] p-10 max-w-3xl mx-auto rounded-xl">
               <p className="text-xl">Admin is updating the gallery...</p>
               <p className="text-sm mt-2">Check back soon for latest gym photos!</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
              {gallery.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-xl border border-[#222] group">
                  <img src={img.imageUrl} alt="Gym Activity" className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Pricing / Packages Section (Fix kar diya gaya hai) */}
        <section className="py-20 px-6 bg-[#111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">CHOOSE YOUR <span className="text-[#39FF14]">PLAN</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Basic Plan */}
              <div className="p-8 bg-[#1a1a1a] rounded-3xl border border-[#333] hover:border-[#39FF14] transition flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-2">IRON PLAN</h3>
                <div className="text-4xl font-black text-white mb-6">₹1,499<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                <ul className="text-gray-400 mb-8 space-y-3 text-left w-full">
                  <li>✔️ Cardio & Weight Area</li>
                  <li>✔️ Locker Facility</li>
                  <li>❌ No Diet Plan</li>
                </ul>
                <button onClick={openWhatsApp} className="w-full py-3 border border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition">Join Now</button>
              </div>

              {/* Pro Plan */}
              <div className="p-8 bg-[#1a1a1a] rounded-3xl border-2 border-[#39FF14] relative transform scale-105 shadow-[0_0_30px_rgba(57,255,20,0.15)] flex flex-col items-center text-center">
                <div className="absolute -top-4 bg-[#39FF14] text-black px-6 py-1 rounded-full font-bold text-sm">MOST POPULAR</div>
                <h3 className="text-2xl font-bold mb-2 mt-4">BEAST PLAN</h3>
                <div className="text-4xl font-black text-[#39FF14] mb-6">₹2,499<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                <ul className="text-gray-400 mb-8 space-y-3 text-left w-full">
                  <li>✔️ Unlimited Gym Access</li>
                  <li>✔️ Customized Diet Plan</li>
                  <li>✔️ Group Classes (Zumba/Yoga)</li>
                  <li>✔️ Free Towel Service</li>
                </ul>
                <button onClick={openWhatsApp} className="w-full py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:bg-[#2ecc11] transition">Join Now</button>
              </div>

              {/* Yearly Plan */}
              <div className="p-8 bg-[#1a1a1a] rounded-3xl border border-[#333] hover:border-[#39FF14] transition flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold mb-2">LEGACY PLAN</h3>
                <div className="text-4xl font-black text-white mb-6">₹14,999<span className="text-lg text-gray-400 font-normal">/yr</span></div>
                <ul className="text-gray-400 mb-8 space-y-3 text-left w-full">
                  <li>✔️ 12 Months All Access</li>
                  <li>✔️ 2 Months Personal Training</li>
                  <li>✔️ Free Gym Kit & Shaker</li>
                </ul>
                <button onClick={openWhatsApp} className="w-full py-3 border border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition">Join Now</button>
              </div>

            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">OUR <span className="text-[#39FF14]">TRAINERS</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-xl border border-[#333] hover:border-[#39FF14] transition">
              <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=500&auto=format&fit=crop" alt="Trainer 1" className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-[#39FF14]">Vikram Singh</h3>
                <p className="text-white">Head Coach & Dietician</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-[#333] hover:border-[#39FF14] transition">
              <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=500&auto=format&fit=crop" alt="Trainer 2" className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-[#39FF14]">Rahul Sharma</h3>
                <p className="text-white">CrossFit & Strength Expert</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl border border-[#333] hover:border-[#39FF14] transition">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=500&auto=format&fit=crop" alt="Trainer 3" className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-2xl font-bold text-[#39FF14]">Neha Kapoor</h3>
                <p className="text-white">Yoga & Flexibility Coach</p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Details / Footer Section */}
        <footer className="bg-black py-16 px-6 border-t border-[#333]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h1 className="text-3xl font-heading tracking-wider text-[#39FF14] mb-4">FITNESS<span className="text-white">PRO</span></h1>
              <p className="text-gray-400">Your body can stand almost anything. It's your mind that you have to convince. Join us today.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Gym Address</h3>
              <p className="flex items-start gap-3 text-gray-400 mb-2">
                <FaMapMarkerAlt className="text-[#39FF14] mt-1 text-xl shrink-0" /> 
                <span>101, Iron Paradise Building,<br/>Near Metro Station, New Delhi, 110001</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Contact Info</h3>
              <p className="text-gray-400 mb-2 font-bold tracking-wide">📞 +91 99999 88888</p>
              <p className="text-gray-400 mb-4">✉️ contact@fitnesspro.in</p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#39FF14] hover:text-black transition cursor-pointer"><FaInstagram className="text-xl" /></a>
                <button onClick={openWhatsApp} className="p-3 bg-[#1a1a1a] rounded-full hover:bg-[#39FF14] hover:text-black transition"><FaWhatsapp className="text-xl" /></button>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm mt-16 pt-8 border-t border-[#1a1a1a]">
            © 2026 FitnessPro Gym. All Rights Reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

// --- APP ROUTER ---
function App() {
  return (
    <Router>
      <Routes>
        {/* Normal Logo ke liye Homepage */}
        <Route path="/" element={<Home />} />
        
        {/* Sirf Admin ke liye Secure Login Page */}
        <Route path="/admin" element={<AdminUpload />} />
      </Routes>
    </Router>
  );
}

export default App;