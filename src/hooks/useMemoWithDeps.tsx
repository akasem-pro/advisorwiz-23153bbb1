
import { useMemo, useRef, useEffect, DependencyList } from 'react';

/**
 * Enhanced useMemo that logs when dependencies change
 * Useful for debugging performance issues
 */
export function useMemoWithDeps<T>(
  factory: () => T,
  deps: DependencyList,
  debugLabel?: string
): T {
  const prevDepsRef = useRef<DependencyList>(deps);
  
  // Only log in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && debugLabel) {
      const changedDeps = deps.map((dep, index) => {
        const prevDep = prevDepsRef.current[index];
        return prevDep !== dep ? index : -1;
      }).filter(index => index !== -1);
      
      if (changedDeps.length > 0) {
        console.debug(
          `[MemoDebug] ${debugLabel} recomputed due to dependencies changing:`, 
          changedDeps.map(index => index.toString())
        );
      }
    }
    
    prevDepsRef.current = deps;
  }, deps);
  
  return useMemo(factory, deps);
}

/**
 * Stable reference comparison utility for objects
 * Used to prevent unnecessary re-renders
 */
export function useStableObject<T extends Record<string, any>>(
  obj: T,
  deps: DependencyList = Object.values(obj)
): T {
  return useMemo(() => obj, deps);
}

/**
 * Hook to optimize lists by memoizing each item
 * Only re-renders items that have changed
 */
export function useMemoizedList<T>(
  items: T[],
  keyExtractor: (item: T) => string | number,
  deps: DependencyList = [items]
): T[] {
  // Create a map of original items by key
  const itemsMap = useMemo(() => {
    const map = new Map<string | number, T>();
    items.forEach(item => {
      map.set(keyExtractor(item), item);
    });
    return map;
  }, deps);
  
  // Convert back to array maintaining original order
  return useMemo(() => {
    return items.map(item => {
      const key = keyExtractor(item);
      return itemsMap.get(key) as T;
    });
  }, [itemsMap, items, keyExtractor]);
}
