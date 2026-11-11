import React from 'react';
import { AuthSplitLayout } from '../../../widgets/auth-layout/ui/AuthSplitLayout';
import { RegistrationForm } from '../../../features/authentication/ui/RegistrationForm';

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