import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { FaTrash } from 'react-icons/fa'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../slices/cartSlice'

const CartPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }))
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

    return (
        <>
            <h1 className='text-gray-500 text-4xl'>Shopping Cart</h1>
            <div className='grid gap-6 md:grid-cols-[1fr_auto] items-start'>
                <div id='left'>
                    {cartItems.length === 0 ? (
                        <Message>
                            Your cart is empty <Link to='/'>Go Back</Link>
                        </Message>
                    ) : (
                        cartItems.map((item) => (
                            <React.Fragment key={item._id}>
                                <div className='grid grid-cols-[100px_1fr_120px_90px_60px] items-center p-4 gap-4 text-gray-700'>
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className='max-w-[100px] rounded'
                                    />
                                    <Link to={`/product/${item._id}`} className='underline'>{item.name}</Link>
                                    <p className='text-right font-medium'>${item.price}</p>
                                    <span className="w-full p-4 border border-gray-200 text-gray-500 rounded-sm text-right">
                                        <Dropdown label={item.qty} inline>
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <DropdownItem key={x + 1} onClick={() => addToCartHandler(item, x + 1)}>{x + 1}</DropdownItem>
                                            ))}
                                        </Dropdown>
                                    </span>
                                        <button className='text-lg text-gray-400 hover:text-red-500 cursor-pointer' onClick={() => removeFromCartHandler(item._id)}>
                                            <FaTrash />
                                        </button>
                                </div>
                                <div>
                                    <div className='mx-auto my-1 h-px w-full bg-gray-200 rounded-full'></div>
                                </div>
                            </React.Fragment>
                        ))
                    )}

                </div>
                <div className="w-full md:w-[320px] md:justify-self-end shadow-sm md:sticky md:top-4">
                    <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                        <div>
                            <h2 className='font-semibold text-xl'>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0) }) items</h2>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                        <button className='rounded bg-gray-600 text-white p-3 disabled:opacity-25 w-full shadow-md font-semibold' disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed To Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage