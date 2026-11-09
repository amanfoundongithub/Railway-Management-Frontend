import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchFormContext = createContext();

export const useSearchForm = () => useContext(SearchFormContext);

export const SearchFormProvider = ({ children }) => {
  const navigate = useNavigate();

  // 1. Manage State natively
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    date: '2026-11-10', // Default date
    travelClass: 'All Classes',
    quota: 'General',
    isFlexible: false,
    availableOnly: false,
  });

  const [errors, setErrors] = useState({});

  // 2. Generic change handler for all inputs
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear the error for this field as the user types
    if (errors[field] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: null, general: null }));
    }
  };

  // 3. Native Validation Logic
  const validate = () => {
    const newErrors = {};
    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.destination) newErrors.destination = "Destination is required";
    if (!formData.date) newErrors.date = "Date is required";
    
    if (formData.source && formData.destination && formData.source === formData.destination) {
      newErrors.general = "Source and Destination cannot be the same.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // 4. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const params = new URLSearchParams({
        src: formData.source,
        dst: formData.destination,
        date: formData.date,
        cls: formData.travelClass,
        qta: formData.quota
      }).toString();
      
      navigate(`/search-results?${params}`);
    }
  };

  return (
    <SearchFormContext.Provider value={{ formData, errors, handleChange, handleSubmit }}>
      {children}
    </SearchFormContext.Provider>
  );
};