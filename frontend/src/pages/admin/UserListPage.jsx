import { Table, Button, TextInput, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice'

const UserListPage = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation()
  
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
        try {
            await deleteUser(id)
            toast.success('User deleted')
            refetch()
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  }

  return <>
    <h1 className='text-2xl text-gray-600'>Users</h1>
    {loadingDelete && <Loader />}
    {isLoading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> : (
      <Table striped hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>NAME</TableHeadCell>
            <TableHeadCell>EMAIL</TableHeadCell>
            <TableHeadCell>ADMIN</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell><a href={`mailto:${user.email}`}>{user.email}</a></TableCell>
              <TableCell>{ user.isAdmin ? (<FaCheck style={{ color: 'green'}} />) : (<FaTimes style={{ color: 'red'}} />)}</TableCell>
              <TableCell>
                <div className='flex justify-between'>
                    <Link to={`/admin/user/${user._id}/edit`} className='hover:text-gray-800'><FaEdit /></Link>
                    <button className='text-red-400 hover:text-red-700' onClick={() => deleteHandler(user._id)}><FaTrash /></button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>  
    )}
  </>
}

export default UserListPage