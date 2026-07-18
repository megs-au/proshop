import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...res, }))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error || 'login failed')
        }
    }

  return (
    <FormContainer className=''>
        <h1 className="text-4xl text-gray-500">Sign In</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2 bg-white shadow-sm rounded-lg border border-gray-200 padding p-6">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-800 text-sm">Email Address</label>
                <input 
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block text-sm font-medium mt-3 text-gray-800 text-sm">Password</label>
                <input 
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button className="w-full mt-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" color='gray' type='submit' disabled={ isLoading }>Sign In</Button>

                { isLoading && <Loader />}
            </div>
        </form>
        <p className="text-gray-500 mt-2">New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-gray-600 hover:text-gray-900 underline underline-offset-4">Register</Link></p>        
    </FormContainer>
  )
}

export default Login