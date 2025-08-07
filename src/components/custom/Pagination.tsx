// src/components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  pageCount: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export default function Pagination({
  currentPage,
  pageCount,
  setPage,
  nextPage,
  prevPage,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  // Generate page numbers (limit max to 5 for compactness)
  const pageNumbers = [];
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = Math.min(startPage + 4, pageCount);

  // Adjust startPage if near end
  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-end mt-6 space-x-1">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-40"
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setPage(page)}
          className={`rounded px-3 py-1 ${
            page === currentPage
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={nextPage}
        disabled={currentPage === pageCount}
        className="rounded px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
