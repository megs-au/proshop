import { Table, Button, TextInput, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetOrdersQuery } from '../../slices/ordersApiSlice'

const OrderListPage = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery()
  console.log(orders)

  return <>
    <h1 className='text-2xl text-gray-600'>Orders</h1>
    {isLoading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> : (
      <Table striped hoverable>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>USER</TableHeadCell>
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
              <TableCell>{order.user && order.user.name}</TableCell>
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
  </>
}

export default OrderListPage