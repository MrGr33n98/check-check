// UTM Tracking Utility for Promotional Banners

export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface TrackingEvent {
  event_type: 'impression' | 'click';
  banner_id: number;
  banner_title: string;
  provider_name?: string;
  url?: string;
  utm_parameters?: UTMParameters;
  timestamp: string;
  user_agent: string;
  referrer: string;
  session_id?: string;
}

class UTMTracker {
  private static instance: UTMTracker;
  private events: TrackingEvent[] = [];
  private sessionId: string;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.setupBeforeUnloadHandler();
  }

  public static getInstance(): UTMTracker {
    if (!UTMTracker.instance) {
      UTMTracker.instance = new UTMTracker();
    }
    return UTMTracker.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupBeforeUnloadHandler(): void {
    window.addEventListener('beforeunload', () => {
      this.flushEvents();
    });
  }

  /**
   * Build URL with UTM parameters
   */
  public buildUTMUrl(baseUrl: string, utmParams: UTMParameters): string {
    try {
      const url = new URL(baseUrl);
      
      // Add UTM parameters to URL
      Object.entries(utmParams).forEach(([key, value]) => {
        if (value && value.trim()) {
          url.searchParams.set(key, value.trim());
        }
      });

      return url.toString();
    } catch (error) {
      console.error('Error building UTM URL:', error);
      return baseUrl;
    }
  }

  /**
   * Track banner impression
   */
  public trackImpression(bannerId: number, bannerTitle: string, providerName?: string, utmParams?: UTMParameters): void {
    const event: TrackingEvent = {
      event_type: 'impression',
      banner_id: bannerId,
      banner_title: bannerTitle,
      provider_name: providerName,
      utm_parameters: utmParams,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      session_id: this.sessionId
    };

    this.events.push(event);
    this.sendEvent(event);

    // Log for debugging
    console.log('UTM Impression tracked:', event);
  }

  /**
   * Track banner click
   */
  public trackClick(bannerId: number, bannerTitle: string, url: string, providerName?: string, utmParams?: UTMParameters): void {
    const event: TrackingEvent = {
      event_type: 'click',
      banner_id: bannerId,
      banner_title: bannerTitle,
      provider_name: providerName,
      url: url,
      utm_parameters: utmParams,
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      referrer: document.referrer,
      session_id: this.sessionId
    };

    this.events.push(event);
    this.sendEvent(event);

    // Log for debugging
    console.log('UTM Click tracked:', event);
  }

  /**
   * Send tracking event to analytics endpoint
   */
  private async sendEvent(event: TrackingEvent): Promise<void> {
    try {
      await fetch('/api/v1/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'promotional_banner_tracking',
          data: event
        })
      });
    } catch (error) {
      console.error('Error sending tracking event:', error);
      // Store failed events for retry
      this.storeFailedEvent(event);
    }
  }

  /**
   * Store failed events in localStorage for retry
   */
  private storeFailedEvent(event: TrackingEvent): void {
    try {
      const failedEvents = JSON.parse(localStorage.getItem('failed_utm_events') || '[]');
      failedEvents.push(event);
      
      // Keep only last 50 failed events
      if (failedEvents.length > 50) {
        failedEvents.splice(0, failedEvents.length - 50);
      }
      
      localStorage.setItem('failed_utm_events', JSON.stringify(failedEvents));
    } catch (error) {
      console.error('Error storing failed event:', error);
    }
  }

  /**
   * Retry failed events
   */
  public async retryFailedEvents(): Promise<void> {
    try {
      const failedEvents = JSON.parse(localStorage.getItem('failed_utm_events') || '[]');
      
      if (failedEvents.length === 0) return;

      const retryPromises = failedEvents.map((event: TrackingEvent) => this.sendEvent(event));
      await Promise.allSettled(retryPromises);

      // Clear failed events after retry
      localStorage.removeItem('failed_utm_events');
    } catch (error) {
      console.error('Error retrying failed events:', error);
    }
  }

  /**
   * Flush all pending events
   */
  public flushEvents(): void {
    if (this.events.length === 0) return;

    // Use sendBeacon for reliable delivery during page unload
    if (navigator.sendBeacon) {
      const payload = JSON.stringify({
        event_type: 'promotional_banner_batch',
        data: this.events
      });
      
      navigator.sendBeacon('/api/v1/analytics', payload);
    }

    this.events = [];
  }

  /**
   * Get current session analytics
   */
  public getSessionAnalytics(): {
    session_id: string;
    events_count: number;
    impressions: number;
    clicks: number;
    ctr: number;
  } {
    const impressions = this.events.filter(e => e.event_type === 'impression').length;
    const clicks = this.events.filter(e => e.event_type === 'click').length;
    const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;

    return {
      session_id: this.sessionId,
      events_count: this.events.length,
      impressions,
      clicks,
      ctr: Math.round(ctr * 100) / 100
    };
  }

  /**
   * Extract UTM parameters from current URL
   */
  public static extractUTMFromURL(url: string = window.location.href): UTMParameters {
    try {
      const urlObj = new URL(url);
      const params = urlObj.searchParams;

      return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined
      };
    } catch (error) {
      console.error('Error extracting UTM parameters:', error);
      return {};
    }
  }

  /**
   * Validate UTM parameters
   */
  public static validateUTMParams(params: UTMParameters): boolean {
    const requiredParams = ['utm_source', 'utm_medium', 'utm_campaign'];
    return requiredParams.some(param => params[param as keyof UTMParameters]);
  }
}

// Export singleton instance
export const utmTracker = UTMTracker.getInstance();

// Export utility functions
export const {
  buildUTMUrl: buildUTMUrl,
  trackImpression: trackImpression,
  trackClick: trackClick,
  retryFailedEvents: retryFailedEvents,
  getSessionAnalytics: getSessionAnalytics
} = utmTracker;

export { UTMTracker };

// Auto-retry failed events on page load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    utmTracker.retryFailedEvents();
  });
}