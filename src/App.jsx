import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
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

function AppContent() {
  const { isLoggedIn } = useContext(AuthContext);
  const location = useLocation();

  const showNavbar = location.pathname === "/" || isLoggedIn;

  return (
    <div className="min-h-screen bg-background text-card-foreground flex flex-col font-sans">

      {showNavbar && <Navbar isPublic={!isLoggedIn} />}

      <Routes>

        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Landing />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
        />


        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/list-skill"
          element={isLoggedIn ? <SkillListing /> : <Navigate to="/login" />}
        />
        <Route
          path="/trade/:id"
          element={isLoggedIn ? <TradeDetails /> : <Navigate to="/login" />}
        />

        <Route
          path="/trade"
          element={isLoggedIn ? <TradePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/wallet"
          element={isLoggedIn ? <WalletScreen /> : <Navigate to="/login" />}
        />

        <Route
          path="/Leader"
          element={isLoggedIn ? <LeaderboardPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/notification"
          element={isLoggedIn ? <NotificationsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
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