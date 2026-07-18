// import { Link } from 'react-router-dom'
// import { Carousel } from 'flowbite-react'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
// import { useGetTopProductsQuery } from '../slices/productsApiSlice'

// const ProductCarousel = () => {
//     const { data: products, isLoading, error } = useGetTopProductsQuery()

//   return isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
//     <div className='h-56 sm:h-64 xl:h-80 2xl:h-96'>
//         <Carousel pauseOnHover>
//             {products.map(product => (
//                 <img src="" />
//             ))}
//         </Carousel>

//     </div>
//   )
// }

// export default ProductCarousel