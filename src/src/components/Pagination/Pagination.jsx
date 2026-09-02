// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  // Determine the range of pagination buttons to display
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages > 4) {
    if (currentPage <= 2) {
      endPage = 4;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 3;
    } else {
      startPage = currentPage - 1;
      endPage = currentPage + 1;
    }
  }

  return (
    <div className="pagination">
      <button onClick={() => paginate(1)}>First</button>
      {startPage > 1 && <span>...</span>}
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
        <button
          key={startPage + index}
          onClick={() => paginate(startPage + index)}
          className={currentPage === startPage + index ? 'active' : ''}
        >
          {startPage + index}
        </button>
      ))}
      {endPage < totalPages && <span>...</span>}
      <button onClick={() => paginate(totalPages)}>Last</button>
    </div>
  );
};

export default Pagination;
