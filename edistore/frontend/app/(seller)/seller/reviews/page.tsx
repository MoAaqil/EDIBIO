'use client';

import { useState } from 'react';
import { useSellerStore } from '@/lib/store/seller';
import { Star, MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([
    { _id: 'rev_1', productName: 'Organic Premium Basmati Rice', customerName: 'Mo Aaqil', rating: 5, body: 'Superb quality rice. Long grains and wonderful aroma. Will buy again!', reply: '', createdAt: new Date().toISOString() },
    { _id: 'rev_2', productName: 'Wireless Bluetooth Headset v5.3', customerName: 'Varun Sharma', rating: 4, body: 'Battery backup is massive. Noise cancellation works well for this price point.', reply: 'Glad you loved the battery performance!', createdAt: new Date(Date.now() - 3 * 86400000).toISOString() },
  ]);

  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSendReply = (id: string) => {
    if (!replyText.trim()) return;

    setReviews(prev => prev.map(r => 
      r._id === id ? { ...r, reply: replyText.trim() } : r
    ));

    setReplyText('');
    setActiveReplyId(null);
    toast.success('Reply submitted successfully');
  };

  return (
    <div style={containerStyle}>
      <div>
        <h2 style={titleStyle}>Store Reviews & Ratings</h2>
        <p style={subTitleStyle}>Read and reply to feedback left by your storefront buyers.</p>
      </div>

      <div style={listStyle}>
        {reviews.map((rev) => (
          <div key={rev._id} className="card" style={reviewCardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <span style={productLabelStyle}>Product: <strong>{rev.productName}</strong></span>
                <p style={customerNameStyle}>Reviewed by: <strong>{rev.customerName}</strong></p>
              </div>
              <div style={starsRowStyle}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={14} 
                    fill={idx < rev.rating ? '#fbbf24' : 'none'} 
                    color={idx < rev.rating ? '#fbbf24' : '#cbd5e1'} 
                  />
                ))}
              </div>
            </div>

            <p style={bodyStyle}>"{rev.body}"</p>

            {rev.reply ? (
              <div style={replyBlockStyle}>
                <span style={replyBadgeStyle}>Your Response:</span>
                <p style={replyBodyStyle}>{rev.reply}</p>
              </div>
            ) : activeReplyId === rev._id ? (
              <div style={replyFormStyle}>
                <input 
                  type="text" 
                  className="input" 
                  value={replyText} 
                  onChange={e => setReplyText(e.target.value)} 
                  placeholder="Thank you for your feedback! We always..." 
                  style={{ flex: 1 }}
                />
                <button onClick={() => handleSendReply(rev._id)} className="btn btn-primary" style={sendButtonStyle}>
                  <Send size={14} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setActiveReplyId(rev._id);
                  setReplyText('');
                }} 
                className="btn btn-outline" 
                style={replyTriggerStyle}
              >
                <MessageSquare size={14} />
                <span>Write a Reply Response</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
};

const subTitleStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '2px',
};

const listStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const reviewCardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '12px',
  marginBottom: '16px',
};

const productLabelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#6366f1',
  textTransform: 'uppercase',
};

const customerNameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
  marginTop: '4px',
};

const starsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '2px',
};

const bodyStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#475569',
  lineHeight: '1.5',
  fontStyle: 'italic',
};

const replyBlockStyle: React.CSSProperties = {
  backgroundColor: '#f8fafc',
  borderLeft: '4px solid #6366f1',
  padding: '12px 16px',
  borderRadius: '0 12px 12px 0',
  marginTop: '16px',
};

const replyBadgeStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: '700',
  color: '#6366f1',
  textTransform: 'uppercase',
};

const replyBodyStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#334155',
  marginTop: '4px',
};

const replyFormStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  marginTop: '16px',
  alignItems: 'center',
};

const sendButtonStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: '10px',
};

const replyTriggerStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '6px 12px',
  fontSize: '12px',
  borderRadius: '8px',
  marginTop: '16px',
};
