
import React, { useState, useRef, useEffect } from 'react';
import { animateElement, staggerAnimation, animateWithClasses, prefersReducedMotion } from '../../utils/animations/optimizedAnimations';
import { trackAnimationStart, trackAnimationEnd } from '../../utils/performance/animationMetrics';
import { Button } from '../ui/button';

/**
 * Demonstration component for optimized animations
 */
export const OptimizedAnimations: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  
  // Check if user prefers reduced motion
  const reducedMotion = prefersReducedMotion();
  
  // Demo animation for single element
  const animateBox = () => {
    if (!boxRef.current || isAnimating) return;
    
    setIsAnimating(true);
    
    // Track animation for performance metrics
    const animationId = trackAnimationStart('box-demo-animation');
    
    animateElement(
      boxRef.current, 
      { transform: 'translateX(200px)' },
      {
        duration: 800,
        easing: 'ease-out',
        onComplete: () => {
          // Animate back
          animateElement(
            boxRef.current as HTMLDivElement, 
            { transform: 'translateX(0)' },
            {
              duration: 800,
              easing: 'ease-in-out',
              onComplete: () => {
                setIsAnimating(false);
                trackAnimationEnd(animationId);
              }
            }
          );
        }
      }
    );
  };
  
  // Demo animation for list items
  const animateList = () => {
    if (!listRef.current || isAnimating) return;
    
    setIsAnimating(true);
    
    // Get all list items
    const items = Array.from(listRef.current.children) as HTMLElement[];
    
    // Track animation for performance metrics
    const animationId = trackAnimationStart('list-stagger-animation');
    
    // Run staggered animation
    staggerAnimation(
      items,
      { 
        opacity: '1',
        transform: 'translateY(0)'
      },
      {
        duration: 300,
        staggerDelay: 50,
        onComplete: () => {
          setTimeout(() => {
            // Reset items
            items.forEach(item => {
              item.style.opacity = '0';
              item.style.transform = 'translateY(20px)';
            });
            
            setIsAnimating(false);
            trackAnimationEnd(animationId);
          }, 1000);
        }
      }
    );
  };
  
  // Reset list items on mount
  useEffect(() => {
    if (!listRef.current) return;
    
    const items = Array.from(listRef.current.children) as HTMLElement[];
    
    items.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });
  }, []);
  
  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Optimized Animation Examples</h2>
      
      {reducedMotion && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-amber-800 mb-4">
          Reduced motion is enabled in your system preferences. Animations will be minimized.
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Single Element Animation</h3>
        <div 
          ref={boxRef}
          className="bg-blue-500 text-white p-4 rounded-md w-32 h-32 flex items-center justify-center"
        >
          Animate Me!
        </div>
        <Button 
          onClick={animateBox} 
          disabled={isAnimating}
        >
          {isAnimating ? 'Animating...' : 'Start Animation'}
        </Button>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Staggered List Animation</h3>
        <ul ref={listRef} className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <li 
              key={i}
              className="bg-teal-500 text-white p-4 rounded-md"
            >
              List Item {i + 1}
            </li>
          ))}
        </ul>
        <Button 
          onClick={animateList} 
          disabled={isAnimating}
          variant="outline"
        >
          {isAnimating ? 'Animating...' : 'Animate List'}
        </Button>
      </div>
    </div>
  );
};

export default OptimizedAnimations;
