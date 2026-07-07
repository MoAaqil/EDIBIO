'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSellerStore } from '@/lib/store/seller';
import { formatPrice, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { ArrowLeft, Printer, Truck, FileText, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerOrderDetailPage() {
  const { orderId } = useParams();
  const router = useRouter();
  const { orders, updateOrder } = useSellerStore();
  const [order, setOrder] = useState<any>(null);
  
  // Custom Courier Details
  const [carrierName, setCarrierName] = useState('');
  const [awbNumber, setAwbNumber] = useState('');

  useEffect(() => {
    const ord = orders.find(o => o._id === orderId);
    if (ord) {
      setOrder(ord);
      if (ord.tracking) {
        setCarrierName(ord.tracking.carrier || '');
        setAwbNumber(ord.tracking.awb || '');
      }
    } else {
      // Fallback
      toast.error('Order details not found');
      router.push('/seller/orders');
    }
  }, [orderId, orders, router]);

  const handleUpdateStatus = (newStatus: string) => {
    if (!order) return;
    updateOrder(order._id, { status: newStatus as any });
    toast.success(`Order marked as ${newStatus}`);
  };

  const handleSaveCourierDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carrierName || !awbNumber) {
      toast.error('Please enter courier carrier name and AWB consignment number.');
      return;
    }

    updateOrder(order._id, {
      status: 'shipped',
      tracking: {
        carrier: carrierName,
        awb: awbNumber,
        trackingUrl: 'https://track.edistore.in',
        events: [
          { timestamp: new Date().toISOString(), status: 'shipped', location: 'Seller Store Hub', description: `Package dispatched via ${carrierName} AWB: ${awbNumber}` }
        ]
      }
    });

    toast.success('Courier dispatch details updated successfully!');
  };

  const handlePrintLabel = () => {
    window.print();
  };

  if (!order) return null;

  return (
    <div style={containerStyle}>
      {/* Hidden print page contents */}
      <div className="print-label-section" style={printSectionStyle}>
        <div style={labelCardStyle}>
          <div style={labelHeaderStyle}>
            <h2>EdiStore Shipping Label</h2>
            <span>Consignment ID: {order.orderNumber}</span>
          </div>
          <div style={labelDividerStyle}></div>
          <div style={labelGridStyle}>
            <div>
              <h3>SHIP FROM (SELLER)</h3>
              <p><strong>{order.storeName}</strong></p>
              <p>Phone: {order.sellerId}</p>
            </div>
            <div>
              <h3>SHIP TO (CUSTOMER)</h3>
              <p><strong>{order.shippingAddress.name}</strong></p>
              <p>{order.shippingAddress.line1}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>
          <div style={labelDividerStyle}></div>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <p>Scan barcode below for shipment tracking logs:</p>
            <div style={{ fontSize: '40px', marginTop: '8px' }}>║▌║█║▌│║▌║▌█║</div>
            <p style={{ fontSize: '11px', marginTop: '6px', color: '#64748b' }}>POWERED BY EDISTORE DELIVERY SYSTEMS</p>
          </div>
        </div>
      </div>

      <button onClick={() => router.push('/seller/orders')} style={backButtonStyle}>
        <ArrowLeft size={16} />
        <span>Back to Orders</span>
      </button>

      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Order ID: {order.orderNumber}</h2>
          <p style={subTitleStyle}>Ordered at {formatDate(order.createdAt)}</p>
        </div>

        <div style={actionsRowStyle}>
          <button onClick={handlePrintLabel} className="btn btn-outline" style={headerButtonStyle}>
            <Printer size={16} />
            <span>Print Shipping Label</span>
          </button>
        </div>
      </div>

      <div style={gridStyle}>
        {/* Left Side: Summary and Actions */}
        <div style={leftColumnStyle}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={cardTitleStyle}>Purchased Items</h3>
            <div style={itemsListStyle}>
              {order.items.map((item: any, idx: number) => (
                <div key={idx} style={itemRowStyle}>
                  <div style={itemIconStyle}>
                    <span style={{ fontSize: '24px' }}>{item.image || '📦'}</span>
                  </div>
                  <div style={itemMetaStyle}>
                    <p style={itemNameStyle}>{item.name}</p>
                    <p style={itemSubStyle}>{formatPrice(item.price)} x {item.qty}</p>
                  </div>
                  <span style={itemTotalStyle}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div style={dividerStyle}></div>

            <div style={summaryRowStyle}>
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div style={summaryRowStyle}>
                <span>Discount Applied</span>
                <span style={{ color: '#ef4444' }}>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div style={summaryRowStyle}>
              <span>EdiStore Platform Commission ({(order.commissionRate * 100).toFixed(1)}%)</span>
              <span style={{ color: '#ef4444' }}>-{formatPrice(order.commissionAmount)}</span>
            </div>

            <div style={dividerStyle}></div>

            <div style={totalRowStyle}>
              <span>Estimated Seller Payout</span>
              <span>{formatPrice(order.totalAmount - order.commissionAmount)}</span>
            </div>
          </div>

          {/* Shipment tracking card */}
          {order.status === 'confirmed' && (
            <div className="card" style={{ padding: '24px', marginTop: '24px' }}>
              <h3 style={cardTitleStyle}>Enter Courier Dispatch Consignment</h3>
              <p style={cardDescStyle}>Enter details once you hand over the cardboard package to your local courier service.</p>
              
              <form onSubmit={handleSaveCourierDetails} style={courierFormStyle}>
                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Courier Carrier Name</label>
                  <input 
                    type="text" 
                    className="input"
                    value={carrierName} 
                    onChange={e => setCarrierName(e.target.value)} 
                    placeholder="Delhivery, BlueDart, DTDC, Self Dispatch"
                    required
                  />
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>AWB Consignment / Tracking Number</label>
                  <input 
                    type="text" 
                    className="input"
                    value={awbNumber} 
                    onChange={e => setAwbNumber(e.target.value)} 
                    placeholder="AWB-82739103"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={shipSubmitButtonStyle}>
                  <Truck size={18} />
                  <span>Ship Consignment Package</span>
                </button>
              </form>
            </div>
          )}

          {/* Delivery quick marks */}
          {order.status === 'shipped' && (
            <div className="card" style={{ padding: '24px', marginTop: '24px', backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <h3 style={{ ...cardTitleStyle, color: '#065f46' }}>Confirm Shipment Delivery</h3>
              <p style={{ ...cardDescStyle, color: '#065f46' }}>Click below once the courier provider confirms successful doorstep handover to customer.</p>
              
              <button 
                onClick={() => handleUpdateStatus('delivered')}
                className="btn btn-primary"
                style={{ backgroundColor: '#059669', width: '100%', marginTop: '16px' }}
              >
                Mark as Delivered Successfully
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Shipping address */}
        <div style={rightColumnStyle}>
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={cardTitleStyle}>Shipping Address</h3>
            <div style={addressBlockStyle}>
              <p style={addrNameStyle}><strong>{order.shippingAddress.name}</strong></p>
              <p style={addrLineStyle}>{order.shippingAddress.line1}</p>
              <p style={addrLineStyle}>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p style={addrPhoneStyle}>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div className="card" style={{ padding: '24px', marginTop: '24px' }}>
            <h3 style={cardTitleStyle}>Order Logistics Timeline</h3>
            <div style={timelineStyle}>
              {order.timeline.map((event: any, idx: number) => (
                <div key={idx} style={timelineStepStyle}>
                  <ChevronRight size={16} color="#4f46e5" />
                  <div>
                    <span style={timelineStatusStyle}>{getStatusLabel(event.status)}</span>
                    <p style={timelineTimeStyle}>{formatDate(event.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Print Styles
const printSectionStyle: React.CSSProperties = {
  display: 'none',
};

const labelCardStyle: React.CSSProperties = {
  border: '3px solid #000000',
  padding: '24px',
  maxWidth: '500px',
  fontFamily: 'monospace',
};

const labelHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const labelDividerStyle: React.CSSProperties = {
  borderBottom: '2px dashed #000000',
  margin: '16px 0',
};

const labelGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '16px',
};

// Standard Styles
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

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

const headerButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  fontSize: '13px',
  borderRadius: '8px',
};

const gridStyle: React.CSSProperties = {
  display: 'flex',
  gap: '24px',
  flexWrap: 'wrap',
};

const leftColumnStyle: React.CSSProperties = {
  flex: 1.6,
  minWidth: '320px',
};

const rightColumnStyle: React.CSSProperties = {
  flex: 1,
  minWidth: '280px',
};

const cardTitleStyle: React.CSSProperties = {
  fontSize: '15px',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: '800',
  color: '#0f172a',
  marginBottom: '20px',
};

const cardDescStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: '1.4',
  marginBottom: '16px',
};

const itemsListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const itemRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

const itemIconStyle: React.CSSProperties = {
  width: '46px',
  height: '46px',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const itemMetaStyle: React.CSSProperties = {
  flex: 1,
};

const itemNameStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#0f172a',
};

const itemSubStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748b',
  marginTop: '2px',
};

const itemTotalStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#0f172a',
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '13px',
  color: '#475569',
  marginBottom: '12px',
};

const totalRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '16px',
  fontWeight: '800',
  color: '#0f172a',
};

const dividerStyle: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
  margin: '16px 0',
};

// Courier form
const courierFormStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const inputGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#334155',
  fontFamily: "'Outfit', sans-serif",
};

const shipSubmitButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  fontSize: '13px',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '10px',
};

// Address Block
const addressBlockStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const addrNameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
};

const addrLineStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#475569',
  lineHeight: '1.4',
};

const addrPhoneStyle: React.CSSProperties = {
  fontSize: '13px',
  color: '#64748b',
  marginTop: '6px',
};

// Timeline
const timelineStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
};

const timelineStepStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
};

const timelineStatusStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: '750',
  color: '#1e293b',
};

const timelineTimeStyle: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  marginTop: '2px',
};
