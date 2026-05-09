'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Bell, AlertTriangle, ShieldAlert, Filter } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function HotNews() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'Malware', 'Phishing', 'Scam', 'Hoax'];

  const news = [
    {
      type: 'Malware',
      title: 'Modus Penipuan Undangan Pernikahan Format APK',
      date: '9 Mei 2026',
      level: 'danger',
      content: 'Penipu mengirimkan file dengan ekstensi .apk melalui WhatsApp dengan kedok undangan pernikahan. Jika di-install, aplikasi tersebut akan mencuri SMS OTP dan menguras rekening bank korban.'
    },
    {
      type: 'Phishing',
      title: 'Modus Kurir Paket J&T / SPX Palsu',
      date: '8 Mei 2026',
      level: 'danger',
      content: 'Banyak laporan korban menerima pesan bahwa ada paket yang nyasar dan diminta untuk membuka link tertentu untuk melacak resi. Link tersebut mengarahkan ke halaman login palsu untuk mencuri data pribadi.'
    },
    {
      type: 'Scam',
      title: 'Lowongan Kerja Freelance Like & Subscribe YouTube',
      date: '5 Mei 2026',
      level: 'warning',
      content: 'Awalnya korban ditawari komisi kecil hanya untuk *like* video YouTube. Setelah korban percaya, mereka dimasukkan ke grup VIP dan diminta melakukan "deposit" jutaan rupiah yang akhirnya dibawa kabur.'
    },
    {
      type: 'Hoax',
      title: 'Broadcast WA: Bantuan Sosial Tunai (BST) Rp 5 Juta',
      date: '2 Mei 2026',
      level: 'safe',
      content: 'Beredar luas pesan berantai di grup keluarga mengenai pembagian bansos sebesar 5 juta rupiah dari pemerintah hanya dengan mengisi form di Google Docs. Kementerian Sosial menegaskan bahwa info tersebut adalah HOAX.'
    },
    {
      type: 'Scam',
      title: 'Modus Telepon dari "Customer Service Bank" Palsu',
      date: '28 April 2026',
      level: 'danger',
      content: 'Waspada penelepon yang mengaku dari Bank BCA/Mandiri menginformasikan perubahan tarif transfer bulanan menjadi Rp 150.000. Mereka akan meminta Anda mengisi form jika tidak setuju untuk mencuri data ATM.'
    },
    {
      type: 'Malware',
      title: 'File Surat Tilang Elektronik (ETLE) Palsu di WhatsApp',
      date: '25 April 2026',
      level: 'danger',
      content: 'Polisi gadungan mengirim pesan tilang elektronik format .apk. Jangan diklik! Polantas asli hanya mengirimkan surat tilang melalui kantor pos ke alamat STNK.'
    },
    {
      type: 'Phishing',
      title: 'WiFi Publik Kloning (Evil Twin) di Bandara',
      date: '15 April 2026',
      level: 'warning',
      content: 'Ditemukan jaringan WiFi terbuka dengan nama "Airport_Free_WiFi" yang mengarahkan pengguna ke halaman login WhatsApp Web palsu. Selalu gunakan fitur WiFiSecure sebelum terhubung.'
    },
    {
      type: 'Scam',
      title: 'Jebakan Pinjol Ilegal Berkedok Koperasi Simpan Pinjam',
      date: '10 April 2026',
      level: 'danger',
      content: 'Pinjaman cair tanpa persetujuan tiba-tiba masuk ke rekening korban, lalu beberapa hari kemudian ditagih dengan bunga harian 10% disertai ancaman penyebaran foto pribadi.'
    }
  ];

  const filteredNews = activeFilter === 'Semua' ? news : news.filter(n => n.type === activeFilter);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16, background: 'var(--danger-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
            }}>
              <Flame size={32} color="var(--danger)" />
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>HotNews Alerts</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
              Peringatan keamanan dan tren modus penipuan digital terbaru yang sedang marak terjadi di Indonesia.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 8 }} className="hide-scrollbar">
            <Filter size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '6px 16px', borderRadius: 20, whiteSpace: 'nowrap', cursor: 'pointer',
                  border: activeFilter === filter ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: activeFilter === filter ? 'var(--primary)' : 'var(--surface-2)',
                  color: activeFilter === filter ? 'white' : 'var(--text-primary)',
                  fontWeight: activeFilter === filter ? 600 : 400, transition: 'all 0.2s'
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={item.title}
                  className="glass-card" 
                  style={{ padding: 24, borderLeft: `4px solid var(--${item.level})` }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ 
                        fontSize: 11, fontWeight: 700, textTransform: 'uppercase', 
                        background: `var(--${item.level}-bg)`, color: `var(--${item.level})`, 
                        padding: '4px 10px', borderRadius: 12 
                      }}>
                        {item.type}
                      </span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.date}</span>
                    </div>
                    {item.level === 'danger' && <AlertTriangle size={18} color="var(--danger)" />}
                  </div>
                  
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: 14 }}>
                    {item.content}
                  </p>
                </motion.div>
              ))}
              {filteredNews.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                  Tidak ada berita untuk kategori ini.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
