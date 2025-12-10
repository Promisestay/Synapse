import { useState } from "react"
import { Link } from "react-router-dom"
import {
  Layers,
  Zap,
  User,
  Lock,
  Mail,
  ArrowRight,
  BookOpen,
  AlertCircle,
  Loader,
} from "lucide-react"
import { useAuthStore } from "../store/useAuthStore"

const skillOptions = [
  "Python",
  "JavaScript",
  "React",
  "Web Development",
  "Graphic Design",
  "UI/UX Design",
  "Video Editing",
  "Data Analysis",
  "Machine Learning",
  "Photography",
  "Music Production",
  "Writing",
  "Public Speaking",
  "French",
  "Spanish",
  "Guitar",
  "Piano",
  "Other",
]

export default function Signup() {
  const { signup, isSigningUp } = useAuthStore()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skillName: "",
    skillLevel: "",
    password: "",
    confirmPassword: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    const { name, ...rest } = formData
    const result = signup({ ...rest, fullName: name })
    setError("")

    if (result.success) {
      navigate("/dashboard")
    } else {
      setError(result.message)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-purple-100 border border-white relative z-10 overflow-hidden">
        <div className="bg-purple-600 h-2"></div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-inner">
              <BookOpen size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500">Join the community and start trading skills</p>
          </div>

          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 justify-center animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="student@university.edu"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="teach" className="text-sm font-bold text-slate-700 ml-1">
                  Add Skills
                </label>
                <div className="relative">
                  <select
                    id="teach"
                    name="skillName"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    value={formData.skillName}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a skill...</option>
                    {skillOptions.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  <Zap className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Level</label>
                <div className="relative">
                  <select
                    name="skillLevel"
                    value={formData.skillLevel}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    required
                  >
                    <option>beginner</option>
                    <option>intermediate</option>
                    <option>expert</option>
                  </select>
                  <Layers className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Confirm</label>
                <div className="relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-purple-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group mt-2"
            >
              {isSigningUp ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
