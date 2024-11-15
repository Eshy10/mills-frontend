import L from 'leaflet';
import { MillIcon, ActiveIcon, InactiveIcon } from 'assets/svgs';

export const millIcon = L.icon({
  iconUrl: MillIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const activeDumpsiteIcon = L.icon({
  iconUrl: ActiveIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export const inactiveDumpsiteIcon = L.icon({
  iconUrl: InactiveIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// export const addLocationIcon = L.icon({
//   iconUrl: LocationIcon,
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
// });
