import React from 'react';
import { AuthSplitLayout } from './layout/AuthSplitLayout';
import { RegistrationForm } from './components/RegistrationForm';

export const RegisterPage = () => {
  return (
    <AuthSplitLayout 
      title = "Welcome, member!" 
      subtitle = "Enter your details to get started!"
    >
      <RegistrationForm />
    </AuthSplitLayout>
  );
};