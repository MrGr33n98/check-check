// hooks/useSafeFetch.ts - COMPLETE REDESIGN
import { useCallback, useRef, useEffect } from 'react';

// Type definitions
interface FetchState {
  controller: AbortController;
  timestamp: number;
  key: string;
}

interface UseSafeFetchReturn {
  safeFetch: (url: string, options?: RequestInit, key?: string) => Promise<any>;
  abortRequest: (key?: string) => void;
  abortAll: () => void;
}

export function useSafeFetch(): UseSafeFetchReturn {
  // Track all active controllers with timestamps
  const controllers = useRef<Map<string, FetchState>>(new Map());
  // Track component mount status
  const isMounted = useRef(true);
  // Track fetch operations to prevent race conditions
  const fetchTimestamps = useRef<Map<string, number>>(new Map());

  // Initialize on component mount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      // Cleanup on unmount
      isMounted.current = false;
      abortAllSilently();
    };
  }, []);

  // Abort all requests silently
  const abortAllSilently = useCallback(() => {
    try {
      controllers.current.forEach((state) => {
        try {
          if (state.controller && !state.controller.signal.aborted) {
            state.controller.abort('Request aborted by useSafeFetch cleanup');
          }
        } catch (e) {
          // Silent ignore - don't let abort errors propagate
        }
      });
      controllers.current.clear();
      fetchTimestamps.current.clear();
    } catch (e) {
      // Silent ignore - don't let cleanup errors propagate
    }
  }, []);

  // Abort specific request silently
  const abortRequestSilently = useCallback((key: string = 'default') => {
    try {
      if (controllers.current.has(key)) {
        const state = controllers.current.get(key);
        if (state && state.controller && !state.controller.signal.aborted) {
          state.controller.abort('Request aborted by useSafeFetch cleanup');
        }
        controllers.current.delete(key);
        fetchTimestamps.current.delete(key);
      }
    } catch (e) {
      // Silent ignore - don't let abort errors propagate
    }
  }, []);

  // Public method to abort specific request
  const abortRequest = useCallback((key: string = 'default') => {
    abortRequestSilently(key);
  }, [abortRequestSilently]);

  // Public method to abort all requests
  const abortAll = useCallback(() => {
    abortAllSilently();
  }, [abortAllSilently]);

  // Main fetch function with race condition protection
  const safeFetch = useCallback(
    async (url: string, options: RequestInit = {}, key: string = 'default') => {
      // Early exit if component is not mounted
      if (!isMounted.current) {
        return null;
      }

      // Abort any existing request with the same key
      abortRequestSilently(key);

      // Create new controller and track it
      const controller = new AbortController();
      const timestamp = Date.now();
      
      controllers.current.set(key, { controller, timestamp, key });
      fetchTimestamps.current.set(key, timestamp);

      // Merge signals if provided
      const signal = controller.signal;
      const finalOptions = { ...options, signal };

      try {
        // Perform fetch
        const response = await fetch(url, finalOptions);

        // Check if component is still mounted and this is the latest request
        const currentTimestamp = fetchTimestamps.current.get(key);
        if (!isMounted.current || currentTimestamp !== timestamp) {
          return null; // Stale request, ignore result
        }

        // Check response status
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON
        const data = await response.json();
        
        // Final check before returning
        if (!isMounted.current) {
          return null;
        }

        return data;
      } catch (error: any) {
        // Always handle AbortError silently, regardless of whether it's the latest request
        if (error.name === 'AbortError') {
          return null; // Expected behavior, don't propagate
        }

        // Check if this is the latest request for this key
        const currentTimestamp = fetchTimestamps.current.get(key);
        const isLatest = currentTimestamp === timestamp;

        // If component is not mounted or this isn't the latest request, silently ignore
        if (!isMounted.current || !isLatest) {
          return null;
        }

        // For all other errors, re-throw if component is still mounted and it's the latest request
        throw error;
      } finally {
        // Clean up if this is still the active request
        const currentTimestamp = fetchTimestamps.current.get(key);
        if (currentTimestamp === timestamp) {
          controllers.current.delete(key);
          fetchTimestamps.current.delete(key);
        }
      }
    },
    [abortRequestSilently]
  );

  return { safeFetch, abortRequest, abortAll };
}