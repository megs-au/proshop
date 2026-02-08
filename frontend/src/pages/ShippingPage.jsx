import { useState } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/formContainer"
import { saveShippingAddress } from "../slices/cartSlice"
import CheckoutSteps from "../components/CheckoutSteps"


const ShippingPage = () => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    
    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [city, setCity] = useState(shippingAddress?.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')
    const [country, setCountry] = useState(shippingAddress?.country || '')

    const navigate = useNavigate()
    const dispatch = useDispatch()



    const submitHandler = async (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

  return (
    <FormContainer className=''>
        <CheckoutSteps step1 step2 />

        <h1 className="text-4xl text-gray-500">Shipping</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2 bg-white shadow-sm rounded-lg border border-gray-200 padding p-6">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Address</label>
                <input 
                    type="text"
                    placeholder="Enter address"
                    id="address"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-800 text-sm mt-2">City</label>
                <input 
                    type="text"
                    placeholder="Enter city"
                    id="email"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className="block text-sm font-medium mt-3 text-gray-800 text-sm mt-2">Postal Code</label>
                <input 
                    type="text"
                    placeholder="Enter postal code"
                    id="postal-code"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                />
                <label className="block text-sm font-medium mt-3 text-gray-800 text-sm mt-2">Country</label>
                <input 
                    type="text"
                    placeholder="Enter country"
                    id="country"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <button
                    type="submit"
                    className="
                        w-full mt-4 rounded-sm bg-gray-700 px-4 py-3 text-white font-semibold
                        shadow-sm transition
                        hover:bg-gray-800
                        active:translate-y-px
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                    "
                >
                    Continue
                </button>

                {/* { isLoading && <Loader />} */}
            </div>
        </form>
        {/* <p className="text-gray-500 mt-2">Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-gray-600 hover:text-gray-900 underline underline-offset-4">Log in</Link></p>         */}
    </FormContainer>
  )
}

export default ShippingPage