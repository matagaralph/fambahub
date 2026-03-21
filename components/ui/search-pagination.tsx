'use client';
import { Pagination } from '@primer/react';

export function SearchPagination({
  page,
  onPageChange,
  total,
  itemsPerPage,
}: {
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  itemsPerPage: number;
}) {
  if (total <= itemsPerPage) return null;

  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <div className='mt-12 flex justify-center'>
      <Pagination
        pageCount={pageCount}
        currentPage={page}
        onPageChange={(e, p) => {
          e.preventDefault();
          onPageChange(p);
        }}
        showPages={{ narrow: false }}
      />
    </div>
  );
}
