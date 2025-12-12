import { Fragment, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Zap, Users, TrendingUp, Search, X } from "lucide-react"
import MatchCard from "../components/cards/MatchCard"
import TradeCard from "../components/cards/TradeCard"
import { useAuthStore } from "../store/useAuthStore"
import { getLearn, getSkills, getWalletDetails } from "../lib/queries"

export default function Dashboard() {
  const { authUser } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "matches")

  const { data } = getWalletDetails()
  const credit = data?.credit ?? 0

  const { data: skills } = getSkills()

  const { data: learn } = getLearn()

  const mockMatches = [
    {
      id: 1,
      from: "Sarah Chen",
      role: "UI/UX Designer",
      score: 95,
      teaches: "Figma",
      wants: "Python",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      credits: 15,
      availableTime: "Mon, 4PM",
    },
    {
      id: 2,
      from: "Mike Ross",
      role: "Law Student",
      score: 88,
      teaches: "Public Speaking",
      wants: "Data Science",
      avatar: "https://i.pravatar.cc/150?u=mike",
      credits: 12,
      availableTime: "Wed, 2PM",
    },
    {
      id: 3,
      from: "Jessica Pearson",
      role: "MBA Student",
      score: 82,
      teaches: "Leadership",
      wants: "React",
      avatar: "https://i.pravatar.cc/150?u=jessica",
      credits: 20,
      availableTime: "Fri, 10AM",
    },
  ]

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const allSuggestedTrades = [
    {
      name: "Sarah J.",
      skill: "Advanced Python",
      learnSkill: "Graphic Design",
      teachSkill: "Leadership",
      rating: 4.8,
    },
    {
      name: "Mike T.",
      skill: "Guitar Basics",
      learnSkill: "French",
      teachSkill: "Public Speaking",
      rating: 4.5,
    },
    {
      name: "Emily R.",
      skill: "Digital Marketing",
      learnSkill: "Web Development",
      teachSkill: "Python",
      rating: 4.9,
    },
    {
      name: "David K.",
      skill: "Photography",
      learnSkill: "Video Editing",
      teachSkill: "Data Analysis",
      rating: 4.7,
    },
  ]

  const suggestedTrades = searchQuery
    ? allSuggestedTrades.filter(
        (t) =>
          t.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.wants.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : allSuggestedTrades // Keep empty initially as per original design, or use allSuggestedTrades if we want to show suggestions by default

  return (
    <main className="min-h-[calc(100vh-80px)] py-10 bg-background font-sans">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10 pb-6 border-b border-border/60 max-md:flex-col max-md:items-start max-md:gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {authUser?.fullName}!{" "}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here's what's happening with your skill trades today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isSearchOpen ? "w-64 opacity-100" : "w-0 opacity-0"
              }`}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skills..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-100 focus:border-purple-500 outline-none text-sm font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search
                  size={16}
                  className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                if (isSearchOpen) setSearchQuery("")
              }}
              className={`p-2.5 rounded-xl border transition-all ${
                isSearchOpen
                  ? "bg-slate-100 border-slate-200 text-slate-700"
                  : "bg-white border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-100 shadow-sm"
              }`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <button
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              onClick={() => navigate("/list-skill")}
            >
              <Zap size={18} />
              <span className="hidden sm:inline">List New Skill</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-indigo-100 transition-colors"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0 bg-linear-to-br from-indigo-500 to-indigo-600 shadow-indigo-100 shadow-lg relative z-10">
              <Zap size={28} />
            </div>
            <div className="relative z-10">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                Total Credits
              </p>
              <p className="text-3xl font-extrabold text-foreground">{credit.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-emerald-100 transition-colors"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0 bg-linear-to-br from-emerald-400 to-emerald-600 shadow-emerald-100 shadow-lg relative z-10">
              <Users size={28} />
            </div>
            <div className="relative z-10">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                Completed Trades
              </p>
              <p className="text-3xl font-extrabold text-foreground">0</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full translate-x-10 -translate-y-10 group-hover:bg-amber-100 transition-colors"></div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold shrink-0 bg-linear-to-br from-amber-400 to-amber-500 shadow-amber-100 shadow-lg relative z-10">
              <TrendingUp size={28} />
            </div>
            <div className="relative z-10">
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">
                Your Rating
              </p>
              <p className="text-3xl font-extrabold text-foreground">
                0 <span className="text-lg text-amber-500">⭐</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-8">
          <button
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === "matches"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("matches")}
          >
            My Matches
          </button>
          <button
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === "suggested"
                ? "bg-white text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("suggested")}
          >
            Suggested Trades
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeTab === "matches" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {mockMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {mockMatches.map((match) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      onAccept={() => navigate(`/trade/${match.id}`)}
                      onDecline={() => alert("Trade declined")}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-muted-foreground font-medium">No matches found yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "suggested" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {suggestedTrades.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? (
                        `matches found for "${searchQuery}"`
                      ) : (
                        <span>
                          Based on your interests
                          {/* <span className="font-semibold text-foreground">Python</span> and{" "}
                          <span className="font-semibold text-foreground">Graphic Design</span>. */}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {suggestedTrades.map((trade, idx) => (
                      <TradeCard key={idx} {...trade} onRequest={() => navigate(`/trade/${idx}`)} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-muted-foreground font-medium">
                    No suggested trades available yet.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white border boundary-border rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">My Skill Profile</h2>
            <button
              className="text-sm font-semibold text-primary hover:underline"
              onClick={() => navigate("/profile")}
            >
              Edit Profile
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> I Can Teach
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills && skills.length > 0 ? (
                  <Fragment>
                    {skills.map((skill) => (
                      <span className="bg-white text-indigo-700 border border-indigo-200 shadow-sm rounded-lg px-3 py-1.5 font-semibold text-sm flex items-center gap-2">
                        {skill.name}
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-1.5 py-0.5 rounded-full">
                          {skill.level}
                        </span>
                      </span>
                    ))}
                  </Fragment>
                ) : (
                  <span className="text-sm text-muted-foreground italic">No skills listed yet</span>
                )}

                <span
                  className="bg-white text-indigo-700 border border-indigo-200 shadow-sm border-dashed rounded-lg px-3 py-1.5 font-semibold text-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                  onClick={() => navigate("/profile")}
                >
                  + Add
                </span>
              </div>
            </div>

            <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span> I Want to Learn
              </h3>
              <div className="flex flex-wrap gap-2">
                {learn && learn.length > 0 ? (
                  <Fragment>
                    {learn.map((learn) => (
                      <span className="bg-white text-indigo-700 border border-indigo-200 shadow-sm rounded-lg px-3 py-1.5 font-semibold text-sm flex items-center gap-2">
                        {learn.name}
                      </span>
                    ))}
                  </Fragment>
                ) : (
                  <span className="text-sm text-muted-foreground italic">No skills listed yet</span>
                )}
                {/* Future: Map currentUser.learn skills here if available */}

                <span
                  className="bg-white text-purple-700 border border-purple-200 shadow-sm border-dashed rounded-lg px-3 py-1.5 font-semibold text-sm opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                  onClick={() => navigate("/profile")}
                >
                  + Add
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
