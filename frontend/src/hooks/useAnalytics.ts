import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api, { getSessionId } from '../services/api';

export const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await api.post('/analytics/track', {
          pagePath: location.pathname,
          sessionId: getSessionId(),
        });
      } catch (err) {
        // Silent error logging to prevent console pollution
        console.debug('Analytics tracker skipped:', err);
      }
    };
    trackPageView();
  }, [location]);
};
