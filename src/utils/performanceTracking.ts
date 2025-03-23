
import * as webVitals from 'web-vitals';
import { supabase } from '../integrations/supabase/client';

// Consolidated performance tracking data
interface PerformanceData {
  functionName: string;
  executionTime: number;
  inputSize: number;
  timestamp: number;
}

let performanceData: PerformanceData[] = [];
const MAX_ENTRIES = 100;

// Initialize and track all web vitals
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    try {
      webVitals.onCLS(sendToAnalytics);
      webVitals.onFID(sendToAnalytics);
      webVitals.onLCP(sendToAnalytics);
      webVitals.onFCP(sendToAnalytics);
      webVitals.onTTFB(sendToAnalytics);
      webVitals.onINP(sendToAnalytics);
    } catch (error) {
      console.error('Failed to load web-vitals:', error);
    }
  }
};

// Consolidated function to send metrics to analytics
const sendToAnalytics = (metric: webVitals.Metric) => {
  // Check if gtag is available
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-ignore
    window.gtag('event', 'web_vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
      metric_id: metric.id,
      metric_rating: metric.navigationType || 'unknown'
    });
  }
  
  // Store in Supabase analytics for dashboards
  storeAnalyticsMetric('web_vitals', metric.name, metric.value);
  
  // Log to console during development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
};

// Track the performance of a function execution
export const trackPerformance = (
  functionName: string,
  executionTime: number,
  inputSize: number = 0
): void => {
  // Add new entry
  performanceData.push({
    functionName,
    executionTime,
    inputSize,
    timestamp: Date.now()
  });
  
  // Store in database for long-term analysis
  storePerformanceMetric(functionName, executionTime, inputSize);
  
  // Trim if exceeding max size
  if (performanceData.length > MAX_ENTRIES) {
    performanceData = performanceData.slice(-MAX_ENTRIES);
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `Performance: ${functionName} executed in ${executionTime.toFixed(2)}ms with input size ${inputSize}`
    );
  }
};

// Store performance data in Supabase
const storePerformanceMetric = async (
  functionName: string,
  executionTime: number,
  inputSize: number
): Promise<void> => {
  try {
    await supabase.from('matching_performance').insert({
      function_name: functionName,
      execution_time: executionTime,
      input_size: inputSize
    });
  } catch (error) {
    console.error('Failed to store performance metric:', error);
  }
};

// Store general analytics metric
const storeAnalyticsMetric = async (
  metricType: string,
  metricName: string,
  metricValue: number,
  dimensionName?: string,
  dimensionValue?: string
): Promise<void> => {
  try {
    const { data, error } = await supabase.rpc('record_metric', {
      p_metric_type: metricType,
      p_metric_name: metricName,
      p_metric_value: metricValue,
      p_dimension_name: dimensionName,
      p_dimension_value: dimensionValue
    });
    
    if (error) {
      console.error('Failed to store analytics metric:', error);
    }
  } catch (error) {
    console.error('Exception storing analytics metric:', error);
  }
};

// Get performance data for analysis
export const getPerformanceData = (): PerformanceData[] => {
  return [...performanceData];
};

// Clear performance data
export const clearPerformanceData = (): void => {
  performanceData = [];
};

// Performance wrapper for functions
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  fnName: string
): (...args: Parameters<T>) => ReturnType<T> {
  return (...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    
    // Use performance mark for more detailed profiling in DevTools
    performance.mark(`${fnName}-start`);
    
    const result = fn(...args);
    
    const endTime = performance.now();
    performance.mark(`${fnName}-end`);
    performance.measure(fnName, `${fnName}-start`, `${fnName}-end`);
    
    trackPerformance(fnName, endTime - startTime, args.length);
    
    return result;
  };
}

// Setup lazy loading for images
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: [0.01]
    });
    
    lazyImages.forEach((img) => imageObserver.observe(img));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach((img: Element) => {
      const imgEl = img as HTMLImageElement;
      if (imgEl.dataset.src) {
        imgEl.src = imgEl.dataset.src;
        imgEl.removeAttribute('data-src');
      }
    });
  }
};

