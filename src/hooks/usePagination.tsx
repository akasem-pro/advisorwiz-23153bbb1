
import { useState, useMemo, useCallback } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

interface PaginationResult<T> {
  // Current state
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  
  // Paginated data
  paginatedData: T[];
  
  // Navigation functions
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Utility functions
  paginate: (data: T[]) => T[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  
  // Page information
  pageInfo: {
    startItem: number;
    endItem: number;
    currentPageItems: number;
  };
}

/**
 * Custom hook for handling pagination with TypeScript type safety
 */
export function usePagination<T>(
  data: T[] = [],
  options: PaginationOptions = {}
): PaginationResult<T> {
  // Default options
  const {
    initialPage = 1,
    initialPageSize = 10,
    totalItems: externalTotalItems
  } = options;
  
  // State
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  
  // Calculate total items and pages
  const totalItems = externalTotalItems !== undefined 
    ? externalTotalItems 
    : data.length;
    
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil(totalItems / pageSize)),
    [totalItems, pageSize]
  );
  
  // Ensure currentPage is valid when data or pageSize changes
  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);
  
  // Navigation functions
  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);
  
  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);
  
  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  }, [totalPages]);
  
  const changePageSize = useCallback((size: number) => {
    setPageSize(size);
    // Adjust current page to avoid empty results
    const newTotalPages = Math.ceil(totalItems / size);
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [totalItems, currentPage]);
  
  // Calculate pagination bounds
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  
  // Paginate function
  const paginate = useCallback((items: T[]): T[] => {
    return items.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);
  
  // Get paginated data
  const paginatedData = useMemo(() => {
    return paginate(data);
  }, [data, paginate]);
  
  // Calculate page information
  const pageInfo = useMemo(() => ({
    startItem: totalItems > 0 ? startIndex + 1 : 0,
    endItem: endIndex,
    currentPageItems: paginatedData.length
  }), [startIndex, endIndex, paginatedData.length, totalItems]);
  
  // Return everything
  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
    setPageSize: changePageSize,
    paginate,
    hasPrevPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
    pageInfo
  };
}
