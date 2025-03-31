
import React, { useEffect } from 'react';
import {
  isTrackingAllowed,
  initializeGA4,
  initializeMetaPixel,
  initializePinterestTag,
  initializeGoogleAdSense,
  TrackingConfig
} from '../../utils/analytics/trackers';

interface TrackingManagerProps {
  config: TrackingConfig;
}

/**
 * Component to manage and initialize all tracking services
 * based on user consent and configuration
 */
const TrackingManager: React.FC<TrackingManagerProps> = ({ config }) => {
  useEffect(() => {
    // Initialize tracking services based on user consent and configuration
    if (config.googleAnalytics && isTrackingAllowed('analytics')) {
      initializeGA4(config.googleAnalytics);
    }
    
    if (config.metaPixel && isTrackingAllowed('marketing')) {
      initializeMetaPixel(config.metaPixel);
    }
    
    if (config.pinterestTag && isTrackingAllowed('marketing')) {
      initializePinterestTag(config.pinterestTag);
    }
    
    if (config.googleAdSense && isTrackingAllowed('marketing')) {
      initializeGoogleAdSense(config.googleAdSense);
    }
  }, [config]);

  // This component doesn't render anything visible
  return null;
};

export default TrackingManager;
