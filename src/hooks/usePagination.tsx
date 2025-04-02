
/**
 * Pagination hook for handling list pagination
 */
import { useState, useMemo } from 'react';

// Interface for pagination options
export interface PaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

// Interface for pagination result
export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

/**
 * A hook for handling pagination of lists
 * @param options - Pagination options
 * @returns Pagination utilities
 */
export const usePagination = <T,>(
  options: { items: T[] } & PaginationOptions
): PaginationResult<T> => {
  const { items, itemsPerPage = 10, initialPage = 1 } = options;

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length, itemsPerPage]);

  // Manage current page state
  const [currentPage, setCurrentPage] = useState(
    initialPage > totalPages ? 1 : initialPage
  );

  // Ensure current page is valid when total pages changes
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Get paginated items for current page
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Go to a specific page
  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  // Navigate to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  // Navigate to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return {
    items: paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  };
};

export default usePagination;
