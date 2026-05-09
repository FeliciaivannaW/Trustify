'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import id from '../locales/id.json';
import en from '../locales/en.json';
import zh from '../locales/zh.json';

const locales = { id, en, zh };

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState('id');

  useEffect(() => {
    const saved = localStorage.getItem('trustify-lang');
    if (saved && locales[saved]) setLang(saved);
  }, []);

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem('trustify-lang', l);
  };

  const t = (key) => {
    const parts = key.split('.');
    let val = locales[lang];
    for (const p of parts) {
      if (val && typeof val === 'object') val = val[p];
      else return key;
    }
    return typeof val === 'string' ? val : key;
  };

  return (
    <LangContext.Provider value={{ lang, changeLang, t, locales }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
