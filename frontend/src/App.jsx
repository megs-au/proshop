import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"


const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-6">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductPage />} />
        </Routes>
      </main>
      <Footer/>
    </>
    
  )
}

export default App