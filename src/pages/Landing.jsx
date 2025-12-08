import { useNavigate } from "react-router-dom"
import { ArrowRight, Users, Gift, Zap } from "lucide-react"

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 flex flex-col font-sans">
      <section className="relative bg-linear-to-br from-secondary via-[#1e1b4b] to-[#312e81] text-white py-24 lg:py-32 overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col gap-8 max-w-2xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Trade Skills. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-cyan-400">Learn Anything.</span>
            </h1>
            <p className="text-lg lg:text-xl leading-relaxed text-slate-300 max-w-lg">
              Join a community of students who share knowledge without spending money.
              Teach what you know, learn what you want.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-1 flex items-center gap-2"
                onClick={() => navigate("/signup")}
              >
                Get Started <ArrowRight size={20} />
              </button>
              <a href="#how-it-works" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-sm rounded-full font-bold text-lg transition-all flex items-center justify-center">
                Learn More
              </a>
            </div>
          </div>
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/20 to-purple-500/20 rounded-4xl blur-2xl transform rotate-3"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-4xl p-4 w-full h-[500px] shadow-2xl flex items-center justify-center overflow-hidden">

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <Zap size={48} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Skill Trading Platform</h3>
                <p className="text-slate-400">Connect. Teach. Learn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-slate-50 relative">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">How It Works</h2>
            <p className="text-lg text-slate-600">Three simple steps to start your learning journey today.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { icon: Gift, title: "Post Your Skills", desc: "List the skills you can teach and the skills you want to learn.", color: "bg-purple-100 text-purple-600" },
              { icon: Zap, title: "Get Matched", desc: "Our algorithm finds the perfect match based on your preferences.", color: "bg-blue-100 text-blue-600" },
              { icon: Users, title: "Trade & Grow", desc: "Connect with peers, earn credits, and expand your knowledge.", color: "bg-emerald-100 text-emerald-600" }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 font-bold transition-transform group-hover:scale-110 duration-300`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="container max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8 tracking-tight">Ready to start trading skills?</h2>
          <button
            className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl shadow-white/10 hover:bg-slate-100 transition-transform hover:-translate-y-1 active:translate-y-0"
            onClick={() => navigate("/signup")}
          >
            Join Now
          </button>
        </div>
      </section>

      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="">
              <img src="./logo2.png" alt="" className="w-20"/>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Synapse</span>
          </div>

          <div className="flex gap-8 text-slate-400 font-medium">
            <a href="#how-it-works" className="hover:text-white transition-colors">Features</a>
          </div>

          <div className="text-slate-500 text-sm">
            © 2024 Synapse. All rights reserved.
          </div>
        </div>
      </footer>


    </div>
  )
}
