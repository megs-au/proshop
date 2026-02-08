import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/formContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Label, Radio } from 'flowbite-react'
import { savePaymentMethod } from '../slices/cartSlice'

const PaymentPage = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1 className="text-4xl text-gray-500">Payment Method</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2 bg-white shadow-sm rounded-lg border border-gray-200 padding p-6">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Select Method</label>
                <div>
                    <Radio id='PayPal' 
                        className='mr-2' 
                        name='paymentMethod' 
                        value='PayPal' 
                        defaultChecked 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    <Label>Paypal or Credit Card</Label>
                </div>
                <button
                    type="submit"
                    className="
                        w-full rounded-sm bg-gray-700 px-4 py-3 text-white font-semibold
                        shadow-sm transition
                        hover:bg-gray-800
                        active:translate-y-px
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                        disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none
                    "
                    >
                    Continue
                </button>
            </div> 
        </form>
    </FormContainer>
  )
}

export default PaymentPage