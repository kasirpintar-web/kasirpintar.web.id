import React, { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Keyboard, ScanLine } from 'lucide-react';
import { Button } from './ui/Button';

declare global {
  interface Window { BarcodeDetector?: any; }
}

interface Props { onDetected: (value: string) => void; onClose: () => void; }

export const BarcodeScanner: React.FC<Props> = ({ onDetected, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState('');
  const [manual, setManual] = useState('');
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let active = true;
    const start = async () => {
      if (!navigator.mediaDevices?.getUserMedia) { setError('Browser ini tidak menyediakan akses kamera.'); return; }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'user' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); }
        if (!window.BarcodeDetector) { setError('Pemindaian otomatis tidak didukung browser ini. Gunakan input manual di bawah.'); return; }
        const detector = new window.BarcodeDetector({ formats: ['code_128', 'ean_13', 'ean_8', 'upc_a', 'upc_e'] });
        const loop = async () => {
          if (!active || !videoRef.current || videoRef.current.readyState < 2) { if (active) requestAnimationFrame(loop); return; }
          try {
            const codes = await detector.detect(videoRef.current);
            if (codes?.length && codes[0].rawValue) { active = false; setScanning(false); onDetected(codes[0].rawValue); return; }
          } catch (_) {}
          if (active) setTimeout(loop, 120);
        };
        loop();
      } catch (e: any) {
        setError(e?.name === 'NotAllowedError' ? 'Izin kamera ditolak. Izinkan kamera di browser lalu coba lagi.' : 'Kamera tidak dapat dibuka.');
      }
    };
    start();
    return () => { active = false; streamRef.current?.getTracks().forEach((t) => t.stop()); streamRef.current = null; };
  }, [onDetected]);

  const submitManual = (e: React.FormEvent) => { e.preventDefault(); if (manual.trim()) onDetected(manual.trim()); };

  return <div className="space-y-4">
    <div className="relative overflow-hidden rounded-2xl bg-stone-950 aspect-video border border-stone-800">
      <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center"><div className="w-4/5 h-1/3 border-2 border-white/80 rounded-2xl shadow-[0_0_0_999px_rgba(0,0,0,.32)]" /></div>
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold flex items-center gap-1.5"><ScanLine className="w-3 h-3" /> Kamera depan</div>
      {!scanning && <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">Barcode ditemukan</div>}
    </div>
    {error && <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium flex gap-2"><CameraOff className="w-4 h-4 shrink-0" />{error}</div>}
    <form onSubmit={submitManual} className="space-y-2">
      <label className="text-xs font-bold text-stone-700">Input barcode manual</label>
      <div className="flex gap-2"><input value={manual} onChange={(e) => setManual(e.target.value)} placeholder="Ketik kode barcode..." className="flex-1 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm font-mono focus:outline-none focus:border-[#4A2E18]" /><Button type="submit" variant="primary"><Keyboard className="w-4 h-4 mr-1.5" />Gunakan</Button></div>
    </form>
    <Button type="button" variant="outline" className="w-full justify-center" onClick={onClose}><Camera className="w-4 h-4 mr-2" />Tutup Scanner</Button>
  </div>;
};
