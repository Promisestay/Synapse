import { useContext, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Menu, X, LogOut } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

export default function Navbar() {
  const { currentUser: user, isLoggedIn, logout } = useContext(AuthContext)
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
    <nav className="bg-surface/90 backdrop-blur-md border-b border-border py-4 sticky top-0 z-50 transition-all duration-300">
      <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform duration-300">
            <img src="./src/assets/logo2.png" alt="" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight font-heading">Synapse</span>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {(!isLoggedIn || path === "/") && (
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
          )}

          {!hideHowItWorks && (
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              How It Works
            </a>
          )}

          {isLoggedIn && (
            <>
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${path === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                Dashboard
              </Link>
              <Link to="/list-skill" className={`text-sm font-medium transition-colors ${path === '/list-skill' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                List Skill
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
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground leading-none">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">Student</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20">
                  {user?.name?.charAt(0) || "U"}
                </div>
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
            {(!isLoggedIn || path === "/") && (
              <Link to="/" className="p-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            )}

            {!hideHowItWorks && (
              <a href="#how-it-works" className="p-3 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>
                How It Works
              </a>
            )}

            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/list-skill" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>List Skill</Link>
                <Link to="/wallet" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Wallet</Link>
                <Link to="/Leader" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
                <Link to="/notification" className="p-3 text-sm font-medium text-foreground hover:bg-muted rounded-md" onClick={() => setMenuOpen(false)}>Notification</Link>
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