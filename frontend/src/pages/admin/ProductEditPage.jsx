import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "flowbite-react"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import FormContainer from "../../components/formContainer"
import { toast } from "react-toastify"
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from "../../slices/productsApiSlice"

const ProductEditPage = () => {
    const { id: productId } = useParams()

    console.log('params:', useParams())
    console.log('productId:', productId)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault()
        console.log('productId:', productId)
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            }).unwrap()

            toast.success('Product updated')
            navigate('/admin/productlist')
        } catch (err) {
            toast.error(err?.data?.message || err?.error || 'Update failed')
        }
    }

    const uploadFileHandler = async (e) => {
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            toast.success(res.message)
            setImage(res.image)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

  return <>
    <Link to="/admin/productlist" className="bg-gray-200 text-sm hover:underline p-3 rounded-lg">Go Back</Link>
    <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <form onSubmit={submitHandler}>
                <div>
                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Name</label>
                    <input 
                        type="text"
                        placeholder="Enter name"
                        id="name"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Price</label>
                    <input 
                        type="number"
                        placeholder="Enter price"
                        id="price"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Image</label>
                        <input className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></input>
                        <div className="mt-2 flex items-center gap-3">
                            <label htmlFor="file-upload" className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-sm hover:bg-gray-500 transition">Upload Image</label>
                            <input id='file-upload' type='file' className="hidden" onChange={uploadFileHandler}></input>
                        </div>
                    </div>
                    {loadingUpload && <Loader />}

                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Brand</label>
                    <input 
                        type="text"
                        placeholder="Enter brand"
                        id="brand"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Count In Stock</label>
                    <input 
                        type="number"
                        placeholder="Enter count in stock"
                        id="countInStock"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Category</label>
                    <input 
                        type="text"
                        placeholder="Enter category"
                        id="category"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <label className="block text-sm font-medium text-gray-800 text-sm mt-2">Description</label>
                    <input 
                        type="text"
                        placeholder="Enter description"
                        id="description"
                        className="w-full border border-gray-300 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button className="my-2 mt-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400" color='gray' type='submit' disabled={ isLoading }>Update</Button>
                </div>
            </form>
        )}
    </FormContainer>
  </>
}

export default ProductEditPage