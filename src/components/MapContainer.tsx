import React from 'react';
import {
  millIcon,
  activeDumpsiteIcon,
  inactiveDumpsiteIcon,
} from '../utils/LeafletIconUtils';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Dumpsite, Mill } from 'types';

const defaultPosition: [number, number] = [6.5244, 3.3792];

interface MapWrapperProps {
  mills: Mill[];
  dumpsites: Dumpsite[];
  setNewDumpsiteLocation: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
    } | null>
  >;
}

const MapWrapper = ({ mills, dumpsites, setNewDumpsiteLocation }: MapWrapperProps) => {
  const getColorByDate = (lastTransactionDate: Date) => {
    const daysAgo =
      (new Date().getTime() - new Date(lastTransactionDate).getTime()) /
      (1000 * 60 * 60 * 24);
    if (daysAgo <= 7) return 'green';
    if (daysAgo <= 14) return 'yellow';
    return 'red';
  };

  const MapClickHandler: React.FC<{
    setNewDumpsiteLocation: (location: { latitude: number; longitude: number }) => void;
  }> = ({ setNewDumpsiteLocation }) => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setNewDumpsiteLocation({ latitude: lat, longitude: lng });
      },
    });

    return null;
  };
  console.log(mills, dumpsites, 'hey dude');
  return (
    <MapContainer
      center={defaultPosition}
      zoom={10}
      style={{ height: '100vh', width: '70%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {mills.map((mill) => (
        <Marker key={mill.id} position={[mill.latitude, mill.longitude]} icon={millIcon}>
          <Popup>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-green-600">Mill Details</h3>
              <p>Quantity Sold: {mill.p1Amount ?? 'N/A'} tons</p>
              <p>Average Price per Ton: ${mill.p1PriceTon ?? 'N/A'}</p>
              <p>Transaction Count: {mill.numTransactions ?? 'N/A'}</p>
              <p>
                Last Transaction Date:{' '}
                {mill.lastTransactionDate
                  ? new Date(mill.lastTransactionDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <div
                className={`w-3 h-3 rounded-full mt-2`}
                style={{ backgroundColor: getColorByDate(mill.lastTransactionDate) }}
              ></div>
            </div>
          </Popup>
        </Marker>
      ))}
      {dumpsites.map((dumpsite) => (
        <Marker
          key={dumpsite.id}
          position={[dumpsite.latitude, dumpsite.longitude]}
          icon={dumpsite.status === 'active' ? activeDumpsiteIcon : inactiveDumpsiteIcon}
        >
          <Popup>
            <h3 className="font-bold">Dumpsite Details</h3>
            <p>Capacity: {dumpsite.capacity ?? 'N/A'} tons</p>
            <p>Status: {dumpsite.status}</p>
          </Popup>
        </Marker>
      ))}
      <MapClickHandler setNewDumpsiteLocation={setNewDumpsiteLocation} />
    </MapContainer>
  );
};

export default MapWrapper;
