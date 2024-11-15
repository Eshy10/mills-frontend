import L from 'leaflet';
import MillIcon from '../assets/svgs/MillIcon.svg';
import ActiveIcon from '../assets/svgs/ActiveIcon.svg';
import InactiveIcon from '../assets/svgs/InactiveIcon.svg';
import LocationIcon from '../assets/svgs/AddLocationIcon.svg';

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

export const addLocationIcon = L.icon({
  iconUrl: LocationIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});
