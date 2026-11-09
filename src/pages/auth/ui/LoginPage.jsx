import React from 'react';
import { AuthSplitLayout } from '../../../widgets/auth-layout/ui/AuthSplitLayout';
import { LoginForm } from '../../../features/authentication/ui/LoginForm';

export const LoginPage = () => {
  return (
    <AuthSplitLayout 
      title="Welcome Back" 
      subtitle="Enter your credentials to access your account."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
};