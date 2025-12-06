import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { MapPin, Mail, Edit2, Star, Clock, Zap, BookOpen } from "lucide-react"

export default function Profile() {

  const { currentUser } = useContext(AuthContext)

  const profileData = {
    name: currentUser?.name || "Student User",
    email: currentUser?.email || "student@university.edu",
    role: "Computer Science Student",
    location: "New York, USA",
    rating: 4.8,
    reviews: 12,
    completedTrades: 8,
    totalCredits: 45,
    hoursTaught: 24,
    skillsOffered: ["Python", "Data Analysis", "Power BI", "React"],
    skillsWanted: ["Graphic Design", "Video Editing", "Public Speaking"],
    pastTrades: [
      { with: "Daniel F.", skill: "Python", date: "Dec 1, 2024", rating: 5, credits: 5, status: "Completed" },
      { with: "Emma S.", skill: "Graphic Design", date: "Nov 28, 2024", rating: 4.8, credits: -4, status: "Completed" },
      { with: "Mike T.", skill: "Video Editing", date: "Nov 25, 2024", rating: 4.9, credits: -3, status: "Completed" },
    ],
  }

  return (
    <div className="min-h-screen bg-background pb-12 font-sans">
     
      <div className="h-48 bg-linear-to-r from-indigo-900 via-slate-900 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10"></div>
      </div>

      <div className="container max-w-[1000px] mx-auto px-6 -mt-20 relative z-10">
       
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-5xl font-bold uppercase shadow-xl border-4 border-white">
                {profileData.name.charAt(0)}
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-slate-600 hover:text-primary transition-colors border border-slate-100 cursor-pointer">
                <Edit2 size={16} />
              </button>
            </div>

            <div className="flex-1 pt-2 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-foreground">{profileData.name}</h1>
                  <p className="text-muted-foreground font-medium flex items-center gap-2">
                    {profileData.role} • {profileData.location}
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold transition-colors shadow-sm">
                    Edit Profile
                  </button>
                  <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-dark font-semibold transition-colors shadow-md shadow-primary/25">
                    Share <span className="hidden sm:inline">Profile</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-slate-100">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
                    <Star size={20} className="fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Reputation</p>
                    <p className="text-lg font-bold text-foreground">{profileData.rating}/5.0</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Hours Taught</p>
                    <p className="text-lg font-bold text-foreground">{profileData.hoursTaught} hrs</p>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Credits</p>
                    <p className="text-lg font-bold text-foreground">{profileData.completedTrades} Earned</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Zap size={18} className="text-indigo-500" /> I Can Teach
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skillsOffered.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-lg border border-indigo-100">{skill}</span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-500" /> I Want To Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skillsWanted.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg border border-purple-100">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
                <h3 className="text-lg font-bold text-foreground">Trade History</h3>
                <button className="text-sm font-semibold text-primary hover:text-primary-dark">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Skill Traded</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Credits</th>
                      <th className="px-6 py-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {profileData.pastTrades.map((trade, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-foreground">{trade.with}</td>
                        <td className="px-6 py-4 text-muted-foreground">{trade.skill}</td>
                        <td className="px-6 py-4 text-muted-foreground text-sm">{trade.date}</td>
                        <td className={`px-6 py-4 text-right font-bold ${trade.credits > 0 ? "text-emerald-600" : "text-amber-600"}`}>
                          {trade.credits > 0 ? "+" : ""}{trade.credits}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                            {trade.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
