import React from 'react'
import usePagination from './usePagination';

export default function Pagination(props) {
    const DOTS = "...";
    const {
        className,
        pageSize,   
        currentPage,
        totalCount,
        onPageChange,
        totalPages,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        pageSize,
        totalPages
    });

    // console.log(paginationRange);

    if (currentPage === 0 || paginationRange && paginationRange.length < 2) {
        return;
    }

    const lastPage = paginationRange && paginationRange[paginationRange && paginationRange.length - 1];

    const onLeftClick = () => {
        onPageChange(currentPage - 1);
    }

    const onRightClick = () => {
        onPageChange(currentPage + 1);
    }

    return (
        <ul className={`pagination-container ${className}`}>
            <li className={`pagination-item  ${currentPage === 1 ? 'disabled' :''}`} onClick={onLeftClick}>
                <div className='arrow left'></div>
            </li>

            {
               paginationRange &&  paginationRange.map((pageNumber,i) => {
                    if (pageNumber === DOTS) {
                        return ( <li key={i} className='pagination-item dots'>&#8230;</li>);
                    }

                    return (
                        <li key={i} className={`pagination-item ${ pageNumber === currentPage ? 'selected': ''}`}
                        onClick={() => onPageChange(pageNumber)}
                        >{pageNumber}</li>
                    )
                })
            }
           
            <li className={`pagination-item ${currentPage === lastPage ? 'disabled' :''}`} onClick={onRightClick}>
                <div className='arrow right'></div>
            </li>
        </ul>
    )
}