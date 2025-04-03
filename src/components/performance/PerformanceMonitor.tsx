
import React, { useEffect, useState } from 'react';
import { getPerformanceReport } from '../../utils/performance/integrated/performanceMonitor';
import { Button } from '../ui/button';
import { getCompatibilityCacheStats } from '../../services/matching';
import { Progress } from '../ui/progress';

interface PerformanceMetrics {
  cachePerformance: {
    size: number;
    activeEntries: number;
    hitRate: string;
  };
  animationPerformance: {
    averageFps: number;
    averageDroppedFrameRatio: number;
    smoothAnimationRatio: number;
  };
}

/**
 * Performance monitor component for visualizing app performance metrics
 */
export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [expanded, setExpanded] = useState(false);
  
  // Update metrics periodically
  useEffect(() => {
    // Get initial metrics
    updateMetrics();
    
    // Set up interval to update metrics
    const intervalId = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  const updateMetrics = () => {
    const report = getPerformanceReport();
    setMetrics({
      cachePerformance: report.cachePerformance,
      animationPerformance: report.animationPerformance
    });
  };
  
  // Only render in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  if (!metrics) {
    return <div>Loading metrics...</div>;
  }
  
  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Performance Monitor</h3>
        <Button 
          variant="ghost" 
          onClick={() => setExpanded(!expanded)}
          size="sm"
        >
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      
      {/* Animation Performance */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Animation Performance</h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Average FPS</span>
              <span>{metrics.animationPerformance.averageFps.toFixed(1)}</span>
            </div>
            <Progress 
              value={metrics.animationPerformance.averageFps / 60 * 100} 
              className="h-2"
            />
          </div>
          
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Smooth Animations</span>
              <span>{(metrics.animationPerformance.smoothAnimationRatio * 100).toFixed(0)}%</span>
            </div>
            <Progress 
              value={metrics.animationPerformance.smoothAnimationRatio * 100} 
              className="h-2"
            />
          </div>
        </div>
      </div>
      
      {/* Cache Performance */}
      <div>
        <h4 className="text-sm font-medium mb-2">Cache Performance</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span>Cache Hit Rate</span>
            <span>{metrics.cachePerformance.hitRate}</span>
          </div>
          
          <div className="flex justify-between text-xs">
            <span>Cache Entries</span>
            <span>
              {metrics.cachePerformance.activeEntries} / {metrics.cachePerformance.size}
            </span>
          </div>
        </div>
      </div>
      
      {/* Expanded Detail View */}
      {expanded && (
        <div className="mt-4 pt-4 border-t">
          <Button 
            onClick={updateMetrics}
            size="sm"
            variant="outline"
            className="mb-4"
          >
            Refresh Metrics
          </Button>
          
          <div className="text-xs space-y-2">
            <p>
              <strong>Dropped Frames Ratio:</strong> {(metrics.animationPerformance.averageDroppedFrameRatio * 100).toFixed(1)}%
            </p>
            
            <p>
              <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
