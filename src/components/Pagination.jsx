const Pagination = ({
  handlePreviousPageChange,
  currentPage,
  noOfPages,
  handlePageChange,
  handleNextPageChange,
}) => {
  return (
    <div className="pagination-container">
      <button
        className="pagination-arrow"
        onClick={handlePreviousPageChange}
        disabled={currentPage === 0}
      >
        ⬅️
      </button>
      {[...Array(noOfPages).keys()].map((pageNum) => (
        <button
          className={
            pageNum === currentPage ? "page-number active" : "page-number"
          }
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
        >
          {pageNum + 1}
        </button>
      ))}
      <button
        className="pagination-arrow"
        onClick={handleNextPageChange}
        disabled={currentPage === noOfPages - 1}
      >
        ➡️
      </button>
    </div>
  );
};

export default Pagination;
