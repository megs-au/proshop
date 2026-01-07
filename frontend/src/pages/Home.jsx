import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { useGetProductsQuery } from "../slices/productsApiSlice"

const Home = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <>
      { isLoading ? (
        <Loader />
      ) : error ? (<Message color='failure'>{ error?.data?.message || error.error }</Message>) : (
        <>
          <h1 className="text-4xl text-gray-600 font-semibold p-10 mx-20">Latest Products</h1>
          <div className="flex flex-wrap gap-8 p-10 px-30">
            {products.map((product) => (
              <Product key={product._id} product={product} />
          ))}
          </div>
        </>)}
    </>
  )
}

export default Home