// Track visitor analytics
export const trackVisitorActivity = async (pageUrl: string): Promise<void> => {
  // Only track in production
  if (process.env.NODE_ENV !== 'production') return;
  
  try {
    // Generate or retrieve visitor ID from localStorage
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID ? crypto.randomUUID() : `visitor_${Date.now()}`;
      localStorage.setItem('visitor_id', visitorId);
    }
    
    // Get basic visitor information
    const userAgent = navigator.userAgent;
    const referrer = document.referrer;
    
    // Extract UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    // Check if this visitor exists
    const { data: existingVisitor } = await supabase
      .from('visitor_analytics')
      .select('id, visit_count')
      .eq('visitor_id', visitorId)
      .maybeSingle();
    
    if (existingVisitor) {
      // Update existing visitor
      await supabase
        .from('visitor_analytics')
        .update({
          last_visit_date: new Date().toISOString(),
          visit_count: (existingVisitor.visit_count || 0) + 1,
          landing_page: pageUrl
        })
        .eq('visitor_id', visitorId);
    } else {
      // Create new visitor record
      await supabase
        .from('visitor_analytics')
        .insert({
          visitor_id: visitorId,
          landing_page: pageUrl,
          referrer,
          browser: getBrowserInfo(userAgent),
          device_type: getDeviceType(userAgent),
          os: getOSInfo(userAgent),
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign
        });
    }
  } catch (error) {
    console.error('Failed to track visitor:', error);
  }
};

// Track feature usage
export const trackFeatureUsage = async (featureName: string): Promise<void> => {
  const user = supabase.auth.getSession();
  if (!user) return;
  
  try {
    const userId = (await user).data.session?.user.id;
    if (!userId) return;
    
    // Check if this feature has been used by this user
    const { data: existingUsage } = await supabase
      .from('feature_usage')
      .select('id, usage_count')
      .eq('user_id', userId)
      .eq('feature_name', featureName)
      .maybeSingle();
    
    if (existingUsage) {
      // Update existing feature usage
      await supabase
        .from('feature_usage')
        .update({
          usage_count: (existingUsage.usage_count || 0) + 1,
          last_used_at: new Date().toISOString()
        })
        .eq('id', existingUsage.id);
    } else {
      // Create new feature usage
      await supabase
        .from('feature_usage')
        .insert({
          user_id: userId,
          feature_name: featureName
        });
    }
  } catch (error) {
    console.error(`Failed to track feature usage for ${featureName}:`, error);
  }
};

// Track AI interaction
export const trackAIInteraction = async (
  sessionId: string,
  interactionType: string,
  prompt?: string,
  response?: string,
  tokensUsed?: number,
  latencyMs?: number
): Promise<void> => {
  const user = supabase.auth.getSession();
  
  try {
    const userId = (await user).data.session?.user.id;
    
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: userId,
        session_id: sessionId,
        interaction_type: interactionType,
        prompt,
        response,
        tokens_used: tokensUsed,
        latency_ms: latencyMs
      });
  } catch (error) {
    console.error('Failed to track AI interaction:', error);
  }
};

// Record match history for trend analysis
export const recordMatchHistory = async (
  compatibilityScoreId: string,
  advisorId: string,
  consumerId: string,
  score: number,
  factors?: Record<string, any>
): Promise<void> => {
  try {
    await supabase
      .from('match_history')
      .insert({
        compatibility_score_id: compatibilityScoreId,
        advisor_id: advisorId,
        consumer_id: consumerId,
        score,
        algorithm_version: '1.0', // Update this as algorithm changes
        factors: factors || null
      });
  } catch (error) {
    console.error('Failed to record match history:', error);
  }
};

// Utility functions for visitor analytics
const getBrowserInfo = (userAgent: string): string => {
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident/')) return 'Internet Explorer';
  return 'Other';
};

const getDeviceType = (userAgent: string): string => {
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) return 'Mobile';
  if (/Tablet|iPad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
};

const getOSInfo = (userAgent: string): string => {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Other';
};

// Consolidated function to initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Track web vitals
    trackWebVitals();
    
    // Track current page visit
    trackVisitorActivity(window.location.pathname);
    
    // Setup optimizations when DOM is loaded
    if (document.readyState === 'complete') {
      setupLazyLoading();
      optimizeImagesForCWV();
      implementResourceHints();
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        setupLazyLoading();
        optimizeImagesForCWV();
        implementResourceHints();
      });
    }
    
    // Add event listeners for client-side navigation
    document.addEventListener('newpage', () => {
      setupLazyLoading();
      optimizeImagesForCWV();
      // Track new page navigation
      trackVisitorActivity(window.location.pathname);
    });
  }
};

// Optimize images for Core Web Vitals (extracted from previous version)
export const optimizeImagesForCWV = () => {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('loading') && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('loading', 'lazy');
        
        // Add decoding async for better performance
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      }
    });
  }
  
  // Add fetchpriority="high" to LCP image
  const heroImages = document.querySelectorAll('.hero-image img, .primary-image img');
  heroImages.forEach((img) => {
    if (!img.hasAttribute('fetchpriority')) {
      img.setAttribute('fetchpriority', 'high');
      img.removeAttribute('loading'); // Don't lazy-load LCP images
    }
  });
};

// Implement resource hints (extracted from previous version)
export const implementResourceHints = () => {
  const head = document.head;
  
  // Common domains to preconnect to
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ];
  
  // Add preconnect hints
  preconnectDomains.forEach(domain => {
    if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
};
