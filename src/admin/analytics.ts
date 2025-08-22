// Analytics utility for the admin module

export type EventType = 
  | 'PAGE_VIEW'
  | 'BUTTON_CLICK'
  | 'FORM_SUBMIT'
  | 'FILTER_APPLY'
  | 'SEARCH'
  | 'EXPORT'
  | 'IMPORT'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'ERROR';

export interface EventData {
  type: EventType;
  module?: string;
  action?: string;
  element?: string;
  value?: string | number;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  referrer?: string;
  screenResolution?: string;
}

export class Analytics {
  private events: EventData[] = [];
  private userId: string | null = null;
  private sessionId: string | null = null;

  constructor() {
    // Generate a session ID
    this.sessionId = this.generateSessionId();
    
    // Listen for page views
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        this.trackPageView();
      });
    }
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  track(event: Omit<EventData, 'timestamp' | 'userId' | 'sessionId'>): void {
    const eventData: EventData = {
      ...event,
      timestamp: Date.now(),
      userId: this.userId || undefined,
      sessionId: this.sessionId || undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof window !== 'undefined' ? document.referrer : undefined,
      screenResolution: typeof window !== 'undefined' ? `${screen.width}x${screen.height}` : undefined,
    };

    this.events.push(eventData);
    
    // In a real app, this would send the event to an analytics service
    console.log('Analytics Event:', eventData);
    
    // Example sending to Google Analytics:
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', event.type, {
    //     event_category: event.module,
    //     event_label: event.element,
    //     value: event.value,
    //   });
    // }
  }

  trackPageView(): void {
    this.track({
      type: 'PAGE_VIEW',
    });
  }

  trackButtonClick(module: string, element: string): void {
    this.track({
      type: 'BUTTON_CLICK',
      module,
      element,
    });
  }

  trackFormSubmit(module: string, formName: string): void {
    this.track({
      type: 'FORM_SUBMIT',
      module,
      element: formName,
    });
  }

  trackFilterApply(module: string, filters: Record<string, any>): void {
    this.track({
      type: 'FILTER_APPLY',
      module,
      value: JSON.stringify(filters),
    });
  }

  trackSearch(module: string, query: string): void {
    this.track({
      type: 'SEARCH',
      module,
      value: query,
    });
  }

  trackExport(module: string, format: string): void {
    this.track({
      type: 'EXPORT',
      module,
      value: format,
    });
  }

  trackImport(module: string, format: string): void {
    this.track({
      type: 'IMPORT',
      module,
      value: format,
    });
  }

  trackError(module: string, error: string): void {
    this.track({
      type: 'ERROR',
      module,
      value: error,
    });
  }

  getEvents(): EventData[] {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

// Create a singleton instance
export const analytics = new Analytics();