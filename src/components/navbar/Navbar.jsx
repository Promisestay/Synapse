import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import { useAuthStore } from "../../store/useAuthStore"

export default function Navbar() {
  const { authUser, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const path = location?.pathname || ""

  const hideHowItWorks = path === "/dashboard" ||
    path.startsWith("/trade/") ||
    path === "/trade" ||
    path === "/list-skill" ||
    path === "/wallet" ||
    path === "/profile" ||
    path === "/Leader" ||
    path === "/notification" ||
    path === "/skills"

  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuOpen(false)
  }

  return (

    <nav className=" relative bg-surface/90 backdrop-blur-md border-b border-border py-4 top-0 z-50 transition-all duration-300">
      <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to={authUser ? "/dashboard" : "/"} className="flex items-center group">
          <img src="./logo2.png" alt="" className="h-[60px] w-[70px]" />
          <span className="text-xl font-bold text-primary tracking-tight font-heading -translate-x-4">Synapse</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {(!authUser || path === "/") && (
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
          )}

          {!hideHowItWorks && (
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
          )}

          {authUser && (
            <>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${path === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Dashboard
              </Link>
              <Link to="/list-skill" className={`text-sm font-medium transition-colors ${path === '/list-skill' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Skill Exchange
              </Link>
              <Link to="/wallet" className={`text-sm font-medium transition-colors ${path === '/wallet' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Wallet
              </Link>
              <Link to="/Leader" className={`text-sm font-medium transition-colors ${path === '/Leader' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Leaderboard
              </Link>
              <Link to="/notification" className={`text-sm font-medium transition-colors ${path === '/notification' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Notification
              </Link>
            </>
          )}
        </div>

        <div className="flex gap-4 items-center">
          {authUser ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <Link to="/profile" className="text-right hover:opacity-80 transition-opacity">
                  <p className="text-sm font-semibold text-foreground leading-none">{authUser?.fullName || "User"}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </Link>
                <Link to="/profile" className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 hover:ring-2 hover:ring-primary/20 transition-all">
                  {authUser?.fullName?.charAt(0) || "U"}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="hidden md:flex bg-secondary text-secondary-foreground px-4 py-2 rounded-lg text-sm font-medium transition-transform active:scale-95 hover:bg-secondary/90 items-center gap-2"
              >
                <LogOut size={16} />
                <span className="sr-only">Logout</span>
              </button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-muted-foreground px-4 py-2 rounded-lg bg-white border-2 border-primary hover:text-white hover:bg-primary-dark transition-all hover:-translate-y-0.5 active:translate-y-0 ">
                Log In
              </Link>
              <Link to="/signup" className="px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold shadow-md shadow-primary/25 hover:bg-primary-dark transition-all hover:-translate-y-0.5 active:translate-y-0">
                Get Started
              </Link>
            </div>
          )}

          <button className="md:hidden text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>


        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-xl md:hidden p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
            {(!authUser || path === "/") && (
              <Link to="/" className="p-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            )}

            {!hideHowItWorks && (
              <a href="#how-it-works" className="p-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>
                How It Works
              </a>
            )}

            {authUser ? (
              <>
                <Link to="/dashboard" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/list-skill" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>List Skill</Link>
                <Link to="/wallet" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Wallet</Link>
                <Link to="/Leader" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
                <Link to="/notification" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Notification</Link>
                <Link to="/profile" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="p-3 mt-2 text-sm font-medium text-white bg-red-500 rounded-md w-full text-left">Logout</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border">
                <Link to="/login" className="p-3 text-center text-sm font-medium border border-border rounded-lg" onClick={() => setMenuOpen(false)}>Log In</Link>
                <Link to="/signup" className="p-3 text-center text-sm font-medium bg-primary text-white rounded-lg shadow-md" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>

  )
}