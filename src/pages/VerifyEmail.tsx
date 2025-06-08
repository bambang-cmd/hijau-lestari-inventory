
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { resendVerification } = useAuth();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = searchParams.get('token');
        const type = searchParams.get('type');

        if (!token || type !== 'signup') {
          setStatus('error');
          setMessage('Link verifikasi tidak valid atau sudah kadaluarsa.');
          return;
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          setStatus('error');
          setMessage(error.message);
        } else {
          setStatus('success');
          setMessage('Email berhasil diverifikasi! Anda akan diarahkan ke dashboard.');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } catch (error: any) {
        setStatus('error');
        setMessage('Terjadi kesalahan saat memverifikasi email.');
      }
    };

    verifyUser();
  }, [searchParams, navigate]);

  const handleResendVerification = async () => {
    await resendVerification();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Verifikasi Email
          </CardTitle>
          <CardDescription>
            {status === 'loading' && 'Memverifikasi email Anda...'}
            {status === 'success' && 'Email berhasil diverifikasi!'}
            {status === 'error' && 'Verifikasi gagal'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <div className="flex justify-center">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <p className="text-sm text-muted-foreground">{message}</p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <XCircle className="h-16 w-16 text-red-500" />
              </div>
              <p className="text-sm text-muted-foreground">{message}</p>
              
              <div className="space-y-2">
                <Button onClick={handleResendVerification} className="w-full">
                  Kirim Ulang Email Verifikasi
                </Button>
                <Button onClick={() => navigate('/auth')} variant="outline" className="w-full">
                  Kembali ke Login
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
