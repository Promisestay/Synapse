import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Zap, Layers, Video, MessageCircle, DollarSign, Database } from "lucide-react"

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
    credits: "20",
    mode: "Video call",
    description: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    alert("Skill exchange listed successfully!")
    navigate("/dashboard")
  }

  return (
    <main className="min-h-[calc(100vh-80px)] py-12 bg-white font-sans flex items-center justify-center">
      <div className="container max-w-[500px] mx-auto px-6">

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Skill Exchange</h1>
            <p className="text-slate-500 font-medium text-sm">List a skill you can teach to start trading credits</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <div className="space-y-2">
              <label htmlFor="teach" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Zap size={16} className="text-indigo-600" />
                Skill You want to Teach
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="teach"
                  placeholder="Python"
                  value={formData.teach}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="want" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <BookOpen size={16} className="text-purple-600" />
                Skill You want to Learn
              </label>
              <div className="relative">
                <select
                  id="want"
                  name="want"
                  value={formData.want}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-purple-200 focus:ring-4 focus:ring-purple-50/50 transition-all font-medium text-slate-900 cursor-pointer outline-none appearance-none"
                >
                  <option value="">Select a skill</option>
                  {skillOptions.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Video size={16} className="text-emerald-600" />
                  Preferred Mode
                </label>
                <div className="relative">
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 transition-all font-medium text-slate-900 cursor-pointer outline-none appearance-none"
                  >
                    <option>Video call</option>
                    <option>In-person</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Database size={16} className="text-amber-600" />
                  Credits
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl font-medium text-slate-500">
                    {formData.credits} Credits
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MessageCircle size={16} className="text-slate-600" />
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                placeholder="Briefly describe your experience................"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-slate-200 focus:ring-4 focus:ring-slate-100 transition-all font-medium text-slate-900 resize-none outline-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                Exchange <Zap size={18} className="fill-current" />
              </button>
              <p className="text-center text-[10px] text-slate-500 mt-4 font-semibold">
                By exchanging, you agree to our <a href="#" className="underline">Community Guidelines</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </main>
  )
}
