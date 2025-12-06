import { useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { LogIn, User, Lock, ArrowRight } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    const result = login(email.trim(), password)

    if (result.success) {

    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6 relative overflow-hidden">
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-white relative z-10 overflow-hidden">
        
        <div className="bg-indigo-600 h-2"></div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-500">Sign in to continue trading skills</p>
          </div>

          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="student@university.edu"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
            >
              Log In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
