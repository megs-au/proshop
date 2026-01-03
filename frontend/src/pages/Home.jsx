import products from "../products"
import Product from "../components/Product"


const Home = () => {
  return (
    <>
        <h1 className="text-4xl text-gray-600 font-semibold p-10 mx-20">Latest Products</h1>
        <div className="flex flex-wrap gap-8 p-10 px-30">
            {products.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </>
  )
}

export default Home