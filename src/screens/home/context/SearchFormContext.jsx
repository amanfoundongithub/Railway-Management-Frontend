import {
  createContext,
  useContext,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchFormContext = createContext();

export const useSearchForm = () => useContext(SearchFormContext);


export const SearchFormProvider = ({ children }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    source: null,
    destination: null,
    date: new Date().toISOString().split('T')[0],
    travelClass: 'All Classes',
    quota: 'General',
    isFlexible: false,
    availableOnly: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || errors.general) {
      setErrors((prev) => ({ ...prev, [field]: null, general: null }));
    }
  };

  const setFromStation = (station) => {
    handleChange("source", station);
  };

  const setToStation = (station) => {
    handleChange("destination", station);
  };


  const validate = () => {
    const newErrors = {};
    if (!formData.source) newErrors.source = "Source is required";
    if (!formData.destination) newErrors.destination = "Destination is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (
      formData.source &&
      formData.destination &&
      (formData.source.stationCode === formData.destination.stationCode)
    ) {
      newErrors.general = "Source and Destination cannot be the same.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const params = new URLSearchParams({
        src: formData.source.stationCode,
        dst: formData.destination.stationCode,
        date: formData.date,
        cls: formData.travelClass,
        qta: formData.quota
      }).toString();
      navigate(`/search-results?${params}`);
    }
  };

  return (
    <SearchFormContext.Provider
      value={{
        formData,
        errors,
        handleChange,
        handleSubmit,
        setFromStation,
        setToStation
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
};