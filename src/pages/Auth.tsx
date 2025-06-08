
import { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthGuard from '@/components/auth/AuthGuard';

type AuthMode = 'login' | 'register' | 'forgot-password';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setMode('register')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        );
      case 'register':
        return (
          <RegisterForm onSwitchToLogin={() => setMode('login')} />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm onSwitchToLogin={() => setMode('login')} />
        );
      default:
        return null;
    }
  };

  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {renderForm()}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Auth;
