import { Pagination } from "flowbite-react";
import { useNavigate } from "react-router-dom"

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    const navigate = useNavigate()

    if ( pages <=1 ) return null

    const onPageChange = (newPage) => {
        navigate(
            !isAdmin
                ? keyword ? `/search/${keyword}/page/${newPage}` : `/page/${newPage}`
                : `/admin/productlist/${newPage}`
        )
    }

  return (
    <div className="flex justify-center mt-10">
        <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={onPageChange}
            showIcons
        />
    </div>
  )
}

export default Paginate