'use client'
import React from 'react';
import { AddressProvider } from './address-context/page';

export default function Layout({ children }) {
  return (
    
        <AddressProvider>
          <main>{children}</main>
        </AddressProvider>
      
  );
}
