import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Zap, Layers, Video, MessageCircle, MapPin } from "lucide-react"

const skillOptions = [
  "Python", "JavaScript", "React", "Web Development",
  "Graphic Design", "UI/UX Design", "Video Editing",
  "Data Analysis", "Machine Learning", "Photography",
  "Music Production", "Writing", "Public Speaking",
  "French", "Spanish", "Guitar", "Piano", "Other",
]

export default function SkillListing() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    teach: "",
    want: "",
    level: "Intermediate",
    mode: "Video call",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    alert("Skill listed successfully! You can now see matches.")
    navigate("/dashboard")
  }

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 bg-background font-sans flex items-center justify-center">
      <div className="container max-w-[600px] mx-auto px-6">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">Share Your Knowledge</h1>
          <p className="text-muted-foreground">List a skill you can teach to start trading credits.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
         
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-4 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">New Listing</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">

            <div className="space-y-3">
              <label htmlFor="teach" className="text-sm font-bold text-foreground flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-md"><Zap size={16} /></div>
                Skill You Want to Teach
              </label>
              <div className="relative">
                <select
                  id="teach"
                  name="teach"
                  value={formData.teach}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-foreground cursor-pointer"
                >
                  <option value="">Select a skill...</option>
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="want" className="text-sm font-bold text-foreground flex items-center gap-2">
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md"><BookOpen size={16} /></div>
                Skill You Want to Learn
              </label>
              <div className="relative">
                <select
                  id="want"
                  name="want"
                  value={formData.want}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-foreground cursor-pointer"
                >
                  <option value="">Select a skill...</option>
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md"><Layers size={16} /></div>
                  Your Skill Level
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-foreground cursor-pointer"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-md"><Video size={16} /></div>
                  Preferred Mode
                </label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-foreground cursor-pointer"
                >
                  <option>Video call</option>
                  <option>In-person</option>
                  <option>Chat</option>
                  <option>Flexible</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="description" className="text-sm font-bold text-foreground flex items-center gap-2">
                <div className="p-1.5 bg-slate-100 text-slate-600 rounded-md"><MessageCircle size={16} /></div>
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Briefly describe your experience..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-foreground resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl font-bold text-lg shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                Create Listing <Zap size={20} className="fill-current" />
              </button>
              <p className="text-center text-xs text-muted-foreground mt-4">
                By listing, you agree to our <a href="#" className="underline hover:text-primary">Community Guidelines</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}
