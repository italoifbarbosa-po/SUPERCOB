'use client';

import React, { useState } from 'react';
import { Login } from '@/components/Login';
import { Shell, ViewState } from '@/components/Shell';
import { Dashboard } from '@/components/Dashboard';
import { Clients } from '@/components/Clients';
import { Loans } from '@/components/Loans';
import { Reports } from '@/components/Reports';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Shell
      currentView={currentView}
      onNavigate={setCurrentView}
      onLogout={() => setIsAuthenticated(false)}
    >
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'clients' && <Clients />}
      {currentView === 'loans' && <Loans />}
      {currentView === 'reports' && <Reports />}
    </Shell>
  );
}
