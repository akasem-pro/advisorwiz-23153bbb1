
import { supabase } from '../../integrations/supabase/client';

/**
 * Track performance metrics
 */
export const trackPerformance = (
  functionName: string, 
  executionTime: number, 
  inputSize: number = 0
): void => {
  try {
    // Log performance data in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance: ${functionName} took ${Math.round(executionTime)}ms with ${inputSize} items`);
    }
    
    // Store metric in analytics
    storeAnalyticsMetric('function_performance', {
      function: functionName,
      time: executionTime,
      size: inputSize
    });
  } catch (error) {
    console.error('Error tracking performance:', error);
  }
};

/**
 * Get performance data for analysis
 */
export const getPerformanceData = async (
  functionName?: string
): Promise<any[]> => {
  try {
    const query = supabase
      .from('analytics_metrics')
      .select('*')
      .eq('metric_type', 'function_performance');
    
    if (functionName) {
      query.eq('metric_name', functionName);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error getting performance data:', error);
    return [];
  }
};

/**
 * Clear performance data from storage
 */
export const clearPerformanceData = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('analytics_metrics')
      .delete()
      .eq('metric_type', 'function_performance');
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error clearing performance data:', error);
    return false;
  }
};

/**
 * Record an analytics metric in Supabase via RPC call
 */
export const storeAnalyticsMetric = async (
  metricType: string,
  metricValue: string | number | Record<string, any>
): Promise<void> => {
  try {
    let metricName: string;
    let numericValue: number;
    
    // Handle different types of metric values
    if (typeof metricValue === 'string') {
      metricName = metricValue;
      numericValue = 1; // Default to 1 for string metrics (like events)
    } else if (typeof metricValue === 'number') {
      metricName = 'value';
      numericValue = metricValue;
    } else if (typeof metricValue === 'object') {
      // For object metrics, use the first key as the name and stringify the object
      const keys = Object.keys(metricValue);
      metricName = keys.length > 0 ? keys[0] : 'data';
      numericValue = 1;
      
      // Additional dimension handling for richer analytics
      if (keys.length > 1) {
        await supabase.rpc('record_metric', {
          p_metric_type: metricType,
          p_metric_name: metricName,
          p_metric_value: numericValue,
          p_dimension_name: 'data',
          p_dimension_value: JSON.stringify(metricValue)
        });
        return;
      }
    } else {
      metricName = 'unknown';
      numericValue = 0;
    }
    
    await supabase.rpc('record_metric', {
      p_metric_type: metricType,
      p_metric_name: metricName,
      p_metric_value: numericValue
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Analytics metric recorded: ${metricType}=${metricName}`);
    }
  } catch (error) {
    console.error('Failed to store analytics metric:', error);
  }
};
