import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, TextInput, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

const Header = () => {
  return (
    <header className='bg-gray-500 shadow relative'>
        <Navbar fluid className='bg-transparent px-0'>
            <div className='w-full max-w-6xl mx-auto px-6 py-3 flex items-center justify-between relative'> 
                <NavbarBrand as={Link} to='/' className='font-bold text-2xl text-gray-200'>ProShop</NavbarBrand>
                    
                <NavbarToggle className='text-gray-200 hover:text-gray-300 hover:bg-white/20 bg-white/10 focus:ring-0' />

                <NavbarCollapse className='md:static md:block md:w-auto md:bg-transparent md:shadow-none md:p-0 md:border-0 absolute right-6 top-full mt-2 w-44 bg-gray-500/95 backdrop-blur border border-white/10 rounded-xl shadow-xl p-2 z-50 [&>ul]:mt-0'>
                    <NavbarLink as={Link} to='/cart' className='border-0 px-3 py-2 hover:bg-white hover:rounded-xl'>
                        <span className='flex md:flex-col items-center justify-center gap-3 md:gap-1 text-sm text-gray-200 hover:text-gray-500 md:hover:text-gray-800'>
                            <FaShoppingCart className='text-lg' />
                            Cart
                        </span>
                    </NavbarLink>
                    <div className='mx-auto my-1 h-px w-1/3 bg-white/30 rounded-full md:hidden'></div>
                    <NavbarLink as={Link} to='/login' className='border-0 px-3 py-2 hover:bg-white hover:rounded-xl'>
                        <span className='flex md:flex-col items-center justify-center gap-3 md:gap-1 text-sm text-gray-200 hover:text-gray-500 md:hover:text-gray-800'>
                            <FaUser className='text-lg'/>
                            Sign In
                        </span>
                    </NavbarLink>
                </NavbarCollapse>
            </div>
        </Navbar>
    </header>
  )
}

export default Header