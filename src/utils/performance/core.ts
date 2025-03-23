
import { supabase } from '../../integrations/supabase/client';

// Consolidated performance tracking data
export interface PerformanceData {
  functionName: string;
  executionTime: number;
  inputSize: number;
  timestamp: number;
}

let performanceData: PerformanceData[] = [];
const MAX_ENTRIES = 100;

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
export const storeAnalyticsMetric = async (
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
