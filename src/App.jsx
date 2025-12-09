import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import SkillListing from "./pages/SkillListing";
import TradeDetails from "./pages/TradeDetails";
import TradePage from "./pages/TradePage";
import WalletScreen from "./pages/WalletScreen";
import LeaderboardPage from "./pages/LeaderboardPage";
import NotificationsPage from "./pages/NotificationsPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "sonner";

function AppContent() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div className="min-h-screen flex items-center justify-center">
      <Loader size={35} className="animate-spin" />
      </div> 
  }

  const location = useLocation();
  const showNavbar = location.pathname === "/" || authUser;
  return (
    <div className="min-h-screen bg-background text-card-foreground flex flex-col font-sans">
      <Toaster position="top-right"/>
      {showNavbar && <Navbar isPublic={!authUser} />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="/dashboard" /> : <Landing />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dashboard" /> : <Signup />}
        />

        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/list-skill"
          element={authUser ? <SkillListing /> : <Navigate to="/login" />}
        />
        <Route
          path="/trade/:id"
          element={authUser ? <TradeDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/trade"
          element={authUser ? <TradePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/wallet"
          element={authUser ? <WalletScreen /> : <Navigate to="/login" />}
        />

        <Route
          path="/Leader"
          element={authUser ? <LeaderboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/notification"
          element={authUser ? <NotificationsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;