import { useState } from 'react';

export const usePassengerState = () => {
  // Start with one empty passenger slot by default
  const [passengers, setPassengers] = useState([
    { id: Date.now(), name: '', age: '', gender: '', berth: 'No Preference' }
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

  // NEW: Bulk import from Master List
  const importFromMasterList = (importedPassengers) => {
    const formattedImports = importedPassengers.map(p => ({
      id: Date.now() + Math.random(), // generate unique ID for this form instance
      name: p.name,
      age: p.age,
      gender: p.gender,
      berth: 'No Preference' // default
    }));

    // If the default first row is completely empty, overwrite it. Otherwise, append.
    const firstRowEmpty = passengers.length === 1 && passengers[0].name === '' && passengers[0].age === '';
    
    if (firstRowEmpty) {
      setPassengers([...formattedImports]);
    } else {
      setPassengers([...passengers, ...formattedImports]);
    }
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;
    setPassengers(passengers.filter((_, passengerIndex) => passengerIndex !== index));
  };

  const updatePassenger = (index, field, value) => {
    setPassengers(passengers.map((passenger, passengerIndex) =>
      passengerIndex === index ? { ...passenger, [field]: value } : passenger
    ));
  };

  const appendPassengers = (newPassengers) => {
    setPassengers((prev) => [...prev, ...newPassengers]);
  };

  return { 
    passengers, 
    addPassenger, 
    removePassenger, 
    updatePassenger, 
    importFromMasterList, // Export the new function
    appendPassengers
  };
};