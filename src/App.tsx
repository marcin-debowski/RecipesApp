import './App.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.tsx'
import Recipes from './pages/Recipes.tsx'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
