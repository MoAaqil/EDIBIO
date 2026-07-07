'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PRODUCT_CATEGORIES } from '@/lib/types';
import { useSellerStore } from '@/lib/store/seller';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerAddProductPage() {
  const router = useRouter();
  const { user, store, addProduct } = useSellerStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('grocery');
  const [price, setPrice] = useState('');
  const [mrp, setMRP] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [unit, setUnit] = useState('units');
  const [imageEmoji, setImageEmoji] = useState('📦');

  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !mrp || !stockQty) {
      toast.error('Please enter all required fields.');
      return;
    }

    const priceNum = parseFloat(price);
    const mrpNum = parseFloat(mrp);
    
    if (priceNum > mrpNum) {
      toast.error('Selling price cannot exceed Maximum Retail Price (MRP).');
      return;
    }

    const newProd = {
      storeId: store?._id || 's1',
      sellerId: user?.uid || 'seller_92831',
      name,
      description,
      images: [imageEmoji],
      image: imageEmoji,
      category,
      brand: 'Generics',
      price: priceNum,
      mrp: mrpNum,
      gstRate: 5,
      stockQty: parseInt(stockQty),
      unit,
      tags: [name.toLowerCase(), category],
      rating: 5.0,
      reviewCount: 0,
      isActive: true,
      isFeatured: false,
      weight: parseFloat(weight) || undefined,
      length: parseFloat(length) || undefined,
      breadth: parseFloat(breadth) || undefined,
      height: parseFloat(height) || undefined,
    };

    const toastId = toast.loading('Publishing product to catalog...');
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProd),
      });
      const data = await res.json();
      if (res.ok) {
        addProduct(data);
        toast.success('New product saved to catalog!', { id: toastId });
        router.push('/seller/products');
      } else {
        toast.error(data.error || 'Failed to save product.', { id: toastId });
      }
    } catch (err: any) {
      toast.error('Network error: ' + err.message, { id: toastId });
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={() => router.push('/seller/products')} style={backButtonStyle}>
        <ArrowLeft size={16} />
        <span>Back to Inventory</span>
      </button>

      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Add Product</h2>
          <p style={subTitleStyle}>Configure listing credentials for storefront upload.</p>
        </div>
      </div>

      <form onSubmit={handleSave} style={formFlexStyle}>
        <div style={formLeftColumnStyle}>
          {/* Base credentials */}
          <div className="card" style={cardStyle}>
            <h3 style={cardTitleStyle}>General Details</h3>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Product Name *</label>
              <input 
                type="text" 
                className="input" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Organic Red Cherry Tomatoes"
                required 
              />
            </div>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Description *</label>
              <textarea 
                className="input" 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="High-quality fresh organic cherry tomatoes sourced directly from local greenhouse farms..."
                style={{ minHeight: '120px', resize: 'vertical' }}
                required 
              />
            </div>

            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Category *</label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Unit Measurement *</label>
                <input 
                  type="text" 
                  className="input" 
                  value={unit} 
                  onChange={e => setUnit(e.target.value)} 
                  placeholder="kg, units, pack, litre"
                  required 
                />
              </div>
            </div>
          </div>

          {/* Pricing and Stock */}
          <div className="card" style={{ ...cardStyle, marginTop: '24px' }}>
            <h3 style={cardTitleStyle}>Pricing & Inventory</h3>
            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Selling Price (₹) *</label>
                <input 
                  type="number" 
                  className="input" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  placeholder="145"
                  required 
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Maximum Retail Price (MRP) (₹) *</label>
                <input 
                  type="number" 
                  className="input" 
                  value={mrp} 
                  onChange={e => setMRP(e.target.value)} 
                  placeholder="180"
                  required 
                />
              </div>
            </div>

            <div style={rowGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Stock Quantity Available *</label>
                <input 
                  type="number" 
                  className="input" 
                  value={stockQty} 
                  onChange={e => setStockQty(e.target.value)} 
                  placeholder="48"
                  required 
                />
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Visual Icon (Emoji Representation)</label>
                <input 
                  type="text" 
                  className="input" 
                  value={imageEmoji} 
                  onChange={e => setImageEmoji(e.target.value)} 
                  placeholder="🍅"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping dimensions card (custom layout box) */}
        <div style={formRightColumnStyle}>
          <div className="card" style={cardStyle}>
            <h3 style={cardTitleStyle}>Parcel Packaging</h3>
            <p style={labelDescStyle}>Enter physical dimensions to compile shipping labels accurately.</p>
            
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Package Weight (kg)</label>
              <input 
                type="number" 
                step="0.01"
                className="input" 
                value={weight} 
                onChange={e => setWeight(e.target.value)} 
                placeholder="0.25"
              />
            </div>

            <div style={dimensionsGridStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Length (cm)</label>
                <input type="number" className="input" value={length} onChange={e => setLength(e.target.value)} placeholder="10" />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Breadth (cm)</label>
                <input type="number" className="input" value={breadth} onChange={e => setBreadth(e.target.value)} placeholder="10" />
              </div>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Height (cm)</label>
                <input type="number" className="input" value={height} onChange={e => setHeight(e.target.value)} placeholder="10" />
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={saveButtonStyle}>
            <Save size={18} />
            <span>Publish Catalog listing</span>
          </button>
        </div>
      </form>
    </div>
  );
}

// Styles
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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

const formFlexStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const formLeftColumnStyle: React.CSSProperties = {
  flex: 2,
  minWidth: '320px',
};

const formRightColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const cardStyle: React.CSSProperties = {
  padding: '24px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '20px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  marginBottom: '16px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#334155',
  fontFamily: "'Outfit', sans-serif",
};

const labelDescStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginBottom: '16px',
};

const rowGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
};

const dimensionsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
};

const saveButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '12px',
  fontSize: '14px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
};
