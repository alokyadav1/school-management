/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import ProfileCard from '../dashboard/AdminDashboard/ProfileCard';
import styles from "./pagination.module.css"
import {FcPrevious, FcNext} from "react-icons/fc"
function Pagination({data,role,filter=null}) {

  let filteredData = []
  if(filter){
    filteredData = data?.filter((item) => filter?.includes(item.standard+"th"));
  } else {
    filteredData = data
  }
  
  const [currentPage, setCurrentPage] = useState(0)
  const PER_PAGE = 10;
  const OFFSET = currentPage * PER_PAGE;
  const pageCount = Math.ceil(filteredData?.length / PER_PAGE);

  const handlePageChange = ({selected}) => {
    setCurrentPage(selected)
  }
  const currentPageData = filteredData?.slice(OFFSET,OFFSET+PER_PAGE)
  return (
      <>
        <div className='flex flex-wrap items-center justify-center gap-2 px-2 -z-10'>
          {
            currentPageData?.map((item, index) => {
              return (
                <ProfileCard key={item._id} data={item} role={role} />
              )
            })
          }
        </div>
        <div className='p-5 overflow-auto mx-5'>
          <ReactPaginate
            previousLabel={<FcPrevious/>}
            nextLabel={<FcNext />}
            breakLabel={'...'}
            breakClassName={styles.breakme}
            pageCount={pageCount} // The total number of pages
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            containerClassName={styles.pagination}
            subContainerClassName={`${styles.pages} styles.pagination`}
            activeClassName={styles.active}
          />
        </div>
      </>
  )
}

export default Pagination
