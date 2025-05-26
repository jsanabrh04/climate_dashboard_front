'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return <>{children}</>;
}
