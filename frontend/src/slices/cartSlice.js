import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../utils/cartUtils"
import { act } from "react"

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((x) => x._id === item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)

            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            return updateCart(state)
        },
        clearCartItems: (state, action) => {
            state.cartItems = []
            return updateCart(state)
        }
    }, // functions related to cart (add, remove, etc) - export as actions - state = current state, action = data inside a payload
})

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions //any action neeeds to be exported as a function

export default cartSlice.reducer