import { useState, useEffect } from 'react'
import { Table, Button, TextInput, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from 'flowbite-react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaTimes } from 'react-icons/fa'
import { useProfileMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'

const ProfilePage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation()

    const { data: orders, isLoading, error } = useGetMyOrdersQuery()

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo.name, userInfo.email])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
                dispatch(setCredentials(res))
                toast.success('Profile updated successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }

  return (
    <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-3'>
            <h2>User Profile</h2>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <TextInput
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></TextInput>
                <label>Email</label>
                <TextInput
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></TextInput>
                <label>Password</label>
                <TextInput
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></TextInput>
                <label>Confirm Password</label>
                <TextInput
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></TextInput>

                <Button type='submit' color='dark' className='my-2'>Update</Button>
                { loadingUpdateProfile && <Loader />}
            </form>
        </div>
        <div className='col-span-9'>
            <h2>My Orders</h2>
            { isLoading ? <Loader /> : error ? (<Message variant='danger'>
                { error?.data?.message || error.error }
            </Message>) : (
                <Table striped hoverable>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>DATE</TableHeadCell>
                            <TableHeadCell>TOTAL</TableHeadCell>
                            <TableHeadCell>PAID</TableHeadCell>
                            <TableHeadCell>DELIVERED</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order._id}</TableCell>
                                <TableCell>{order.createdAt.substring(0,10)}</TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                                <TableCell>{ order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{ color: 'red'}} />)}</TableCell>
                                <TableCell>{ order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<FaTimes style={{ color: 'red'}} />)}</TableCell>
                                <TableCell><div><Button as={Link} to={`/order/${order._id}`}>Details</Button></div></TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            )}
        </div>
    </div>
  )
}

export default ProfilePage