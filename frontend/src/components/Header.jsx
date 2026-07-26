import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, Button, Badge, Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../slices/usersApiSlice'
import SearchBox from './SearchBox'
import { logout } from '../slices/authSlice'
import { resetCart } from '../slices/cartSlice'

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)  
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            dispatch(resetCart())
            navigate('/login')
            
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <header className='bg-gray-500 shadow relative'>
        <Navbar fluid className='bg-transparent px-0'>
            <div className='w-full max-w-6xl mx-auto px-6 py-3 flex items-center justify-between relative'> 
                <NavbarBrand as={Link} to='/' className='font-bold text-2xl text-gray-200'>ProShop</NavbarBrand>
                    
                <NavbarToggle className='text-gray-200 hover:text-gray-300 hover:bg-white/20 bg-white/10 focus:ring-0' />

                <NavbarCollapse className='md:static md:block md:w-auto md:bg-transparent md:shadow-none md:p-0 md:border-0 absolute right-6 top-full mt-2 w-44 bg-gray-500/95 backdrop-blur border border-white/10 rounded-xl shadow-xl p-2 z-50 [&>ul]:mt-0'>
                    <SearchBox />
                    <NavbarLink as={Link} to='/cart' className='border-0 px-3 py-2 hover:bg-white hover:rounded-xl'>
                        <span className='flex flex-wrap md:items-center gap-1'>
                            <span className='flex md:flex-col items-center justify-center gap-3 md:gap-1 text-sm text-gray-200 hover:text-gray-500 md:hover:text-gray-800'>
                                <FaShoppingCart className='text-lg' />
                                    Cart
                            </span>
                            <span>
                                    {
                                        cartItems.length > 0 && (
                                            <Badge color='success' style={{marginLeft: '7px', marginTop: '4px'}} className='rounded-full'>
                                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                                            </Badge>
                                        )
                                    }
                            </span>
                        </span> 
                    </NavbarLink>
                    <div className='mx-auto my-1 h-px w-1/3 bg-white/30 rounded-full md:hidden'></div>
                    { userInfo ? (
                        <Dropdown
                        arrowIcon={false}
                        inline
                        id='username'
                        placement='bottom-end'
                        renderTrigger={() => (
                            <button className='min-w-[110px] justify-center inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-gray-200 hover:bg-white/20 focus:outline-none focus:ring-0 !mr-0 !me-0'>
                                {userInfo.name}
                            </button>
                        )}
                        >
                            <DropdownItem as={Link} to='/profile'>
                                Profile
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem
                            onClick={logoutHandler}
                            >
                                Log out
                            </DropdownItem>
                        </Dropdown>
                    ) : (<NavbarLink as={Link} to='/login' className='border-0 px-3 py-2 hover:bg-white hover:rounded-xl'>
                        <span className='flex md:flex-col items-center justify-center gap-3 md:gap-1 text-sm text-gray-200 hover:text-gray-500 md:hover:text-gray-800'>
                            <FaUser className='text-lg'/>
                            Sign In
                        </span>
                    </NavbarLink>) }
                    { userInfo && userInfo.isAdmin && (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            id='admin'
                             placement='bottom-end'
                             renderTrigger={() => (
                                <button className='min-w-[110px] justify-center inline-flex items-center whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium text-gray-200 hover:bg-white/20 focus:outline-none focus:ring-0 !mr-0 !me-0'>
                                    Admin
                                </button>
                             )}
                        >
                            <DropdownItem as={Link} to='/admin/orderlist'>
                                Orders
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem as={Link} to='/admin/userlist'>
                                Users
                            </DropdownItem>
                            <DropdownDivider />
                            <DropdownItem as={Link} to='/admin/productlist'>
                                Products
                            </DropdownItem>
                        </Dropdown>
                    )}
                </NavbarCollapse>
            </div>
        </Navbar>
    </header>
  )
}

export default Header