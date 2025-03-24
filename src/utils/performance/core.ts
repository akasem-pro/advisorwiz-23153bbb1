
import { supabase } from '../../integrations/supabase/client';

/**
 * Record an analytics metric in Supabase via RPC call
 */
export const storeAnalyticsMetric = async (
  metricType: string,
  metricValue: string | number
): Promise<void> => {
  try {
    // Convert string values to numeric if needed
    const numericValue = typeof metricValue === 'string' 
      ? 1 // Default to 1 for string metrics (like events)
      : metricValue;
    
    await supabase.rpc('record_metric', {
      p_metric_type: metricType,
      p_metric_name: typeof metricValue === 'string' ? metricValue : 'value',
      p_metric_value: numericValue
    });
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Analytics metric recorded: ${metricType}=${metricValue}`);
    }
  } catch (error) {
    console.error('Failed to store analytics metric:', error);
  }
};
