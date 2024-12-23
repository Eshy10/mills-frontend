import React from 'react';
import {
  millIcon,
  activeDumpsiteIcon,
  inactiveDumpsiteIcon,
} from '../utils/LeafletIconUtils';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Dumpsite, Mill } from 'types';

// Set default position to Uyo
const defaultPosition: [number, number] = [5.0376, 7.9128];

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

// set color by last transaction
const MapWrapper = ({ mills, dumpsites, setNewDumpsiteLocation }: MapWrapperProps) => {
  const getColorByDate = (lastTransactionDate: Date) => {
    const daysAgo =
      (new Date().getTime() - new Date(lastTransactionDate).getTime()) /
      (1000 * 60 * 60 * 24);
    if (daysAgo <= 7) return 'green';
    if (daysAgo <= 14) return 'yellow';
    return 'red';
  };

  // Handler enables setting the latitude and longitude just by users interaction
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

  return (
    <MapContainer
      center={defaultPosition}
      zoom={10}
      style={{ height: '100%', minHeight: '20rem', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {mills &&
        mills?.map((mill) => (
          <Marker
            key={mill?.id}
            position={[mill?.latitude, mill?.longitude]}
            icon={millIcon}
          >
            <Popup>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-green-600">Mill Details</h3>
                <p>Quantity Sold: {mill?.p1Amount ?? 'N/A'} tons</p>
                <p>Average Price per Ton: ${mill?.p1PriceTon ?? 'N/A'}</p>
                <p>Transaction Count: {mill?.numTransactions ?? 'N/A'}</p>
                <p>
                  Last Transaction Date:{' '}
                  {mill?.lastTransactionDate
                    ? new Date(mill?.lastTransactionDate)?.toLocaleDateString()
                    : 'N/A'}
                </p>
                <div
                  className={`w-3 h-3 rounded-full mt-2`}
                  style={{ backgroundColor: getColorByDate(mill?.lastTransactionDate) }}
                ></div>
              </div>
            </Popup>
          </Marker>
        ))}
      {dumpsites &&
        dumpsites?.map((dumpsite) => (
          <Marker
            key={dumpsite?._id}
            position={[
              dumpsite?.location.coordinates[1], // latitude
              dumpsite?.location.coordinates[0], // longitude
            ]}
            icon={
              dumpsite?.status === 'active' ? activeDumpsiteIcon : inactiveDumpsiteIcon
            }
          >
            <Popup>
              <h3 className="font-bold">Dumpsite Details</h3>
              <p>Capacity: {dumpsite?.capacity ?? 'N/A'} tons</p>
              <p>Status: {dumpsite?.status}</p>
            </Popup>
          </Marker>
        ))}
      <MapClickHandler setNewDumpsiteLocation={setNewDumpsiteLocation} />
    </MapContainer>
  );
};

export default MapWrapper;
