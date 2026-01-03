import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {

  return <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[330px] sm:[330px]'>
    <Link to={`/products/${product._id}`}>
        <img src={product.image} />
        <div className='p-3 flex flex-col gap-2 w-full'>
            <p className='line-clamp-2 text-lg font-semibold text-gray-700 hover:underline'>{product.name}</p>
            <p className='grid grid-column items-center'><Rating value={product.rating} text={`${product.numReviews} reviews`} /> </p>
            <h3 className='text-sm text-gray-600'>${product.price}</h3>
        </div>
    </Link>
  </div>
}

export default Product