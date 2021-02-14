import GTagEvent from "app/types/gTagEvent";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window?.gtag("config", String(process.env.NEXT_PUBLIC_GA_TRACKING_ID), {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window?.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
