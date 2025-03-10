
// Function to generate LocalBusiness schema
export const generateLocalBusinessSchema = (locations: Array<{
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  telephone: string;
  latitude?: number;
  longitude?: number;
}>) => {
  return locations.map(location => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `AdvisorWiz - ${location.name}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.address,
      "addressLocality": location.city,
      "addressRegion": location.state,
      "postalCode": location.postalCode,
      "addressCountry": "US"
    },
    "telephone": location.telephone,
    "url": "https://advisorwiz.com",
    ...(location.latitude && location.longitude ? {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": location.latitude,
        "longitude": location.longitude
      }
    } : {})
  }));
};
