import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { Dropdown, DropdownItem, Button } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Rating from "../components/Rating"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Meta from "../components/Meta"
import { useGetProductDetailsQuery, useCreateReviewMutation } from "../slices/productsApiSlice"
import { addToCart } from '../slices/cartSlice'


const ProductPage = () => {
    const { id: productId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()

    const { userInfo } = useSelector((state) => state.auth)

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate('/cart')

    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await createReview({
                productId,
                rating,
                comment
            }).unwrap()
            refetch()
            toast.success('Review Submitted')
            setRating(0)
            setComment('')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return (
    <>
        <Link to='/' className="bg-gray-200 text-sm hover:underline p-3 rounded-lg">Go Back</Link>
        { isLoading ? (
            <Loader />
        ) : error ? (<Message>{ error?.data?.message || error.error }</Message>) : (
            <>
                <Meta title={product.name} />
                <div className="p-4">
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        <img src={product.image} alt={product.name} className="w-full max-h-[500px] object-contain" />
                        <div className="flex flex-col gap-4 -my-8">
                            <ul className="max-w-md gap-6">
                                <li className="py-6">
                                    <h3 className="text-3xl font-semibold text-gray-500 text-left">{product.name}</h3>
                                </li>
                                <li className="">
                                    <div className='mx-auto my-1 h-px w-full bg-gray-200 rounded-full'></div>
                                </li>
                                <li className="py-4">
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} className='text-gray-100' />
                                </li>
                                <li>
                                    <div className='mx-auto my-1 h-px w-full bg-gray-200 rounded-full'></div>
                                </li>
                                <li className="text-sm py-4 text-gray-600">
                                    Description: {product.description}
                                </li>
                            </ul>
                        </div>
                        <div className="w-full md:max-w-xs md:justify-self-end shadow-sm">
                            <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                                <span>Price:</span>
                                <span className="font-semibold">${product.price}</span>
                            </div>
                            <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                                <span>Status:</span>
                                <span className="font-bold">{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                            </div>
                            
                            {product.countInStock > 0 && (
                                <div className="w-full md:max-w-xs md:justify-self-end shadow-sm">
                                    <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                                        <span>
                                            Select qty:
                                        </span>
                                        <span>
                                            <Dropdown label={String(qty)} inline>
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <DropdownItem key={x + 1} onClick={() => setQty(x + 1)}>{x + 1}</DropdownItem>
                                                ))}
                                            </Dropdown>
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                            <button
                                className="rounded bg-gray-600 text-white p-3 disabled:opacity-25 w-full shadow-md font-semibold"
                                type='button'
                                disabled={product.countInStock === 0}
                                onClick={addToCartHandler}
                            >
                                Add to Cart 
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="mt-10">
                        <h2 className="text-xl font-semibold text-gray-500 mb-4">Reviews</h2>
                        {product.reviews.length === 0 && <div className="rounded-sm border border-gray-100 p-4 text-sm text-gray-500">No reviews yet.</div>}
                        <div>
                            { product.reviews.map((review) => (
                                <div key={review._id} className="border-b border-gray-200 pb-4">
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p className="text-sm text-gray-500">{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </div>
                            )) }
                        </div>
                    </div>  
                    <div className="mt-10 border border-gray-200 rounded-sm p-5 shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-500 mb-4">Write a Customer Review</h2>

                        {loadingProductReview && <Loader />}

                        { userInfo ? (
                            <form onSubmit={ submitHandler } className="space-y-4">
                                <div id='rating' className="my-2">
                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-800 mb-1">Rating</label>
                                    <select id='rating' value={rating} onChange={(e) => setRating(Number(e.target.value))} className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400">
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-800 mb-1 mt-2">Comment</label>
                                    <textarea id='comment' rows='3' value={comment} onChange={(e => setComment(e.target.value))} className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"/>
                                </div>
                            </div>
                            <Button disabled={loadingProductReview || !rating || !comment.trim()} type='submit' className="mt-6 px-6 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" color='gray'>Submit</Button>
                        </form>
                    ) : (
                        <Message>Please <Link to='/login'>sign in</Link> to write a review{' '}</Message>
                    )}
                    </div>
                </div>
            </>
        )
        }    
    </>
  )
}

export default ProductPage