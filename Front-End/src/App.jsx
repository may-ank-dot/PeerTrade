import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
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

function App() {
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/listings/search" element={<SearchListings/>}/>
        <Route path="/listings" element={<Listings/>}/>
        <Route path="/listings/:id" element={<ListingDetails/>} />
        {/* ProtectedRoute */}
        <Route path="/addlistings" element={<ProtectedRoute><AddListings/></ProtectedRoute>}/>
        <Route path="/mylistings" element={<ProtectedRoute><MyListings /></ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App
