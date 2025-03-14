
import { AdvisorProfile, ConsumerProfile } from '../../context/UserContext';

export const useMatchingActions = (
  setMatches: (callback: (prev: string[]) => string[]) => void,
  currentIndex: number,
  filteredItems: AdvisorProfile[] | ConsumerProfile[],
  setCurrentIndex: (index: number) => void,
  setEmpty: (empty: boolean) => void
) => {
  const handleSwipeRight = (item: AdvisorProfile | ConsumerProfile) => {
    setMatches(prev => [...prev, item.id]);
    nextItem();
  };

  const handleSwipeLeft = () => {
    nextItem();
  };

  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setEmpty(true);
    }
  };

  const resetItems = () => {
    setCurrentIndex(0);
    setEmpty(false);
  };

  const getCurrentItem = () => {
    return filteredItems[currentIndex];
  };

  return {
    handleSwipeRight,
    handleSwipeLeft,
    resetItems,
    getCurrentItem
  };
};
