'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, ChevronRight } from 'lucide-react';
import { useLang } from '../lib/lang';
import Link from 'next/link';

export default function ChatBot() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Initial greeting when opened the first time
    if (isOpen && messages.length === 0) {
      setMessages([{ id: 1, type: 'bot', text: t('chat.greeting') }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    if (isOpen) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: 'Saya dapat membantu Anda mengecek keamanan digital. Pilih aksi di bawah ini:',
        options: [
          { label: 'Cek Link Penipuan', path: '/scamshield' },
          { label: 'Cek Info Loker', path: '/lowonganaman' },
          { label: 'Lihat HotNews', path: '/hotnews' },
          { label: 'Semua Fitur', path: '/features' }
        ]
      };
      setMessages(prev => [...prev, botMsg]);
    }, 800);
  };

  const handleOptionClick = (path) => {
    // Navigate naturally via Link so we don't strictly need useRouter here, but we'll use window.location
    window.location.href = path;
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-card"
              style={{
                position: 'absolute', bottom: 70, right: 0,
                width: 320, height: 450, display: 'flex', flexDirection: 'column',
                overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border)', background: 'var(--surface)',
                transformOrigin: 'bottom right'
              }}
            >
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                color: 'white'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Bot size={20} color="white" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{t('chat.title')}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, opacity: 0.9 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                      {t('chat.online')}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: 4 }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Chat Area */}
              <div style={{
                flex: 1, overflowY: 'auto', padding: '16px', display: 'flex',
                flexDirection: 'column', gap: 12, background: 'var(--surface-2)'
              }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{
                    display: 'flex', flexDirection: msg.type === 'user' ? 'row-reverse' : 'row',
                    gap: 8, alignItems: 'flex-end', width: '100%'
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                      background: msg.type === 'user' ? 'var(--surface)' : 'var(--primary-glow)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: msg.type === 'user' ? '1px solid var(--border)' : 'none',
                      color: msg.type === 'user' ? 'var(--text-secondary)' : 'var(--primary)'
                    }}>
                      {msg.type === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '75%' }}>
                      <div style={{
                        padding: '10px 14px', borderRadius: 16, fontSize: 13, lineHeight: 1.5,
                        borderBottomRightRadius: msg.type === 'user' ? 4 : 16,
                        borderBottomLeftRadius: msg.type === 'bot' ? 4 : 16,
                        background: msg.type === 'user' ? 'var(--primary)' : 'var(--surface)',
                        color: msg.type === 'user' ? 'white' : 'var(--text-primary)',
                        border: msg.type === 'bot' ? '1px solid var(--border)' : 'none',
                      }}>
                        {msg.text}
                      </div>
                      
                      {msg.options && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleOptionClick(opt.path)}
                              style={{
                                padding: '8px 12px', background: 'var(--surface-2)', border: '1px solid var(--border)',
                                borderRadius: 12, fontSize: 12, color: 'var(--primary)', fontWeight: 600,
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
                              }}
                            >
                              {opt.label} <ChevronRight size={14} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} style={{
                padding: '12px 16px', background: 'var(--surface)', borderTop: '1px solid var(--border)',
                display: 'flex', gap: 8, alignItems: 'center'
              }}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 20, border: '1px solid var(--border)',
                    background: 'var(--surface-2)', fontSize: 13, color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  style={{
                    width: 36, height: 36, borderRadius: '50%', border: 'none',
                    background: input.trim() ? 'var(--primary)' : 'var(--surface-2)',
                    color: input.trim() ? 'white' : 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: input.trim() ? 'pointer' : 'default', transition: 'all 0.2s'
                  }}
                >
                  <Send size={16} style={{ marginLeft: 2 }} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glow-blue"
          style={{
            width: 56, height: 56, borderRadius: '50%', border: 'none',
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 8px 24px rgba(26,111,255,0.4)',
            zIndex: 1000
          }}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </motion.button>
      </div>
    </>
  );
}
