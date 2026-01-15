import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/formContainer"
import Loader from "../components/Loader"
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

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
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        } else {
            try {
                const res = await register({ name, email, password }).unwrap()
                dispatch(setCredentials({ ...res, }))
                navigate(redirect)
            } catch (error) {
                toast.error(error?.data?.message || error.error || 'login failed')
            }
        }
        
    }

  return (
    <FormContainer className=''>
        <h1 className="text-4xl text-gray-500">Sign Up</h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-2 bg-white shadow-sm rounded-lg border border-gray-200 padding p-6">
            <div className="mb-2">
                <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Name</label>
                <input 
                    type="text"
                    placeholder="Enter name"
                    id="name"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Email Address</label>
                <input 
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block text-sm font-medium mt-3 text-gray-800 text-sm mt-2">Password</label>
                <input 
                    type="password"
                    placeholder="Enter password"
                    id="password"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block text-sm font-medium mt-3 text-gray-800 text-sm mt-2">Confirm Password</label>
                <input 
                    type="password"
                    placeholder="Confirm password"
                    id="confirmPassword"
                    className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className="w-full mt-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" color='gray' type='submit' disabled={ isLoading }>Register</Button>

                { isLoading && <Loader />}
            </div>
        </form>
        <p className="text-gray-500 mt-2">Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-gray-600 hover:text-gray-900 underline underline-offset-4">Log in</Link></p>        
    </FormContainer>
  )
}

export default Register