import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState([]);

  // Database se photos lana (LIVE URL)
  const fetchImages = async () => {
    try {
      const res = await axios.get('https://gym-backend-live.onrender.com/api/gallery/all');
      setGallery(res.data);
    } catch (error) {
      console.error("Failed to fetch images", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchImages();
  }, [isLoggedIn]);

  // Login Handle Karna (LIVE URL)
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://gym-backend-live.onrender.com/api/admin/login', { username, password });
      if (res.data.success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      alert("Galat Username ya Password! Kripya check karein.");
    }
  };

  // Photo Upload Handle Karna (LIVE URL)
  const handleUpload = async () => {
    if (!image) return alert("Pehle ek photo select karo!");
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await fetch("https://gym-backend-live.onrender.com/api/gallery/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Photo Upload Ho Gayi! 🎉 Ab ye website par dikhegi.");
        setImage(null);
        fetchImages();
      } else {
        alert("Upload fail ho gaya.");
      }
    } catch (error) {
      alert("Error aa gaya.");
    } finally {
      setUploading(false);
    }
  };

  // Delete Handle Karna (LIVE URL)
  const handleDelete = async (id) => {
    if (window.confirm("Sach mein delete karna hai?")) {
      try {
        await axios.delete(`https://gym-backend-live.onrender.com/api/gallery/${id}`);
        fetchImages();
      } catch (error) {
        alert("Delete fail ho gaya.");
      }
    }
  };

  // --- PASSWORD SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 selection:bg-[#39FF14] selection:text-black">
        <form onSubmit={handleLogin} className="bg-[#1a1a1a] p-8 rounded-xl border border-[#39FF14] shadow-[0_0_20px_rgba(57,255,20,0.3)] w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-white tracking-widest mb-2">FITNESS<span className="text-[#39FF14]">PRO</span></h1>
            <h2 className="text-xl font-bold text-gray-400">Admin Access Panel</h2>
          </div>
          
          <input 
            type="text" placeholder="Username (Hint: admin)" required 
            value={username} onChange={(e) => setUsername(e.target.value)} 
            className="w-full bg-[#0a0a0a] text-white p-4 rounded mb-4 border border-[#333] focus:border-[#39FF14] outline-none" 
          />
          <input 
            type="password" placeholder="Password (Hint: gym123)" required 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            className="w-full bg-[#0a0a0a] text-white p-4 rounded mb-8 border border-[#333] focus:border-[#39FF14] outline-none" 
          />
          <button type="submit" className="w-full py-4 bg-[#39FF14] text-black font-bold text-lg rounded hover:bg-[#2ecc11] transition-all">
            Unlock Dashboard
          </button>
          <a href="/" className="block text-center mt-6 text-gray-500 hover:text-white text-sm underline">Back to Main Website</a>
        </form>
      </div>
    );
  }

  // --- MAIN ADMIN DASHBOARD ---
  return (
    <div className="p-8 bg-[#0a0a0a] text-white min-h-screen">
      <div className="flex justify-between items-center mb-8 border-b border-[#333] pb-4">
        <h2 className="text-3xl font-bold text-[#39FF14]">Admin Dashboard</h2>
        <div className="flex gap-4">
          <a href="/" className="text-gray-400 hover:text-white font-bold px-4 py-2">View Website</a>
          <button onClick={() => setIsLoggedIn(false)} className="text-red-500 font-bold border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition">Logout</button>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#39FF14]/30 max-w-xl mb-10 shadow-lg">
        <h3 className="text-xl mb-4 font-bold text-white">Upload New Photo to Gallery</h3>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-4 block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-[#39FF14] file:text-black file:border-0 file:font-bold hover:file:bg-[#2ecc11]" />
        <button onClick={handleUpload} disabled={uploading} className="bg-[#39FF14] text-black font-bold py-2 px-6 rounded disabled:opacity-50 hover:scale-105 transition">{uploading ? "Uploading to Cloud..." : "Upload Photo"}</button>
      </div>

      <div>
        <h3 className="text-2xl mb-4 font-bold border-b border-[#333] pb-2 text-white">Live Gallery Details</h3>
        {gallery.length === 0 ? (
          <p className="text-gray-500">No photos uploaded yet. Uploaded photos will appear here and on the main website.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {gallery.map((img) => (
              <div key={img.id} className="relative group bg-[#1a1a1a] p-2 rounded border border-[#333] hover:border-[#39FF14] transition">
                <img src={img.imageUrl} alt="gym" className="w-full h-32 object-cover rounded" />
                <button onClick={() => handleDelete(img.id)} className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUpload;