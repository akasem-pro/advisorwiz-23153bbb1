
import { initializeMetaPixel, trackMetaPixelEvent, trackMetaPixelCustomEvent } from './metaPixel';

// Facebook Meta Tag is now the same as Meta Pixel, just re-exporting with a clearer name
export { initializeMetaPixel as initializeFacebookTag };
export { trackMetaPixelEvent as trackFacebookEvent };
export { trackMetaPixelCustomEvent as trackFacebookCustomEvent };
