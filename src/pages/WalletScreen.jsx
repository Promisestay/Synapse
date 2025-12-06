import { useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { CreditCard, Wallet, ArrowUpRight, ArrowDownLeft, Clock, Shield, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

const TRANSACTION_HISTORY = [
  { id: 1, type: "received", user: "Mike Davidson", amount: 5, date: "Today, 2:30 PM", status: "Completed" },
  { id: 2, type: "spent", user: "Sarah Chen", amount: 3, date: "Yesterday, 10:00 AM", status: "Completed" },
  { id: 3, type: "received", user: "Alice Smith", amount: 8, date: "Oct 24, 2024", status: "Completed" },
  { id: 4, type: "spent", user: "John Doe", amount: 4, date: "Oct 20, 2024", status: "Completed" },
]

export default function WalletScreen() {
  const { currentUser, updateCredits } = useContext(AuthContext)
  const navigate = useNavigate()
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false)
  const [amount, setAmount] = useState("")

  const handleAddFunds = (e) => {
    e.preventDefault()
    // Mock processing
    setTimeout(() => {
      updateCredits(amount)
      alert(`Successfully added ${amount} credits!`)
      setIsAddFundsOpen(false)
      setAmount("")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background pb-20 font-sans relative">
      <main className="max-w-[1000px] mx-auto px-6 py-12">
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-2">My Wallet</h1>
            <p className="text-muted-foreground">Manage your credits and verify transaction history.</p>
          </div>
          <button
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-lg"
            onClick={() => setIsAddFundsOpen(true)}
          >
            <Plus size={18} /> Add Funds
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-2">
            <div className="bg-linear-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-500/25 relative overflow-hidden mb-8">
              <div className="absolute top-0 right-0 p-12 opacity-10">
                <Wallet size={180} />
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-indigo-100 font-medium mb-1">Total Balance</p>
                    <h2 className="text-5xl font-extrabold tracking-tight">{currentUser?.credits || 0}.00 <span className="text-2xl opacity-60 font-medium">Credits</span></h2>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <CreditCard size={24} />
                  </div>
                </div>

                <div className="flex gap-6 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center border border-emerald-400/30">
                      <ArrowUpRight className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-100 font-bold uppercase">Earned</p>
                      <p className="font-bold text-lg">120 Cr</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-400/20 flex items-center justify-center border border-rose-400/30">
                      <ArrowDownLeft className="text-rose-300" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-indigo-100 font-bold uppercase">Spent</p>
                      <p className="font-bold text-lg">75 Cr</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-foreground text-lg">Recent Transactions</h3>
                <button className="text-sm font-bold text-primary hover:underline">View All</button>
              </div>
              <div className="divide-y divide-border">
                {TRANSACTION_HISTORY.map((txn) => (
                  <div key={txn.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${txn.type === 'received' ? 'bg-emerald-100/50 text-emerald-600' : 'bg-rose-100/50 text-rose-600'}`}>
                        {txn.type === 'received' ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          {txn.type === 'received' ? 'Received from' : 'Sent to'} {txn.user}
                        </p>
                        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock size={12} /> {txn.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${txn.type === 'received' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {txn.type === 'received' ? '+' : '-'}{txn.amount}
                      </p>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border boundary-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-foreground mb-4">
                <Shield className="text-indigo-500" size={20} />
                Security
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your credits are stored securely. Transactions are encrypted and monitored for suspicious activity.
              </p>
              <button className="w-full py-2.5 bg-slate-50 text-slate-700 font-bold rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors text-sm">
                Transaction Settings
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
              <h3 className="font-bold text-amber-900 mb-2 text-sm">Low on Credits?</h3>
              <p className="text-sm text-amber-800 mb-4 leading-relaxed">
                Teach a skill to earn more credits instantly! Check the "My Matches" section for opportunities.
              </p>
              <button
                className="w-full py-2.5 bg-amber-100 text-amber-900 font-bold rounded-lg hover:bg-amber-200 border border-amber-200 transition-colors text-sm"
                onClick={() => navigate("/dashboard", { state: { activeTab: "suggested" } })}
              >
                View Opportunities
              </button>
            </div>
          </div>
        </div>
      </main>

      {isAddFundsOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" onClick={() => setIsAddFundsOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">Add Funds</h3>
              <button className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1" onClick={() => setIsAddFundsOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-6">Select an amount to calculate purchase.</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {["10", "20", "50"].map((amt) => (
                  <button
                    key={amt}
                    className={`py-3 rounded-xl border font-bold transition-all ${amount === amt ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20' : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50'}`}
                    onClick={() => setAmount(amt)}
                  >
                    {amt} Cr
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-600">Price per Credit</span>
                  <span className="text-sm font-bold text-slate-900">$1.00 USD</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="font-bold text-xl text-indigo-600">${amount || "0"}.00</span>
                </div>
              </div>
              <button
                className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!amount}
                onClick={handleAddFunds}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

