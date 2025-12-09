import { CheckCircle, XCircle } from "lucide-react"

export default function MatchCard({ match, onAccept, onDecline }) {
  return (
    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300">

      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-2xl mb-3 mx-auto">
          {match.from.charAt(0)}
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-slate-900 mb-1">{match.from}</h3>
      <p className="text-sm font-medium text-slate-500 mb-8">wants to trade</p>

      <div className="w-full space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-400 text-sm">Teaches</span>
          <span className="font-bold text-slate-800">{match.teaches}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-400 text-sm">Wants</span>
          <span className="font-bold text-slate-800">{match.wants}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-400 text-sm">Time</span>
          <span className="font-bold text-slate-800">{match.availableTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-400 text-sm">Cost</span>
          <span className="font-bold text-slate-800">{match.credits} Credits</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-400 text-sm">Wants</span>
          <span className="font-bold text-slate-800">{match.wants}</span>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2" onClick={onAccept}>
          <CheckCircle size={18} />
          Accept
        </button>
        <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2" onClick={onDecline}>
          <XCircle size={18} />
          Decline
        </button>
      </div>

      <button className="mt-6 text-sm font-bold text-slate-900 border-b-2 border-slate-900 pb-0.5 hover:opacity-75 transition-opacity">
        See more
      </button>

    </div>
  )
}
