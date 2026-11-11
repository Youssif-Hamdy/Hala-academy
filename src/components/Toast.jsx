import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="toast-floating">
      <span style={{ fontSize: '14px', fontWeight: 500, color: '#FFFFFF' }}>{toast}</span>
    </div>
  );
}
