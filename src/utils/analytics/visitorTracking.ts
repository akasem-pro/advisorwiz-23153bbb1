
import { supabase } from '../../integrations/supabase/client';

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
