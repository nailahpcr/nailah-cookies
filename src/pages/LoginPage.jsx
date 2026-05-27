import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard'); // Disesuaikan langsung ke dashboard utama pasca login sukses
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#4880FF] px-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-950 tracking-tight">Login to Account</h1>
          <p className="text-gray-400 text-xs mt-2">Please enter your email and password to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Email address :</label>
            <input 
              type="email" 
              placeholder="esteban_schiller@gmail.com" 
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4880FF]/30 focus:border-[#4880FF] outline-none transition-all" 
              required 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password :</label>
              <a href="#" className="text-xs text-[#4880FF] font-bold hover:underline">Forget Password?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4880FF]/30 focus:border-[#4880FF] outline-none transition-all" 
              required 
            />
          </div>

          <div className="flex items-center gap-2.5 py-1">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded text-[#4880FF] focus:ring-[#4880FF]" />
            <label htmlFor="remember" className="text-xs font-semibold text-gray-500 cursor-pointer">Remember Password</label>
          </div>

          <button type="submit" className="w-full bg-[#4880FF] text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm shadow-md">
            Sign In
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Don't have an account? <a href="#" className="text-[#4880FF] font-bold hover:underline">Create Account</a>
        </p>
      </div>
    </div>
  );
}