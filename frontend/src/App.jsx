import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ProductPage from "./pages/ProductPage"
import CartPage from "./pages/CartPage"
import Login from "./pages/Login"
import Register from './pages/Register'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import OrderPage from './pages/OrderPage'
import ProfilePage from './pages/ProfilePage'
import OrderListPage from './pages/admin/OrderListPage.jsx'
import ProductListPage from './pages/admin/ProductListPage.jsx'
import ProductEditPage from './pages/admin/ProductEditPage.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"



const App = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-6">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          

          <Route path='' element={<PrivateRoute />}>
            <Route path='/shipping' element={<ShippingPage />} />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/placeorder' element={<PlaceOrderPage />} />
            <Route path='/order/:id' element={<OrderPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>

          <Route path='' element={<AdminRoute />}>
            <Route path='/admin/orderlist' element={<OrderListPage />} />
            <Route path='/admin/productlist' element={<ProductListPage />} />
            <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
          </Route>

        </Routes>
      </main>
      <Footer/>
      <ToastContainer />
    </>
    
  )
}

export default App