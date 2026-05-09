'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [scanHistory, setScanHistory] = useState([]);
  const [trustScore, setTrustScore] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('trustify-history');
      if (stored) {
        setScanHistory(JSON.parse(stored));
      } else {
        // Seeder data
        const seedData = [
          { id: 1, type: 'scamshield', score: 85, riskLevel: 'safe', timestamp: new Date(Date.now() - 86400000).toISOString() },
          { id: 2, type: 'hoaxlens', score: 45, riskLevel: 'warning', timestamp: new Date(Date.now() - 172800000).toISOString() },
          { id: 3, type: 'pinjolcheck', score: 20, riskLevel: 'danger', timestamp: new Date(Date.now() - 259200000).toISOString() }
        ];
        setScanHistory(seedData);
        localStorage.setItem('trustify-history', JSON.stringify(seedData));
        setTrustScore(85);
      }
    } catch {}
  }, []);

  const addScan = (scan) => {
    const entry = { ...scan, id: Date.now(), timestamp: new Date().toISOString() };
    const updated = [entry, ...scanHistory].slice(0, 20);
    setScanHistory(updated);
    localStorage.setItem('trustify-history', JSON.stringify(updated));
    setTrustScore(entry.score);
    return entry;
  };

  const clearHistory = () => {
    setScanHistory([]);
    localStorage.removeItem('trustify-history');
  };

  return (
    <StoreContext.Provider value={{ scanHistory, trustScore, addScan, clearHistory }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
