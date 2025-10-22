export const logEvent = (eventName: string, params: Record<string, any> = {}) => {
  if (typeof window === "undefined") return;
  // @ts-ignore - gtag may not be on window until GA script loads
  if (window.gtag) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gtag("event", eventName, params);
  }
};
