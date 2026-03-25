import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUpload() {
  // --- LOGIN STATES ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // --- DASHBOARD STATES ---
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', durationInMonths: '', description: '' });

  // Data Load karo jab admin login ho jaye
  useEffect(() => {
    if (isLoggedIn) {
      fetchImages();
      fetchPlans();
    }
  }, [isLoggedIn]);

  const fetchImages = () => {
    axios.get('https://gym-backend-live.onrender.com/api/gallery/all')
      .then(res => setImages(res.data)).catch(err => console.error(err));
  };

  const fetchPlans = () => {
    axios.get('https://gym-backend-live.onrender.com/api/plans')
      .then(res => setPlans(res.data)).catch(err => console.error(err));
  };

  // --- LOGIN FUNCTION ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Simple basic security ke liye (Tum ise baad mein change kar sakte ho)
    if (username === 'admin' && password === '12345') {
      setIsLoggedIn(true);
    } else {
      alert('Wrong Username or Password!');
    }
  };

  // --- UPLOAD IMAGE FUNCTION ---
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image first!");

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // Dhyan de: Agar tumhara upload URL kuch aur hai toh isko change kar lena
      await axios.post('https://gym-backend-live.onrender.com/api/gallery/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Image Uploaded Successfully!");
      setFile(null); // Clear input
      fetchImages(); // Refresh gallery
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // --- DELETE IMAGE FUNCTION ---
  const handleDeleteImage = (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      axios.delete(`https://gym-backend-live.onrender.com/api/gallery/${id}`)
        .then(() => fetchImages())
        .catch(err => alert("Error deleting image"));
    }
  };

  // --- ADD PLAN FUNCTION ---
  const handleAddPlan = (e) => {
    e.preventDefault();
    axios.post('https://gym-backend-live.onrender.com/api/plans', newPlan)
      .then(() => {
        alert("Plan Added Successfully!");
        setNewPlan({ name: '', price: '', durationInMonths: '', description: '' });
        fetchPlans();
      })
      .catch(err => alert("Error adding plan"));
  };

  // --- DELETE PLAN FUNCTION ---
  const handleDeletePlan = (id) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      axios.delete(`https://gym-backend-live.onrender.com/api/plans/${id}`)
        .then(() => fetchPlans())
        .catch(err => alert("Error deleting plan"));
    }
  };


  // ==========================================
  // 1. LOGIN SCREEN (Agar Login nahi hai toh)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-body">
        <form onSubmit={handleLogin} className="bg-[#1a1a1a] p-10 rounded-2xl border border-[#333] w-96 shadow-[0_0_30px_rgba(57,255,20,0.1)]">
          <h2 className="text-3xl font-heading text-[#39FF14] text-center mb-8 tracking-wider">ADMIN LOGIN</h2>
          <input 
            type="text" placeholder="Username" required
            value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 p-3 bg-black border border-[#333] text-white rounded focus:outline-none focus:border-[#39FF14]"
          />
          <input 
            type="password" placeholder="Password" required
            value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-8 p-3 bg-black border border-[#333] text-white rounded focus:outline-none focus:border-[#39FF14]"
          />
          <button type="submit" className="w-full py-3 bg-[#39FF14] text-black font-bold rounded hover:bg-[#2ecc11] transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  // ==========================================
  // 2. MAIN DASHBOARD (Agar Login ho gaya)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 font-body">
      <div className="flex justify-between items-center mb-10 border-b border-[#333] pb-4">
        <h1 className="text-3xl md:text-4xl font-heading tracking-widest text-[#39FF14]">GYM ADMIN DASHBOARD</h1>
        <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* --- MANAGE GALLERY SECTION --- */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-[#333] pb-2">Manage Gallery</h2>
          
          {/* Upload Form */}
          <form onSubmit={handleUpload} className="mb-8 flex flex-col sm:flex-row gap-3">
            <input 
              type="file" accept="image/*" required
              onChange={(e) => setFile(e.target.files[0])}
              className="flex-grow p-2 bg-black border border-[#333] rounded text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#39FF14] file:text-black hover:file:bg-[#2ecc11]" 
            />
            <button type="submit" disabled={uploading} className="bg-[#39FF14] text-black font-bold py-2 px-6 rounded hover:bg-[#2ecc11] transition disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </form>

          {/* Images Grid with Delete Button */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-96 pr-2 custom-scrollbar">
            {images.map(img => (
              <div key={img.id} className="relative group rounded-lg overflow-hidden border border-[#333]">
                <img src={img.imageUrl} alt="Gym" className="w-full h-32 object-cover group-hover:opacity-50 transition" />
                <button 
                  onClick={() => handleDeleteImage(img.id)}
                  className="absolute inset-0 m-auto w-20 h-8 bg-red-600 text-white rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition shadow-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- MANAGE PLANS SECTION --- */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#333]">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-[#333] pb-2">Manage Gym Plans</h2>
          
          {/* Add Plan Form */}
          <form onSubmit={handleAddPlan} className="flex flex-col gap-3 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Plan Name (e.g. BEAST PLAN)" value={newPlan.name} onChange={e => setNewPlan({...newPlan, name: e.target.value})} className="p-3 bg-black border border-[#333] rounded text-white focus:outline-none focus:border-[#39FF14]" required />
              <input type="number" placeholder="Price (e.g. 2499)" value={newPlan.price} onChange={e => setNewPlan({...newPlan, price: e.target.value})} className="p-3 bg-black border border-[#333] rounded text-white focus:outline-none focus:border-[#39FF14]" required />
            </div>
            <input type="number" placeholder="Duration in Months (e.g. 6)" value={newPlan.durationInMonths} onChange={e => setNewPlan({...newPlan, durationInMonths: e.target.value})} className="p-3 bg-black border border-[#333] rounded text-white focus:outline-none focus:border-[#39FF14]" required />
            <textarea placeholder="Plan Details (e.g. Cardio, Diet Plan)" value={newPlan.description} onChange={e => setNewPlan({...newPlan, description: e.target.value})} className="p-3 bg-black border border-[#333] rounded text-white focus:outline-none focus:border-[#39FF14] h-24" required />
            <button type="submit" className="bg-[#39FF14] text-black font-bold py-3 rounded mt-2 hover:bg-[#2ecc11] transition">Add New Plan</button>
          </form>

          {/* Plans List with Delete Button */}
          <div className="space-y-3 overflow-y-auto max-h-72 pr-2 custom-scrollbar">
            {plans.map(plan => (
              <div key={plan.id} className="bg-black p-4 rounded-lg border border-[#333] flex justify-between items-center group hover:border-[#39FF14] transition">
                <div>
                  <h3 className="font-bold text-lg text-[#39FF14]">{plan.name}</h3>
                  <p className="text-sm text-gray-400">₹{plan.price} / {plan.durationInMonths} months</p>
                </div>
                <button onClick={() => handleDeletePlan(plan.id)} className="bg-red-600 px-4 py-2 rounded font-bold text-sm text-white hover:bg-red-700 transition opacity-0 group-hover:opacity-100">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminUpload;