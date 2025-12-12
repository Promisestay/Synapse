import { ArrowRight, Star, Clock } from "lucide-react"

export default function TradeCard({
  name,
  rating,
  teachSkill,
  learnSkill,
  credits,
  time,
  onRequest,
}) {
  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg group">
      <div className="p-5 flex justify-between items-start bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
            {name?.charAt(0) || "U"}
          </div>
          <div>
            <h3 className="font-bold text-foreground m-0">{name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium mt-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{rating} Rating</span>
            </div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border border-emerald-200 bg-emerald-50 text-emerald-600 uppercase">
          Available
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              Teaches
            </p>
            <div className="px-3 py-2 rounded-lg text-center font-semibold text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
              {teachSkill}
            </div>
          </div>
          <ArrowRight size={20} className="text-slate-300 shrink-0 mt-4" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
              Wants
            </p>
            <div className="px-3 py-2 rounded-lg text-center font-semibold text-xs bg-purple-50 text-purple-700 border border-purple-100">
              {learnSkill}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-foreground">
            <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">
              $
            </div>
            <span>{credits} Credits</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50/50">
        <button
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold shadow-sm shadow-indigo-500/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
          onClick={onRequest}
        >
          Request Trade
        </button>
      </div>
    </div>
  )
}
