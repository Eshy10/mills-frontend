import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Dumpsite } from '../types';
import TextInput from './TextInput';

interface DumpsiteFormProps {
  onDumpsiteAdded: (dumpsite: Dumpsite) => void;
  newDumpsiteLocation: { latitude: number; longitude: number } | null;
}

const DumpsiteForm: React.FC<DumpsiteFormProps> = ({
  onDumpsiteAdded,
  newDumpsiteLocation,
}) => {
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
    try {
      const response = await axios.post('/api/dumpsites', data);
      const savedDumpsite = response.data;
      onDumpsiteAdded(savedDumpsite);
      reset();
    } catch (error) {
      console.error(error);
      const message = 'An error occurred while saving the dumpsite.';
      toast.error(message, { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (newDumpsiteLocation) {
      setValue('latitude', newDumpsiteLocation.latitude);
      setValue('longitude', newDumpsiteLocation.longitude);
    }
  }, [newDumpsiteLocation, setValue]);

  return (
    <div className="w-full md:w-1/3 p-6 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Dumpsites</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-bold text-lg mb-2">Add a New Dumpsite</h3>
        <TextInput
          label="Latitude"
          type="number"
          placeholder="Enter latitude"
          register={register('latitude', {
            required: 'Latitude is required',
            valueAsNumber: true,
          })}
          error={errors.latitude}
        />

        <TextInput
          label="Longitude"
          type="number"
          placeholder="Enter longitude"
          register={register('longitude', {
            required: 'Longitude is required',
            valueAsNumber: true,
          })}
          error={errors.longitude}
        />

        <TextInput
          label="Capacity (tons)"
          type="number"
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

        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          Add Dumpsite
        </button>
      </form>
    </div>
  );
};

export default DumpsiteForm;
