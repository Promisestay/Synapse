import { CheckCircle, XCircle } from "lucide-react"

export default function MatchCard({ match, onAccept, onDecline }) {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {match.from.charAt(0)}
          </div>
          <div>
            <h3 className="m-0 text-base font-bold text-foreground leading-tight">{match.from}</h3>
            <p className="text-xs text-muted-foreground">wants to trade</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${match.score > 70 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{match.score}% Match</span>
      </div>

      <div className="mb-6 flex flex-col gap-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Teaches</span>
          <span className="font-semibold text-foreground">{match.teaches}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Wants</span>
          <span className="font-semibold text-foreground">{match.wants}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Time</span>
          <span className="font-semibold text-foreground">{match.availableTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cost</span>
          <span className="font-semibold text-foreground">{match.credits} Credits</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-emerald-200" onClick={onAccept}>
          <CheckCircle size={16} />
          Accept
        </button>
        <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2" onClick={onDecline}>
          <XCircle size={16} />
          Decline
        </button>
      </div>
    </div>
  )
}
