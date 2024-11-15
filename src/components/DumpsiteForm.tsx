import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Dumpsite } from '../types';
import TextInput from './TextInput';
import { LoadingIcon } from 'assets/svgs';

interface DumpsiteFormProps {
  onDumpsiteAdded: (dumpsite: Dumpsite) => void;
  newDumpsiteLocation: { latitude: number; longitude: number } | null;
}

const DumpsiteForm: React.FC<DumpsiteFormProps> = ({
  onDumpsiteAdded,
  newDumpsiteLocation,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Dumpsite>({
    defaultValues: {
      latitude: undefined,
      longitude: undefined,
      capacity: undefined,
      status: 'active',
    },
  });

  const onSubmit = async (data: Dumpsite) => {
    setLoading(true);

    const payload = {
      ...data,
      latitude: parseFloat(data.latitude as unknown as string),
      longitude: parseFloat(data.longitude as unknown as string),
      capacity: parseInt(data.capacity as unknown as string, 10),
    };

    try {
      const response = await axios.post('/api/dumpsites', payload);
      const savedDumpsite = response.data;
      onDumpsiteAdded(savedDumpsite);
      toast.success('Dumpsite Added!');
      reset();
    } catch (error) {
      console.error(error);
      const message = 'An error occurred while saving the dumpsite.';
      toast.error(message, { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  // Set latitude and longitude value on the form when a user interact with the map
  useEffect(() => {
    if (newDumpsiteLocation) {
      setValue('latitude', newDumpsiteLocation.latitude);
      setValue('longitude', newDumpsiteLocation.longitude);
    }
  }, [newDumpsiteLocation, setValue]);

  return (
    <div className="w-full p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Dumpsites</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-bold text-lg mb-2">Add a New Dumpsite</h3>
        <TextInput
          label="Latitude"
          type="text"
          placeholder="Enter latitude"
          register={register('latitude', {
            required: 'Latitude is required',
            valueAsNumber: true,
            min: { value: -90, message: 'Latitude must be between -90 and 90' },
            max: { value: 90, message: 'Latitude must be between -90 and 90' },
          })}
          error={errors.latitude}
        />

        <TextInput
          label="Longitude"
          type="text"
          placeholder="Enter longitude"
          register={register('longitude', {
            required: 'Longitude is required',
            valueAsNumber: true,
            min: { value: -180, message: 'Latitude must be between -180 and 180' },
            max: { value: 180, message: 'Latitude must be between -180 and 180' },
          })}
          error={errors.longitude}
        />

        <TextInput
          label="Capacity (tons)"
          type="text"
          placeholder="Enter capacity"
          register={register('capacity', {
            required: 'Capacity is required',
            valueAsNumber: true,
          })}
          error={errors.capacity}
        />

        <div>
          <label>Status:</label>
          <select {...register('status')} className="border p-2 rounded w-full">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded"
          disabled={loading}
        >
          {loading ? (
            <img src={LoadingIcon} alt="Loading..." className="w-5 h-5 loading-icon" />
          ) : (
            'Add Dumpsite'
          )}
        </button>
      </form>
    </div>
  );
};

export default DumpsiteForm;
