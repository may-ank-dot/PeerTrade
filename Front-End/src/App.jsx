import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";
import MyListings from "./pages/MyListings";
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/* ProtectedRoute */}
        <Route path="/listings" element={<ProtectedRoute><Listings/></ProtectedRoute>}/>
        <Route path="/mylistings" element={<ProtectedRoute><MyListings /></ProtectedRoute>}/>
        <Route path="/listings/:id" element={<ProtectedRoute><ListingDetails/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App
