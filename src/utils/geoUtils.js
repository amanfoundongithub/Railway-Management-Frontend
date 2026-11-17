const deg2rad = (deg) => deg * (Math.PI / 180);

export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Multiply straight-line distance by 1.3x to approximate city road routing
  const roadDistance = R * c * 1.3;
  return Math.max(1, Math.round(roadDistance * 10) / 10); // Minimum 1 km
};

export const calculateCabFare = (baseFare, pricePerKm, distanceKm) => {
  if (!distanceKm || distanceKm <= 0) return baseFare;
  return Math.round(baseFare + pricePerKm * distanceKm);
};