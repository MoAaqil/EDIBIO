'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSellerStore } from '@/lib/store/seller';
import { formatPrice } from '@/lib/utils';
import { Trash2, Edit2, Plus, AlertTriangle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerProductsPage() {
  const { products, setProducts, deleteProduct } = useSellerStore();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        deleteProduct(id);
        toast.success('Product deleted successfully from database');
      } else {
        toast.error('Failed to delete product from database.');
      }
    } catch (err: any) {
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Products Inventory ({products.length})</h2>
          <p style={subTitleStyle}>Manage your items listed on EdiStore customer storefront.</p>
        </div>
        <Link href="/seller/products/new" className="btn btn-primary" style={addButtonStyle}>
          <Plus size={18} />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="card" style={{ padding: '24px' }}>
        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderRowStyle}>
                <th style={thStyle}>Item</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Price</th>
                <th style={thStyle}>MRP</th>
                <th style={thStyle}>Stock Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const outOfStock = p.stockQty === 0;
                const lowStock = p.stockQty > 0 && p.stockQty < 15;
                
                return (
                  <tr key={p._id} style={tableRowStyle}>
                    <td style={tdStyle}>
                      <div style={itemMetaStyle}>
                        <div style={itemIconStyle}>
                          <span style={{ fontSize: '24px' }}>{p.images?.[0] || '📦'}</span>
                        </div>
                        <div>
                          <p style={itemNameStyle}>{p.name}</p>
                          <span style={itemSkuStyle}>ID: {p._id}</span>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={catBadgeStyle}>{p.category.toUpperCase()}</span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '700' }}>{formatPrice(p.price)}</td>
                    <td style={{ ...tdStyle, color: '#94a3b8', textDecoration: 'line-through' }}>
                      {formatPrice(p.mrp)}
                    </td>
                    <td style={tdStyle}>
                      {outOfStock ? (
                        <span style={stockBadgeStyle('#ef4444')}>
                          <AlertTriangle size={12} />
                          <span>Out of Stock (0)</span>
                        </span>
                      ) : lowStock ? (
                        <span style={stockBadgeStyle('#f59e0b')}>
                          <AlertTriangle size={12} />
                          <span>Low Stock ({p.stockQty})</span>
                        </span>
                      ) : (
                        <span style={stockBadgeStyle('#10b981')}>
                          <span>In Stock ({p.stockQty})</span>
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <div style={actionsRowStyle}>
                        <Link href={`/product/${p._id}`} style={actionIconStyle('#4f46e5')} title="View details">
                          <Eye size={16} />
                        </Link>
                        <button onClick={() => handleDelete(p._id)} style={actionIconStyle('#ef4444')} title="Delete product">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '16px',
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

const addButtonStyle: React.CSSProperties = {
  padding: '10px 18px',
  fontSize: '13px',
  borderRadius: '10px',
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
};

const tableHeaderRowStyle: React.CSSProperties = {
  borderBottom: '1px solid #e2e8f0',
};

const thStyle: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: '11px',
  fontWeight: '700',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const tableRowStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
};

const tdStyle: React.CSSProperties = {
  padding: '16px',
  fontSize: '13px',
  color: '#334155',
};

const itemMetaStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const itemIconStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#0f172a',
};

const itemSkuStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  marginTop: '1px',
  display: 'block',
};

const catBadgeStyle: React.CSSProperties = {
  backgroundColor: '#f1f5f9',
  color: '#475569',
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '600',
};

const stockBadgeStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '12',
  color: color,
  padding: '4px 10px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: '700',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
});

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '8px',
};

const actionIconStyle = (color: string): React.CSSProperties => ({
  backgroundColor: color + '10',
  color: color,
  border: 'none',
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
