import { Table, Button, TextInput, TableHead, TableHeadCell, TableRow, TableBody, TableCell } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useGetProductsQuery, useCreateProductMutation } from '../../slices/productsApiSlice'

const ProductListPage = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery()

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()

    const deleteHandler = (id) => {
        console.log('delete', id)
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
            try {
                await createProduct().unwrap()
                refetch()
            } catch (err) {
                toast.error(err?.data?.message || err.error || 'Create product failed')
            }
        }
    }

  return (
    <>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl text-gray-600'>Products</h1>
    
            <button
                className="
                    flex rounded-sm bg-gray-700 px-4 py-3 text-white font-semibold items-center justify-between gap-2
                    shadow-sm transition
                    hover:bg-gray-800
                    active:translate-y-px
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
                    disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none 
                    "
                onClick={createProductHandler}
            >
                        <FaEdit />
                        Create Product
            </button>
        </div>
        <div>
            {loadingCreate && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message> : (
                <>
                    <Table striped hoverable className='my-4'>
                        <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>NAME</TableHeadCell>
                            <TableHeadCell>PRICE</TableHeadCell>
                            <TableHeadCell>CATEGORY</TableHeadCell>
                            <TableHeadCell>BRAND</TableHeadCell>
                            <TableHeadCell></TableHeadCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        { products.map((product) => (
                            <TableRow key={product._id}>
                            <TableCell>{product._id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.brand}</TableCell>
                            <TableCell>
                                <div className='flex justify-between'>
                                    <Link to={`/admin/product/${product._id}/edit`} className='hover:text-gray-800'>
                                        <FaEdit />
                                    </Link>
                                    <button
                                        onClick={() => deleteHandler(product._id)}
                                        className='text-red-400 hover:text-red-700'
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </>
            )}
        </div>
    </>
  )
}

export default ProductListPage