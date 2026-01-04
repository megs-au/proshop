import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Rating from "../components/Rating"
import axios from "axios"

const ProductPage = () => {
    const [product, setProduct] = useState([])
    const { id: productId } = useParams()

    useEffect(() =>{
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/api/products/${productId}`)
                setProduct(data)
            
            } catch (error) {
                console.log(error)
            }
        }
        fetchProduct()
    }, [productId])
    

  return <>
        <div className="p-4">
            <Link to='/' className="bg-gray-200 text-sm hover:underline p-3 rounded-lg">Go Back</Link>
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
                    <div className="flex items-center justify-between w-full p-4 border border-gray-200 text-gray-500 rounded-sm">
                       <button
                       className="rounded bg-gray-600 text-white p-3 disabled:opacity-25 w-full shadow-md font-semibold"
                       type='button'
                       disabled={product.countInStock === 0}
                       >
                        Add to Cart 
                       </button>
                    </div>
                </div>
            </div>
        </div>
  </>
  
}

export default ProductPage