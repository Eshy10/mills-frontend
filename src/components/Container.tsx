import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mill, Dumpsite } from '../types';
import MapWrapper from './MapContainer';
import DumpsiteForm from './DumpsiteForm';
import 'leaflet/dist/leaflet.css';

const MainContainer: React.FC = () => {
  const [mills, setMills] = useState<Mill[]>([]);
  const [dumpsites, setDumpsites] = useState<Dumpsite[]>([]);
  const [newDumpsiteLocation, setNewDumpsiteLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [millsRes, dumpsitesRes] = await Promise.all([
          axios.get('/api/mills'),
          axios.get('/api/dumpsites'),
        ]);
        setMills(millsRes.data);
        setDumpsites(dumpsitesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        const message = 'An error occurred while saving the dumpsite.';
        toast.error(message, { autoClose: 2000 });
      }
    };
    fetchData();
  }, []);

  const handleDumpsiteAdded = (newDumpsite: Dumpsite) => {
    setDumpsites((prevDumpsites) => [...prevDumpsites, newDumpsite]);
  };
  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="lg:w-2/3 w-full h-64 lg:h-full">
        <MapWrapper
          mills={mills}
          dumpsites={dumpsites}
          setNewDumpsiteLocation={setNewDumpsiteLocation}
        />
      </div>
      <div className="lg:w-1/3 w-full p-5 mt-[5rem] lg:mt-0">
        <DumpsiteForm
          onDumpsiteAdded={handleDumpsiteAdded}
          newDumpsiteLocation={newDumpsiteLocation}
        />
      </div>
    </div>
  );
};

export default MainContainer;
