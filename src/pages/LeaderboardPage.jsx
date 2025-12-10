import { useState } from "react"
import { Trophy, Medal, Star, TrendingUp, Flame, Award, Crown } from "lucide-react"

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Sarah Chen", trades: 5, credits: 12, badge: "UI/UX Guru", avatar: "https://i.pravatar.cc/150?u=sarah" },
  {
    rank: 2,
    name: "Mike Davidson",
    trades: 4,
    credits: 5,
    badge: "Python Pro",
    avatar: "https://i.pravatar.cc/150?u=mike",
  },
  { rank: 3, name: "Lisa Kim", trades: 3, credits: 4, badge: "Music Maestro", avatar: "https://i.pravatar.cc/150?u=lisa" },
  {
    rank: 4,
    name: "Student User.",
    trades: 3,
    credits: 3,
    badge: "Rising Star",
    avatar: "https://i.pravatar.cc/150?u=daniel",
  },
  { rank: 5, name: "Alex Johnson", trades: 3, credits: 3, badge: "", avatar: "https://i.pravatar.cc/150?u=alex" },
]

const BADGES = [
  { name: "Python Pro", icon: "code", color: "from-blue-500 to-cyan-500" },
  { name: "UI/UX Guru", icon: "palette", color: "from-pink-500 to-rose-500" },
  { name: "Music Maestro", icon: "music", color: "from-purple-500 to-indigo-500" },
  { name: "Rising Star", icon: "star", color: "from-amber-400 to-orange-500" },
  { name: "Trade Master", icon: "trophy", color: "from-emerald-400 to-green-600" },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("month")

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500 drop-shadow-sm" />
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400 drop-shadow-sm" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700 drop-shadow-sm" />
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{rank}</span>
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">

      <main className="max-w-[1000px] mx-auto px-6 py-12">
       
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-1.5 rounded-full mb-6 border border-amber-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
            <span className="font-bold text-xs uppercase tracking-wide">Top Traders This Month</span>
          </div>
          <h1 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">Community Leaderboard</h1>
          <p className="text-muted-foreground text-lg">Compete with fellow students, earn badges, and grow your skills.</p>
        </div>

        <div className="flex justify-center gap-1 mb-12 bg-slate-100 p-1.5 rounded-2xl w-fit mx-auto">
          {["week", "month", "all"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-xl font-bold capitalize transition-all text-sm ${timeframe === tf
                  ? "bg-white text-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-slate-200/50"
                }`}
            >
              {tf === "all" ? "All Time" : `This ${tf}`}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-end gap-4 sm:gap-8 mb-16 px-4">
          
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-slate-300 overflow-hidden shadow-lg">
                <img
                  src={MOCK_LEADERBOARD[1].avatar}
                  alt={MOCK_LEADERBOARD[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                2
              </div>
            </div>
            <p className="font-bold text-foreground text-sm mb-1">{MOCK_LEADERBOARD[1].name}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-lg">{MOCK_LEADERBOARD[1].trades} trades</p>
            <div className="mt-4 w-full h-24 bg-linear-to-t from-slate-200 to-slate-50/0 rounded-t-2xl"></div>
          </div>

          <div className="flex flex-col items-center -mb-6 z-10">
            <div className="relative mb-4">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce">
                <Crown size={32} className="text-yellow-400 fill-yellow-400 drop-shadow-md" />
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 overflow-hidden shadow-xl ring-4 ring-yellow-400/20">
                <img
                  src={MOCK_LEADERBOARD[0].avatar}
                  alt={MOCK_LEADERBOARD[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm text-lg">
                1
              </div>
            </div>
            <p className="font-bold text-foreground text-lg mb-1">{MOCK_LEADERBOARD[0].name}</p>
            <p className="text-xs text-yellow-700 font-bold uppercase tracking-wide bg-yellow-100 px-3 py-1 rounded-lg border border-yellow-200">{MOCK_LEADERBOARD[0].trades} trades</p>
            <div className="mt-4 w-full h-32 bg-linear-to-t from-yellow-200/50 to-yellow-50/0 rounded-t-2xl border-x border-t border-white/50 backdrop-blur-sm"></div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full border-4 border-amber-700/50 overflow-hidden shadow-lg">
                <img
                  src={MOCK_LEADERBOARD[2].avatar}
                  alt={MOCK_LEADERBOARD[2].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                3
              </div>
            </div>
            <p className="font-bold text-foreground text-sm mb-1">{MOCK_LEADERBOARD[2].name}</p>
            <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded-lg">{MOCK_LEADERBOARD[2].trades} trades</p>
            <div className="mt-4 w-full h-20 bg-linear-to-t from-amber-100 to-amber-50/0 rounded-t-2xl"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/30">
                <h2 className="font-bold text-foreground text-lg">Current Standings</h2>
                <div className="text-xs font-semibold text-muted-foreground">Updated: Just now</div>
              </div>
              <div className="divide-y divide-border">
                {MOCK_LEADERBOARD.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center gap-4 p-5 transition-colors ${user.isCurrentUser ? "bg-indigo-50/60" : "hover:bg-slate-50"
                      }`}
                  >
                    <div className="w-8 flex justify-center text-lg">{getRankIcon(user.rank)}</div>
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-100 shadow-sm" />
                    <div className="flex-1">
                      <p className="font-bold text-foreground text-sm flex items-center gap-2">
                        {user.name}
                        {user.isCurrentUser && (
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-bold uppercase tracking-wider">You</span>
                        )}
                      </p>
                      {user.badge && <span className="text-xs text-purple-600 font-semibold flex items-center gap-1 mt-0.5"><Award size={12} />{user.badge}</span>}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground text-sm">{user.trades} trades</p>
                      <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1 border border-emerald-100">{user.credits} credits</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                Available Badges
              </h3>
              <div className="space-y-3">
                {BADGES.map((badge) => (
                  <div key={badge.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-default group">
                    <div
                      className={`w-10 h-10 bg-linear-to-br ${badge.color} rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}
                    >
                      <Star className="w-5 h-5 fill-white/20" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-sm block group-hover:text-primary transition-colors">{badge.name}</span>
                      <span className="text-xs text-muted-foreground">Unlock at 50 trades</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden shadow-lg shadow-primary/25">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp size={100} />
              </div>
              <TrendingUp className="w-8 h-8 mb-4 relative z-10" />
              <h3 className="font-bold text-lg mb-1 relative z-10">Your Progress</h3>
              <p className="text-sm text-primary-foreground/80 mb-4 relative z-10">Complete 2 more trades to reach the Top 3!</p>

              <div className="flex justify-between text-xs font-bold mb-1 opacity-90 relative z-10">
                <span>Current: 3</span>
                <span>Goal: 5</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden relative z-10">
                <div className="w-[55%] h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
