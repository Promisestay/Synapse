import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Video, Calendar, Clock, MessageSquare, Check, X, Star, Shield, Send } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock trade data
const MOCK_TRADE = {
  id: 1,
  status: "pending", 
  proposedTime: "Tomorrow, 2:00 PM",
  duration: "1 hour",
  mode: "video",
  requester: {
    name: "Sarah Chen",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 4.9,
    trades: 12,
    teachSkill: "UI/UX Design",
    teachLevel: "Advanced",
  },
  receiver: {
    name: "You (Daniel F.)",
    avatar: "https://i.pravatar.cc/150?u=daniel",
    rating: 4.8,
    trades: 8,
    teachSkill: "Python",
    teachLevel: "Intermediate",
  },
  credits: 5,
  messages: [
    {
      id: 1,
      sender: "Sarah Chen",
      text: "Hey! I saw your Python listing. I'd love to trade for some UI/UX lessons!",
      time: "2 hours ago",
    },
    { id: 2, sender: "You", text: "Sounds great! I'm free tomorrow afternoon if that works?", time: "1 hour ago" },
    { id: 3, sender: "Sarah Chen", text: "Perfect! 2 PM works for me. See you then!", time: "30 min ago" },
  ],
}

export default function TradePage() {
  const [trade] = useState(MOCK_TRADE)
  const [newMessage, setNewMessage] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const Navigate = useNavigate()

  const handleSendMessage = (e) => {
    e.preventDefault()
    
    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">

      <main className="max-w-[1000px] mx-auto px-6 py-8">
       
        <button 
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-8 group"
          onClick={() => Navigate("/dashboard", { state: { activeTab: "suggested" } })}
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
            <ArrowLeft size={16} />
          </div>
          Back to Dashboard
        </button>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2 space-y-6">
 
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-foreground">Trade Session</h1>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${trade.status === "pending"
                      ? "bg-amber-50 text-amber-700 border border-amber-100"
                      : trade.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}
                >
                  {trade.status}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50/50 rounded-xl p-8 mb-8 border border-slate-100 relative overflow-hidden">

                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[16px_16px]"></div>

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="relative">
                    <img
                      src={trade.requester.avatar}
                      alt={trade.requester.name}
                      className="w-16 h-16 rounded-2xl shadow-md mb-3 object-cover bg-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                      <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-indigo-600">L</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-foreground text-sm">{trade.requester.name}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-1">
                    <Star size={12} className="fill-current" />
                    <span>{trade.requester.rating}</span>
                  </div>
                  <div className="mt-3 px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold shadow-sm">
                    Teaching: <span className="text-indigo-600">{trade.requester.teachSkill}</span>
                  </div>
                </div>

                {/* Exchange Arrow */}
                <div className="flex flex-col items-center px-4 py-6 sm:py-0 relative z-10">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {trade.credits} Credits
                  </span>
                </div>

                {/* Receiver */}
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="relative">
                    <img
                      src={trade.receiver.avatar}
                      alt={trade.receiver.name}
                      className="w-16 h-16 rounded-2xl shadow-md mb-3 object-cover bg-white"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                      <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-purple-600">Y</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-foreground text-sm">{trade.receiver.name}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-1">
                    <Star size={12} className="fill-current" />
                    <span>{trade.receiver.rating}</span>
                  </div>
                  <div className="mt-3 px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold shadow-sm">
                    Teaching: <span className="text-purple-600">{trade.receiver.teachSkill}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                  <Calendar className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Date & Time</p>
                  <p className="font-bold text-foreground text-sm mt-1">{trade.proposedTime}</p>
                </div>
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                  <Clock className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Duration</p>
                  <p className="font-bold text-foreground text-sm mt-1">{trade.duration}</p>
                </div>
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors">
                  <Video className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Mode</p>
                  <p className="font-bold text-foreground text-sm mt-1 capitalize">{trade.mode}</p>
                </div>
              </div>

              {trade.status === "pending" && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowConfirmModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                  >
                    <Check className="w-5 h-5" />
                    Confirm Trade
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
                    <Calendar className="w-5 h-5" />
                    Reschedule
                  </button>
                </div>
              )}

              {trade.status === "confirmed" && (
                <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground py-3.5 rounded-xl font-bold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5">
                  <Video className="w-5 h-5" />
                  Join Session
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col h-[400px]">
              <div className="p-4 border-b border-border bg-slate-50/50">
                <h2 className="font-bold text-foreground flex items-center gap-2 text-sm">
                  <MessageSquare size={16} className="text-indigo-500" />
                  Discussion
                </h2>
              </div>

              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
                {trade.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${msg.sender === "You"
                          ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/10"
                          : "bg-white border border-slate-200 text-foreground rounded-tl-sm shadow-sm"
                        }`}
                    >
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1.5 font-medium ${msg.sender === "You" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-border flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm font-medium"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-black transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
         
            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 text-blue-700 font-bold mb-3 text-sm">
                <Shield className="w-4 h-4" />
                Safe Trading Guarantee
              </div>
              <p className="text-sm text-blue-600/80 leading-relaxed font-medium">
                Your credits are held in secure escrow. They are only released to the teacher once both parties confirm the session was successfully completed.
              </p>
            </div>

            <div className="bg-white border boundary-border rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-foreground mb-4">Helpful Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">How to verify a session</a></li>
                <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">Community Guidelines</a></li>
                <li><a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">Report an issue</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <Shield size={24} />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2 text-center">Confirm Trade?</h2>
            <p className="text-muted-foreground mb-8 text-center text-sm leading-relaxed">
              <span className="font-bold text-foreground">{trade.credits} credits</span> will be held in escrow until the session is
              complete.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
