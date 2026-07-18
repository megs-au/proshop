import { Link, useParams } from "react-router-dom"
import Product from "../components/Product"
import Loader from "../components/Loader"
import Message from "../components/Message"
import Paginate from "../components/Paginate"

import { useGetProductsQuery } from "../slices/productsApiSlice"

const Home = () => {
  const { pageNumber, keyword } = useParams()

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })

  return (
    <>
      { keyword && <Link to='/' className="bg-gray-200 text-sm hover:underline p-3 rounded-lg mb-4">Go Back</Link> }
      { isLoading ? (
        <Loader />
      ) : error ? (<Message color='failure'>{ error?.data?.message || error.error }</Message>) : (
        <>
          <h1 className="text-4xl text-gray-600 font-semibold p-10 mx-20">Latest Products</h1>
          <div className="flex flex-wrap gap-8 p-10 px-30">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
          ))}
          </div>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword = {keyword ? keyword : '' }
          />
        </>)}
    </>
  )
}

export default Home