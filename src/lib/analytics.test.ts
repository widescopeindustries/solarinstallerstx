import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logEvent, trackPremierInstallerLead } from './analytics';

describe('analytics utilities', () => {
  beforeEach(() => {
    // Mock window.gtag
    global.window = {
      gtag: vi.fn(),
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('logEvent', () => {
    it('should call gtag with correct event name and parameters', () => {
      const eventName = 'test_event';
      const params = { param1: 'value1', param2: 'value2' };

      logEvent(eventName, params);

      expect(window.gtag).toHaveBeenCalledWith('event', eventName, params);
      expect(window.gtag).toHaveBeenCalledTimes(1);
    });

    it('should call gtag with empty params when none provided', () => {
      const eventName = 'simple_event';

      logEvent(eventName);

      expect(window.gtag).toHaveBeenCalledWith('event', eventName, {});
      expect(window.gtag).toHaveBeenCalledTimes(1);
    });

    it('should not throw error when gtag is not defined', () => {
      delete (window as any).gtag;

      expect(() => {
        logEvent('test_event', { param: 'value' });
      }).not.toThrow();
    });

    it('should handle complex parameter objects', () => {
      const eventName = 'complex_event';
      const params = {
        currency: 'USD',
        value: 100,
        items: ['item1', 'item2'],
        metadata: { key: 'value' },
      };

      logEvent(eventName, params);

      expect(window.gtag).toHaveBeenCalledWith('event', eventName, params);
    });
  });

  describe('trackPremierInstallerLead', () => {
    it('should track email_click lead with correct parameters', () => {
      const leadType = 'email_click';
      const location = 'homepage';

      trackPremierInstallerLead(leadType, location);

      // Should call gtag twice - once for generate_lead, once for conversion
      expect(window.gtag).toHaveBeenCalledTimes(2);

      // First call - generate_lead
      expect(window.gtag).toHaveBeenNthCalledWith(1, 'event', 'generate_lead', {
        currency: 'USD',
        value: 500,
        lead_type: 'premier_installer',
        contact_method: 'email_click',
        location: location,
        business_type: 'B2B',
        send_to: ['G-3RWQE8Q06E', 'G-5NXSKV8T'],
      });

      // Second call - conversion
      expect(window.gtag).toHaveBeenNthCalledWith(2, 'event', 'conversion', {
        send_to: ['G-3RWQE8Q06E/premier_installer_lead', 'G-5NXSKV8T/premier_installer_lead'],
        value: 500,
        currency: 'USD',
      });
    });

    it('should track button_click lead with correct parameters', () => {
      const leadType = 'button_click';
      const location = 'installer_profile';

      trackPremierInstallerLead(leadType, location);

      expect(window.gtag).toHaveBeenCalledTimes(2);

      // Check generate_lead event
      expect(window.gtag).toHaveBeenNthCalledWith(1, 'event', 'generate_lead',
        expect.objectContaining({
          contact_method: 'button_click',
          location: 'installer_profile',
          value: 500,
        })
      );
    });

    it('should set lead value to 500', () => {
      trackPremierInstallerLead('email_click', 'test_location');

      const firstCall = (window.gtag as any).mock.calls[0];
      expect(firstCall[2].value).toBe(500);

      const secondCall = (window.gtag as any).mock.calls[1];
      expect(secondCall[2].value).toBe(500);
    });

    it('should track to both GA properties', () => {
      trackPremierInstallerLead('email_click', 'test');

      const generateLeadCall = (window.gtag as any).mock.calls[0];
      expect(generateLeadCall[2].send_to).toEqual(['G-3RWQE8Q06E', 'G-5NXSKV8T']);

      const conversionCall = (window.gtag as any).mock.calls[1];
      expect(conversionCall[2].send_to).toEqual([
        'G-3RWQE8Q06E/premier_installer_lead',
        'G-5NXSKV8T/premier_installer_lead'
      ]);
    });

    it('should not throw when gtag is undefined', () => {
      delete (window as any).gtag;

      expect(() => {
        trackPremierInstallerLead('email_click', 'test');
      }).not.toThrow();
    });
  });
});
