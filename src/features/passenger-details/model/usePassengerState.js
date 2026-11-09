import { useState } from 'react';

export const usePassengerState = () => {
  const [passengers, setPassengers] = useState([
    { id: 1, name: '', age: '', gender: '', berth: 'No Preference' }
  ]);

  const addPassenger = () => {
    if (passengers.length >= 6) {
      alert("Maximum 6 passengers allowed per ticket.");
      return;
    }
    setPassengers([
      ...passengers, 
      { id: Date.now(), name: '', age: '', gender: '', berth: 'No Preference' }
    ]);
  };

  const removePassenger = (id) => {
    if (passengers.length === 1) return; // Must have at least 1 passenger
    setPassengers(passengers.filter(p => p.id !== id));
  };

  const updatePassenger = (id, field, value) => {
    setPassengers(passengers.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  return { passengers, addPassenger, removePassenger, updatePassenger };
};