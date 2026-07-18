'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function Footer() {
  const [modalType, setModalType] = useState<'commission' | 'packaging' | null>(null);

  return (
    <footer style={footerStyle}>
      <div className="container" style={footerContainerStyle}>
        <div style={footerGridStyle}>
          {/* Trust Info & Accepted Payments */}
          <div style={footerBrandSectionStyle}>
            <h4 style={footerHeadingStyle}>🛡️ EdiStore Trust Assurance</h4>
            <ul style={{ ...listStyle, gap: '8px', color: '#cbd5e1' }}>
              <li>✓ 100% Secure Payments</li>
              <li>✓ Trusted Local Sellers</li>
              <li>✓ Fast Delivery</li>
              <li>✓ 24×7 Customer Support</li>
            </ul>
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ ...footerHeadingStyle, fontSize: '13px', marginBottom: '8px' }}>Accepted Payments</h4>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Visa', 'Mastercard', 'RuPay', 'UPI', 'Paytm', 'PhonePe', 'Google Pay'].map(pm => (
                  <span key={pm} style={{ fontSize: '11px', fontWeight: '800', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', padding: '3px 8px', borderRadius: '6px' }}>
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links Section 1 */}
          <div>
            <h4 style={footerHeadingStyle}>Shop Categories</h4>
            <ul style={listStyle}>
              <li><Link href="/search?category=grocery" style={footerLinkStyle}>Grocery & Staples</Link></li>
              <li><Link href="/search?category=electronics" style={footerLinkStyle}>Electronics</Link></li>
              <li><Link href="/search?category=mobile" style={footerLinkStyle}>Mobiles & Tablets</Link></li>
              <li><Link href="/search?category=fashion" style={footerLinkStyle}>Fashion & Apparel</Link></li>
              <li><Link href="/search?category=beauty" style={footerLinkStyle}>Beauty & Personal Care</Link></li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div>
            <h4 style={footerHeadingStyle}>Sell on EdiStore</h4>
            <ul style={listStyle}>
              <li><Link href="/seller/register" style={footerLinkStyle}>Become a Partner Seller</Link></li>
              <li><Link href="/seller/login" style={footerLinkStyle}>Seller Login</Link></li>
              <li><button onClick={() => setModalType('commission')} style={footerBtnLinkStyle}>Commission Structure</button></li>
              <li><button onClick={() => setModalType('packaging')} style={footerBtnLinkStyle}>Packaging Guidelines</button></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 style={footerHeadingStyle}>Need Help?</h4>
            <ul style={listStyle}>
              <li style={footerLinkStyle}>Email: support@edibio.in</li>
              <li style={footerLinkStyle}>Phone: +91 98765 43210</li>
              <li style={footerLinkStyle}>Address: Edibio Technologies, Bangalore, KA</li>
            </ul>
          </div>
        </div>

        <div style={copyrightSectionStyle}>
          <p>© {new Date().getFullYear()} EdiStore (Edibio Technologies Pvt. Ltd). All rights reserved.</p>
        </div>
      </div>

      {/* Informational Modal */}
      {modalType && (
        <div style={modalOverlayStyle} onClick={() => setModalType(null)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={modalTitleStyle}>
                {modalType === 'commission' ? 'Platform Commission Structure' : 'Merchant Packaging Guidelines'}
              </h3>
              <button onClick={() => setModalType(null)} style={modalCloseButtonStyle}>
                <X size={18} />
              </button>
            </div>
            
            <div style={modalBodyStyle}>
              {modalType === 'commission' ? (
                <div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.5' }}>
                    EdiStore charges low commissions on each completed sale to support local shopkeepers:
                  </p>
                  <table style={modalTableStyle}>
                    <thead>
                      <tr>
                        <th style={modalThStyle}>Category</th>
                        <th style={modalThStyle}>EdiStore Fee</th>
                        <th style={modalThStyle}>Market Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={modalTdStyle}>Grocery & Staples</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>4%</td>
                        <td style={modalTdStyle}>6% – 8%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Electronics</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>3%</td>
                        <td style={modalTdStyle}>5% – 8%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Mobile Phones</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>2.5%</td>
                        <td style={modalTdStyle}>4%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Fashion & Apparel</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>9%</td>
                        <td style={modalTdStyle}>12% – 15%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Beauty & Personal Care</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>7%</td>
                        <td style={modalTdStyle}>10%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Home & Kitchen</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>7%</td>
                        <td style={modalTdStyle}>10% – 12%</td>
                      </tr>
                      <tr>
                        <td style={modalTdStyle}>Default / Others</td>
                        <td style={{ ...modalTdStyle, fontWeight: '700', color: '#10b981' }}>8%</td>
                        <td style={modalTdStyle}>12%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#94a3b8', lineHeight: '1.5' }}>
                  <p>Follow these standard packaging and delivery guidelines to maintain product quality and buyer trust:</p>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px' }}>1. Secure Wrapping</strong>
                    <span>All fragile items must be double-wrapped. Use standard packaging boxes to protect content.</span>
                  </div>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px' }}>2. Print Shipping Label</strong>
                    <span>Print packing slips and shipping labels directly from the Seller Dashboard and paste them flat onto the box.</span>
                  </div>
                  <div>
                    <strong style={{ color: 'white', display: 'block', marginBottom: '4px' }}>3. Courier AWB Tracking</strong>
                    <span>Ship using your local partner. Enter the tracking AWB number in your seller panel instantly to allow customer notifications.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

const footerStyle: React.CSSProperties = {
  backgroundColor: '#0f172a',
  color: '#94a3b8',
  paddingTop: '64px',
  paddingBottom: '32px',
  borderTop: '1px solid #1e293b',
  marginTop: 'auto',
  position: 'relative',
};

const footerContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
};

const footerGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '40px',
};

const footerBrandSectionStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '24px',
  fontWeight: '800',
  fontFamily: "'Outfit', sans-serif",
};

const logoTextMainStyle: React.CSSProperties = {
  color: '#6366f1',
};

const logoTextSubStyle: React.CSSProperties = {
  color: '#ffffff',
};

const brandDescStyle: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#64748b',
};

const footerHeadingStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  marginBottom: '20px',
  fontFamily: "'Outfit', sans-serif",
};

const listStyle: React.CSSProperties = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  fontSize: '14px',
};

const footerLinkStyle: React.CSSProperties = {
  color: '#94a3b8',
  transition: 'color 0.2s',
  cursor: 'pointer',
};

const footerBtnLinkStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#94a3b8',
  border: 'none',
  padding: 0,
  textAlign: 'left',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const copyrightSectionStyle: React.CSSProperties = {
  borderTop: '1px solid #1e293b',
  paddingTop: '24px',
  textAlign: 'center',
  fontSize: '13px',
  color: '#64748b',
};

// Modal Styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(4px)',
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '16px',
  width: '90%',
  maxWidth: '480px',
  overflow: 'hidden',
  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
};

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: '1px solid #334155',
  backgroundColor: '#0f172a',
};

const modalTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: '700',
  color: '#ffffff',
  fontFamily: "'Outfit', sans-serif",
};

const modalCloseButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#94a3b8',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  border: 'none',
};

const modalBodyStyle: React.CSSProperties = {
  padding: '20px',
  maxHeight: '400px',
  overflowY: 'auto',
};

const modalTableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '12px',
  marginTop: '8px',
};

const modalThStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '8px 12px',
  borderBottom: '2px solid #334155',
  color: '#ffffff',
  fontWeight: '600',
};

const modalTdStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderBottom: '1px solid #334155',
  color: '#cbd5e1',
};
