'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import AuthPage from '@components/Auth/AuthPage';
import { useRoot } from '@core/contexts/RootContexts';

export default function LoginPage() {
  const { user } = useRoot();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (user) {
      router.push('/mydashboard');
    } else {
      setIsChecking(false);
    }
  }, [user, router]);

  if (isChecking) {
    return null;
  }

  return <AuthPage mode="login" />;
}
