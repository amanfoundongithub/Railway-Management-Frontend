import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  // 1. The train the user selected from the search results
  const [selectedTrain, setSelectedTrain] = useState(null);
  
  // 2. The class they clicked on (e.g., "3A", "SL")
  const [selectedClass, setSelectedClass] = useState(null);

  // 3. The passengers they add on the booking page
  const [passengers, setPassengers] = useState([]);

  // 4. The final calculated transaction amount
  const [transactionAmount, setTransactionAmount] = useState(0);

  // 5. The PNR generated after successful payment
  const [finalPnr, setFinalPnr] = useState(null);

  // Helper to clear the state after a successful booking or if they cancel
  const resetBookingFlow = () => {
    setSelectedTrain(null);
    setSelectedClass(null);
    setPassengers([]);
    setTransactionAmount(0);
    setFinalPnr(null);
  };

  return (
    <BookingContext.Provider value={{
      selectedTrain, setSelectedTrain,
      selectedClass, setSelectedClass,
      passengers, setPassengers,
      transactionAmount, setTransactionAmount,
      finalPnr, setFinalPnr,
      resetBookingFlow
    }}>
      {children}
    </BookingContext.Provider>
  );
};