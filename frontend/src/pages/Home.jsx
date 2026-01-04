import { useEffect , useState } from "react"
import Product from "../components/Product"
import axios from "axios"


const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products')
        setProducts(data)
      } catch (error) {
        console.log('fetch error:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

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