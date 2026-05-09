'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ paddingTop: 80, paddingBottom: 60, flex: 1, background: 'var(--background)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', marginBottom: 32, textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Kembali ke Beranda
          </Link>

          <div className="glass-card" style={{ padding: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24, color: 'var(--text-primary)' }}>Privacy Policy & Terms of Service</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>Terakhir diperbarui: Mei 2026</p>
            
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: 'var(--text-primary)' }}>1. Pendahuluan</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              Selamat datang di Trustify. Kami berdedikasi untuk melindungi privasi Anda dan menyediakan layanan analisis keamanan digital yang andal untuk masyarakat Indonesia. Kebijakan ini menjelaskan bagaimana data Anda ditangani.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: 'var(--text-primary)' }}>2. Pengumpulan Data</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              Untuk versi MVP ini, seluruh analisis teks, file, dan gambar diproses secara lokal di perangkat Anda (*client-side*) atau disimulasikan tanpa menyimpan data pribadi Anda ke dalam server publik. Riwayat "Scan History" disimpan hanya di penyimpanan lokal browser Anda (*Local Storage*).
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: 'var(--text-primary)' }}>3. Tanggung Jawab Pengguna</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              Hasil dari kecerdasan buatan (TrustScore) yang ditampilkan aplikasi ini bersifat **indikatif** dan tidak mengikat secara hukum. Keputusan akhir untuk percaya atau bertransaksi sepenuhnya menjadi tanggung jawab Anda sendiri. Trustify tidak bertanggung jawab atas kerugian finansial akibat keputusan pengguna.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: 'var(--text-primary)' }}>4. Penggunaan File (Banner/PDF/Image)</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              Setiap berkas yang diunggah untuk keperluan analisis oleh AI (seperti ImageTruth, ReviewGuard, atau LowonganAman) digunakan sebatas satu kali sesi analisis. Berkas tersebut segera dihapus dari memori dan tidak disebarluaskan.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16, color: 'var(--text-primary)' }}>5. Kontak Kami</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau ingin melaporkan indikasi kerentanan keamanan, silakan hubungi kami di:
              <br/><br/>
              <strong>Email:</strong> fivanna21@gmail.com<br/>
              <strong>WhatsApp:</strong> +62 822 8238 7722
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
