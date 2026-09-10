'use client';

import { CartProvider } from '@/lib/context/CartContext';
import { AuthProvider } from '@/lib/context/AuthContext';
import { FirebaseAuthProvider } from '@/lib/context/FirebaseAuthContext';

export function Providers({ children }) {
  return (
    <FirebaseAuthProvider>
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    </FirebaseAuthProvider>
  );
}

