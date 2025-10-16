export const trackWebEngageEvent = (eventName, params = {}) => {
    try {
      if (window.webengage && typeof window.webengage.track === "function") {
        window.webengage.track(eventName, params);
        console.log(`WebEngage Event Tracked: ${eventName}`, params);
      } else {
        console.warn("WebEngage not available");
      }
    } catch (error) {
      console.error("Error tracking WebEngage event:", error);
    }
  };
  
  