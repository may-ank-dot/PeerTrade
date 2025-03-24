import { useState } from 'react'
import {BrowserRouter as Router , Routes,Route} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import './App.css'
import API from './services/api';
import ProtectedRoute from './components/ProtectedRoute';

API.get("/")
  .then(Response => console.log(Response.data))
  .catch(err => console.error(err));
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        // ProtectedRoute
        <Route path="/listings" element={<ProtectedRoute><Listings/></ProtectedRoute>}/>
        <Route path="/listings/:id" element={<ProtectedRoute><ListingDetails/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
