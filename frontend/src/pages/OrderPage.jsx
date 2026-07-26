import React from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge, Button } from 'flowbite-react'
import { FaTruckMoving, FaCreditCard } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice'

const OrderPage = () => {
  const { id: orderId } = useParams()

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()

  const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPaypalClientIdQuery()

  const { userInfo } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': paypal.clientId,
            currency: 'USD',
          }
        })
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending'})
      }
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript()
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap()
        refetch()
        toast.success('Payment successful')
      } catch (err) {
        toast.error(err?.data?.message || err.message)
      }
    })
  }

  async function onApproveTest() {
    await payOrder({orderId, details: {payer: {}}})
    refetch()
    toast.success('Payment successful')
  }

  function onError(err) {
    toast.error(err.message)
  }
  
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => {
      return orderId
    })
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success('Order delivered')
    } catch (err) {
      toast.error(err?.data?.message || err.message)
    }
  }

  return isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message || error.error}</Message>
  : (
    <>
      <h1 className='text-3xl text-gray-500'>Order {order._id}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 mx-auto max-w-6xl gap-8 items-start'>
        <div className="flex flex-col gap-4 md:max-w-2xl text-gray-500 text-sm">
          <div>
            <h2 className='text-2xl text-gray-600'>Shipping</h2>
            <p className='py-2'>
              <strong>Name: </strong>{order.user.name}
            </p>
            <p className='py-2'>
              <strong>Email: </strong>{order.user.email}
            </p>
            <p className='py-2'>
              <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <FaTruckMoving className='text-gray-400 text-base' />
              <Badge color={order.isDelivered ? 'success' : 'gray'} className='w-fit px-2 py-1 text-xs font-medium'>
                {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not delivered'}
              </Badge>
            </div>
          </div>
          <div className="border border-gray-200 rounded-sm divide-y divide-gray-100 text-gray-500"></div>
          <div>
            <h2 className='text-2xl text-gray-600'>Payment Method</h2>
            <p className='py-2'>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <FaCreditCard className='text-gray-400 text-base' />
              <Badge color={order.isPaid ? 'success' : 'warning'} className='w-fit px-2 py-1 text-xs font-medium'>
                {order.isPaid ? `Paid on ${order.paidAt}` : 'Not paid'}
              </Badge>
            </div>
          </div>
          <div className="border border-gray-200 rounded-sm divide-y divide-gray-100 text-gray-500"></div>
          <div>
            <h2 className='text-2xl text-gray-600'>Order Items</h2>
            { order.orderItems.map((item) =>
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
            ) }
          </div>
        </div>
        <div className="w-full md:w-[320px] md:justify-self-end shadow-sm md:sticky md:top-4 self-start">
          <div className="border border-gray-300 rounded-sm text-gray-500">
            <div className='p-4'>
              <h2 className="text-2xl text-gray-600">Order Summary</h2>
            </div>
            <div className="flex justify-between p-4">
              <p>Items ${order.itemsPrice}</p>
            </div>
            <div className="flex justify-between p-4">
              <p>Shipping ${order.shippingPrice}</p>
            </div>
            <div className="flex justify-between p-4">
              <p>Tax ${order.taxPrice}</p>
            </div>
            <div>
              <p className="flex justify-between p-4">Total ${order.totalPrice}</p>
            </div>
            <div>
              { !order.isPaid && (
                <div>
                  {loadingPay && <Loader />}

                  {isPending ? <Loader /> :(
                      <div>
                        {/* <Button onClick={onApproveTest} style={{marginBottom: '10px'}}>Test Pay Order</Button> */}
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}  
                          ></PayPalButtons>
                        </div>
                      </div>
                  )}
                </div>
              )}
              {loadingDeliver && <Loader />}

              { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div>
                  <Button onClick={deliverOrderHandler}>
                    Mark as Delivered
                  </Button>
                </div>
              ) }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderPage