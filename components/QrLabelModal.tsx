'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Download, Printer, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

interface QrLabelModalProps {
    product: any;
    company: any;
    onClose: () => void;
}

export default function QrLabelModal({ product, company, onClose }: QrLabelModalProps) {
    const [downloading, setDownloading] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const qrData = product.name;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&ecc=H&data=${encodeURIComponent(qrData)}`;

    // Draw preview on component mount or data changes
    useEffect(() => {
        drawPreview();
    }, [product, company]);

    const drawPreview = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Fill background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw dashed sticker border
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 3]);
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
        ctx.setLineDash([]); // Reset line dash

        // Draw Company Name
        ctx.fillStyle = '#64748B';
        ctx.font = '800 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(company?.name?.toUpperCase() || 'EDIBIO STORE', canvas.width / 2, 28);

        // Draw Product Name
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 13px sans-serif';
        const name = product.name || 'Product Name';
        const truncatedName = name.length > 25 ? name.substring(0, 23) + '...' : name;
        ctx.fillText(truncatedName, canvas.width / 2, 48);

        // Draw Price
        ctx.fillStyle = '#16A34A';
        ctx.font = '900 16px sans-serif';
        ctx.fillText(`₹${product.sellingPrice}`, canvas.width / 2, 72);

        // Load QR Code image
        const qrImg = new Image();
        qrImg.crossOrigin = 'anonymous';
        qrImg.src = qrUrl;

        qrImg.onload = () => {
            const qrSize = 130;
            const qrX = (canvas.width - qrSize) / 2;
            const qrY = 88;
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Draw Logo background (white rounded rect with smooth border)
            const logoBgSize = 36;
            const logoBgX = qrX + (qrSize - logoBgSize) / 2;
            const logoBgY = qrY + (qrSize - logoBgSize) / 2;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.roundRect(logoBgX, logoBgY, logoBgSize, logoBgSize, 8);
            ctx.fill();
            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Load Logo
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            logoImg.src = '/logo.png';
            logoImg.onload = () => {
                const logoSize = 28;
                const logoX = qrX + (qrSize - logoSize) / 2;
                const logoY = qrY + (qrSize - logoSize) / 2;
                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

                // Draw label/barcode text below QR
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 10px monospace';
                ctx.fillText(truncatedLabel, canvas.width / 2, qrY + qrSize + 18);

                // Footer
                ctx.fillStyle = '#94A3B8';
                ctx.font = '800 7px sans-serif';
                ctx.fillText('POWERED BY EDIBIO ERP', canvas.width / 2, canvas.height - 18);
            };
            logoImg.onerror = () => {
                // If logo fails, still draw fallback text
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#334155';
                ctx.font = 'bold 10px monospace';
                ctx.fillText(truncatedLabel, canvas.width / 2, qrY + qrSize + 18);
            };
        };
    };

    const handleDownload = () => {
        setDownloading(true);
        const previewCanvas = canvasRef.current;
        if (!previewCanvas) { setDownloading(false); return; }

        // Create high-res canvas for printing (300 DPI scale)
        const scale = 2; // double resolution for printing
        const printCanvas = document.createElement('canvas');
        printCanvas.width = previewCanvas.width * scale;
        printCanvas.height = previewCanvas.height * scale;
        const ctx = printCanvas.getContext('2d');
        if (!ctx) { setDownloading(false); return; }

        // Fill background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, printCanvas.width, printCanvas.height);

        // Dash Border
        ctx.strokeStyle = '#64748B';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([10, 6]);
        ctx.strokeRect(16, 16, printCanvas.width - 32, printCanvas.height - 32);
        ctx.setLineDash([]);

        // Company Name
        ctx.fillStyle = '#64748B';
        ctx.font = '800 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(company?.name?.toUpperCase() || 'EDIBIO STORE', printCanvas.width / 2, 56);

        // Product Name
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 26px sans-serif';
        const name = product.name || 'Product Name';
        const truncatedName = name.length > 25 ? name.substring(0, 23) + '...' : name;
        ctx.fillText(truncatedName, printCanvas.width / 2, 96);

        // Selling Price
        ctx.fillStyle = '#16A34A';
        ctx.font = '900 32px sans-serif';
        ctx.fillText(`₹${product.sellingPrice}`, printCanvas.width / 2, 144);

        // Draw QR
        const qrImg = new Image();
        qrImg.crossOrigin = 'anonymous';
        qrImg.src = qrUrl;

        qrImg.onload = () => {
            const qrSize = 260;
            const qrX = (printCanvas.width - qrSize) / 2;
            const qrY = 176;
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Logo Background
            const logoBgSize = 72;
            const logoBgX = qrX + (qrSize - logoBgSize) / 2;
            const logoBgY = qrY + (qrSize - logoBgSize) / 2;
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.roundRect(logoBgX, logoBgY, logoBgSize, logoBgSize, 16);
            ctx.fill();
            ctx.strokeStyle = '#E2E8F0';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Logo
            const logoImg = new Image();
            logoImg.crossOrigin = 'anonymous';
            logoImg.src = '/logo.png';
            logoImg.onload = () => {
                const logoSize = 56;
                const logoX = qrX + (qrSize - logoSize) / 2;
                const logoY = qrY + (qrSize - logoSize) / 2;
                ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);

                // Barcode/Name text
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 20px monospace';
                ctx.fillText(truncatedLabel, printCanvas.width / 2, qrY + qrSize + 36);

                // Footer
                ctx.fillStyle = '#94A3B8';
                ctx.font = '800 14px sans-serif';
                ctx.fillText('POWERED BY EDIBIO ERP', printCanvas.width / 2, printCanvas.height - 36);

                // Trigger Download
                const link = document.createElement('a');
                link.download = `QR_Sticker_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
                link.href = printCanvas.toDataURL('image/png');
                link.click();
                toast.success('Sticker downloaded!');
                setDownloading(false);
            };
            logoImg.onerror = () => {
                // If logo fails, complete without logo overlay
                const labelText = product.barcode || product.name;
                const truncatedLabel = labelText.length > 25 ? labelText.substring(0, 23) + '...' : labelText;
                ctx.fillStyle = '#1E293B';
                ctx.font = 'bold 20px monospace';
                ctx.fillText(truncatedLabel, printCanvas.width / 2, qrY + qrSize + 36);

                const link = document.createElement('a');
                link.download = `QR_Sticker_${product.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
                link.href = printCanvas.toDataURL('image/png');
                link.click();
                toast.success('Sticker downloaded!');
                setDownloading(false);
            };
        };
        qrImg.onerror = () => {
            toast.error('Failed to load QR code image. Please try again.');
            setDownloading(false);
        };
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 360, padding: 0, borderRadius: 20 }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <QrCode size={18} color="#9333EA" />
                        <span style={{ fontWeight: 900, fontSize: 15, color: '#1A1A2E' }}>QR sticker generator</span>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost btn-icon"><X size={18} /></button>
                </div>

                {/* Sticker Preview */}
                <div style={{ padding: '24px 20px', background: '#F8FAFC', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ background: 'white', padding: 8, borderRadius: 16, boxShadow: '0 10px 25px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0' }}>
                        <canvas ref={canvasRef} width={260} height={360} style={{ display: 'block', borderRadius: 8 }} />
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ padding: '16px 20px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: 10 }}>
                    <button onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>Close</button>
                    <button onClick={handleDownload} disabled={downloading} className="btn btn-blue" style={{ flex: 2, gap: 6, background: 'linear-gradient(135deg, #7C3AED, #4285F4)', border: 'none', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)' }}>
                        <Download size={15} />
                        {downloading ? 'Downloading...' : 'Download Sticker'}
                    </button>
                </div>
            </div>
        </div>
    );
}
