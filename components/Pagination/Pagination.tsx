import ReactPaginate from 'react-paginate';
import css from '../Pagination/Pagination.module.css';
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  setCurrentPage,
  currentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      onPageChange={({ selected }) => setCurrentPage(selected + 1)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="←"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}
