import React from 'react';
import { AuthSplitLayout } from './layout/AuthSplitLayout';
import { LoginForm } from './components/LoginForm';

export const LoginPage = () => {
  return (
    <AuthSplitLayout 
      title = "Welcome Back, member!" 
      subtitle = "Enter your credentials to access your account."
    >
      <LoginForm />
    </AuthSplitLayout>
  );
};