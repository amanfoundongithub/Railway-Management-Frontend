import { useState } from 'react';

export const useMasterList = () => {
  // Mocking an initial fetch from an API/Database
  const [savedPassengers, setSavedPassengers] = useState([
    { id: 'm1', name: 'Aman Raj', age: 26, gender: 'Male', idType: 'Aadhar', idNumber: 'XXXX-XXXX-1234' },
    { id: 'm2', name: 'John Doe', age: 28, gender: 'Male', idType: 'PAN', idNumber: 'ABCDE1234F' }
  ]);

  const addSavedPassenger = (passenger) => {
    setSavedPassengers([...savedPassengers, { ...passenger, id: `m${Date.now()}` }]);
  };

  const deleteSavedPassenger = (id) => {
    setSavedPassengers(savedPassengers.filter(p => p.id !== id));
  };

  return { savedPassengers, addSavedPassenger, deleteSavedPassenger };
};