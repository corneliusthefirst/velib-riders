// check if user is logged in
const isLoggedIn = () => {
  // get token from local storage
  const token = JSON.parse(localStorage.getItem('authToken') || '{}');

  if (Object.keys(token).length > 0) {
    return true;
  }
  return false;
};

const getDistance = (
  lat: number = 0,
  lng: number = 0,
  lat2: number = 0,
  lon2: number = 0,
) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat) * (Math.PI / 180);
  const dLon = (lon2 - lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  // to 1 decimal place
  return Math.round(distance * 10) / 10;
};

export {isLoggedIn, getDistance};
