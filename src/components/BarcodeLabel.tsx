import React, { useMemo } from 'react';
import { Download, Printer } from 'lucide-react';
import { Button } from './ui/Button';
import { ean13Svg } from '../utils/barcode';
import { Product } from '../types';

export const BarcodeLabel: React.FC<{ product: Product | null; onClose: () => void }> = ({ product, onClose }) => {
  const svg = useMemo(() => product?.barcode ? ean13Svg(product.barcode) : '', [product?.barcode]);
  if (!product) return null;
  const download = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = `barcode-${product.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.svg`; a.click(); URL.revokeObjectURL(url);
  };
  return <div className="space-y-4">
    <div className="p-4 bg-white border border-stone-200 rounded-2xl text-center" dangerouslySetInnerHTML={{ __html: svg }} />
    <div><p className="font-bold text-stone-900 text-sm">{product.name}</p><p className="text-xs text-stone-500">Kode: {product.barcode}</p></div>
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="justify-center" onClick={download}><Download className="w-4 h-4 mr-2" />Download SVG</Button>
      <Button variant="primary" className="justify-center" onClick={() => window.print()}><Printer className="w-4 h-4 mr-2" />Cetak</Button>
    </div>
    <Button variant="outline" className="w-full justify-center" onClick={onClose}>Selesai</Button>
  </div>;
};
