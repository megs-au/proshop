import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

  return (
    <footer>
        <div>
            <div className='mt-10 mx-35 py-6 text-center text-sm text-gray-500 border-t border-gray-200'>
                <p>ProShop &copy; {currentYear}</p>
            </div>    
        </div>
    </footer>
  )
}

export default Footer