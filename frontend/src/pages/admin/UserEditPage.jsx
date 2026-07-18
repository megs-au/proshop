import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "flowbite-react"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/FormContainer"
import { toast } from "react-toastify"
import { useUpdateUserMutation, useGetUserDetailsQuery } from "../../slices/usersApiSlice"

const UserEditPage = () => {
    const { id: userId } = useParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId)
    
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await updateUser({
                userId,
                name,
                email,
                isAdmin,
            }).unwrap()

            toast.success('User updated')
            refetch()
            navigate('/admin/userlist')
        } catch (err) {
            toast.error(err?.data?.message || err?.error || 'Update failed')
        }
    }


  return <>
    <Link to="/admin/userlist" className="bg-gray-200 text-sm hover:underline p-3 rounded-lg">Go Back</Link>
    <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={submitHandler}>
                <div>
                    <label className="block text-sm font-medium text-gray-800 mt-2">Name</label>
                    <input 
                        type="text"
                        placeholder="Enter name"
                        id="name"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-800 mt-2">Email</label>
                    <input 
                        type="email"
                        placeholder="Enter email"
                        id="email"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <div className="mt-3 flex items-center gap-2">
                        <input 
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                        <label className="text-sm font-medium text-gray-800">Is Admin?</label>
                    </div>

                    <Button className="my-2 mt-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" color='gray' type='submit' disabled={ loadingUpdate }>Update</Button>
                </div>
            </form>
        )}
    </FormContainer>
  </>
}

export default UserEditPage