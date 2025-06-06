import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";
import MyListings from "./pages/MyListings";
import AddListings from "./pages/AddListings";
import './App.css'
import SearchListings from "./pages/SearchListings";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/inComp/Sidebar";
import { SidebarProvider } from "./context/SidebarContex";
import UpdateListing from "./pages/UpdateListing";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Layout />
      </SidebarProvider>
    </Router>
  );
}

const Layout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <>
      <Navbar />
      {/* Conditionally render Sidebar */}
      {!isAuthPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/listings/search" element={<SearchListings />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/edit/:id" element={<UpdateListing/>} />
        {/* ProtectedRoute */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/addlistings" element={<ProtectedRoute><AddListings /></ProtectedRoute>} />
        <Route path="/mylistings" element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;