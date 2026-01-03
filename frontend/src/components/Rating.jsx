import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ value, text }) => {
  return (
    <div className='flex items-center'>
        <span className='mx-1 text-[#f8e825] text-sm'>
            {value >=1? <FaStar /> : value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='mx-1 text-[#f8e825] text-sm'>
            {value >=2? <FaStar /> : value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='mx-1 text-[#f8e825] text-sm'>
            {value >=3? <FaStar /> : value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='mx-1 text-[#f8e825] text-sm'>
            {value >=4? <FaStar /> : value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='mx-1 text-[#f8e825] text-sm'>
            {value >=5? <FaStar /> : value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
        </span>
        <span className='font-semibold px-1 text-sm text-gray-600'>{text && text}</span>
    </div>
  )
}

export default Rating