import React from "react"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Button, Toast, Dropdown, DropdownItem } from "flowbite-react"
import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { clearCartItems } from "../slices/cartSlice"

const PlaceOrderPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap()

            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="mt-6 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4 md:max-w-2xl">
                <div>
                    <h2 className="text-2xl text-gray-500">Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '} {cart.shippingAddress.postalCode}, {' '}{cart.shippingAddress.country}
                    </p>
                </div>
                <div className='mx-auto my-1 h-px w-full bg-gray-200 rounded-full'></div>
                <div>
                    <h2 className="text-2xl text-gray-500">Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </div>
                <div className='mx-auto my-1 h-px w-full bg-gray-200 rounded-full'></div>
                    <h2 className="text-2xl text-gray-500">Order Items</h2>
                    <div className="divide-y divide-gray-200">
                        {cart.cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            cart.cartItems.map((item, index) => (
                                <React.Fragment key={item._id}>
                                    <div className='grid grid-cols-[100px_1fr_1fr] items-center p-4 gap-2 text-gray-700 text-sm'>
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className='max-w-[40px] rounded'
                                        />
                                        <Link to={`/product/${item._id}`} className='underline'>{item.name}</Link>
                                        <p className='text-right font-medium'>{ item.qty } x ${ item.price } = ${ item.qty * item.price }</p>
                                    </div>
                                </React.Fragment>
                            ))
                        )}
                </div>
            </div>
            <div className="w-full md:w-[320px] md:justify-self-end shadow-sm md:sticky md:top-4 self-start">
                <div className="border border-gray-200 rounded-sm divide-y divide-gray-100 text-gray-500">
                    <div className="p-4">
                        <h2 className="text-2xl">Order Summary</h2>
                    </div>
                    <div className="flex justify-between p-4">
                        <p>Items:</p>
                        ${cart.itemsPrice}
                    </div>
                    <div className="flex justify-between p-4">
                        <p>Shipping:</p>
                        ${cart.shippingPrice}
                    </div>
                    <div className="flex justify-between p-4">
                        <p>Tax:</p>
                        ${cart.taxPrice}
                    </div>
                    <div className="flex justify-between p-4 font-medium">
                        <p>Total:</p>
                        ${cart.totalPrice}
                    </div>
                    <div>
                        { error && (
                            <Message variant='danger'>
                                {error?.data?.message || error?.error || 'Something went wrong'}
                            </Message>)}
                    </div>
                    <div>
                        <button
                            type="button"
                            className="
                                w-full rounded-sm bg-gray-700 px-4 py-3 text-white font-semibold
                                shadow-sm transition
                                hover:bg-gray-800
                                active:translate-y-px
                                focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                                disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none
                            "
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
                            >
                            Place Order
                        </button>
                        { isLoading && <Loader /> }
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default PlaceOrderPage