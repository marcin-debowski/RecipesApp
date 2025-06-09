import './App.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Recipes from './pages/Recipes.tsx'
import Home from './pages/Home.tsx'
import Page1 from './pages/Page1.tsx'
import CreateRecipe from './pages/CreateRecipe.tsx'
import Profile from './pages/Profile.tsx'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
