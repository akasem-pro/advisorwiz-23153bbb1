
import { useState, useEffect, useRef, useMemo } from 'react';

interface UseVirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  overscan?: number;
  scrollContainerHeight?: number;
}

interface UseVirtualizedListResult<T> {
  visibleItems: { item: T; index: number }[];
  containerProps: {
    style: React.CSSProperties;
    ref: React.RefObject<HTMLDivElement>;
  };
  scrollToIndex: (index: number) => void;
}

export function useVirtualizedList<T>({
  items,
  itemHeight,
  overscan = 3,
  scrollContainerHeight = 400
}: UseVirtualizedListProps<T>): UseVirtualizedListResult<T> {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollTop(containerRef.current.scrollTop);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const visibleItems = useMemo(() => {
    if (!items.length) return [];

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + scrollContainerHeight) / itemHeight) + overscan
    );

    const visibleData = [];
    for (let i = startIndex; i <= endIndex; i++) {
      visibleData.push({
        item: items[i],
        index: i
      });
    }

    return visibleData;
  }, [items, scrollTop, itemHeight, overscan, scrollContainerHeight]);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  };

  return {
    visibleItems,
    containerProps: {
      style: {
        height: scrollContainerHeight,
        overflow: 'auto',
        position: 'relative',
        willChange: 'transform'
      },
      ref: containerRef
    },
    scrollToIndex
  };
}
