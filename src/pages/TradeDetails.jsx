import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Clock, User, MessageSquare, CheckCircle, ArrowLeft, Calendar, Shield, XCircle, AlertCircle } from "lucide-react"

export default function TradeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState("pending")

  const tradeData = {
    from: "Sarah M.",
    to: "You",
    teachSkill: "Python",
    learnSkill: "Graphic Design",
    time: "Friday, 2:00 PM",
    duration: "1 hour",
    credits: 3,
    message: "I would love to learn graphic design! I can teach you Python basics.",
    meetLink: "https://meet.google.com/example",
  }

  const handleConfirm = () => {
    setStatus("confirmed")
  }

  const handleCancel = () => {
    navigate("/dashboard")
  }

  return (
    <main className="min-h-[calc(100vh-80px)] py-10 bg-background font-sans">
      <div className="container max-w-[1000px] mx-auto px-6">

        <button
          className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-8"
          onClick={() => navigate("/dashboard", { state: { activeTab: "matches" } })}
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
            <ArrowLeft size={16} />
          </div>
          Back to Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-8">
  
          <div className="md:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <CheckCircle size={120} />
              </div>

              <h1 className="text-3xl font-extrabold text-foreground mb-2 relative z-10">Trade Request</h1>
              <p className="text-muted-foreground relative z-10">Review the details below to accept or decline.</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Request From</p>
                    <p className="text-lg font-bold text-foreground">{tradeData.from}</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Credits</p>
                    <p className="text-lg font-bold text-emerald-600">+{tradeData.credits} Credits</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border-2 border-white shadow-sm">
                    $
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border bg-slate-50/50">
                <h3 className="font-bold text-lg text-foreground">Exchange Details</h3>
              </div>
              <div className="p-6 grid sm:grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">They Teach</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span className="font-bold text-foreground text-lg">{tradeData.teachSkill}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">You Teach</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    <span className="font-bold text-foreground text-lg">{tradeData.learnSkill}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Proposed Time</p>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <Calendar size={18} className="text-slate-400" />
                    {tradeData.time}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Duration</p>
                  <div className="flex items-center gap-2 font-medium text-slate-700">
                    <Clock size={18} className="text-slate-400" />
                    {tradeData.duration}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex gap-4">
              <div className="shrink-0 mt-1">
                <MessageSquare className="text-slate-400" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message from {tradeData.from}</p>
                <p className="text-slate-700 leading-relaxed italic">"{tradeData.message}"</p>
              </div>
            </div>

            {status === "pending" ? (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> Accept Trade
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-red-600 hover:border-red-100 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={20} /> Decline
                </button>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-1">Trade Confirmed!</h3>
                <p className="text-emerald-700 mb-4 text-sm">A calendar invite has been sent to both parties.</p>
                <a href={tradeData.meetLink} target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline hover:text-emerald-800">
                  Join Meeting Link
                </a>
              </div>
            )}

          </div>

          <div className="space-y-6">
            <div className="bg-white border boundary-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                <Shield className="text-emerald-500" size={20} />
                Safety First
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  Meet in safe public spaces or use verified video links.
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  Report suspicious behavior immediately.
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  Credits are held in escrow until completion.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
              <div className="flex items-center gap-2 font-bold text-amber-900 mb-2">
                <AlertCircle size={20} />
                Tips
              </div>
              <p className="text-sm text-amber-800 leading-relaxed">
                Be punctual! Tardiness can affect your reputation score. Ensure you have a stable internet connection for video calls.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
