export const parseApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'An error occurred on the server. Please try again.';
  } 
  if (error.request) {
    return 'Unable to connect to the server. Please check if the backend is running.';
  } 
  return error.message || 'An unexpected error occurred. Please try again.';
};