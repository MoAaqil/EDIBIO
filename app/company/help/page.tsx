'use client';
import { useState, useEffect, Suspense } from 'react';
import { Search, ChevronDown, ChevronRight, Zap, Package, Users, FileText, TrendingUp, Settings, DollarSign, Repeat, Bell, BarChart2, ShoppingCart, Clock, BookOpen } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const sections = [
    {
        id: 'quickbilling',
        icon: '⚡',
        color: '#4285F4',
        bg: '#EBF3FF',
        title: 'Quick Billing',
        subtitle: 'Create invoices in seconds',
        articles: [
            {
                title: 'How to create a new bill',
                content: `Quick Billing is your fastest way to generate invoices.

**Steps:**
1. Click **Quick Billing** in the sidebar (or press **Ctrl+B**)
2. Type the customer name and phone (optional)
3. In the item row, start typing the product name — it will auto-suggest from your inventory
4. Enter Quantity, Price, Discount and GST if needed
5. Click **+ ADD ROW** or press **Enter** to add more items
6. At the bottom, enter the **Amount Given** by the customer
7. Click **Save Invoice** or press **F12**

**Tips:**
- If the customer pays exact amount, leave Amount Given blank — it auto-marks as PAID
- Use **CREDIT** mode at the top to create unpaid/credit bills
- The invoice number auto-increments (e.g. AEO05MN21000001)`,
            },
            {
                title: 'Split Payment (Cash + UPI on same bill)',
                content: `You can split a single bill across multiple payment methods.

**Steps:**
1. After adding items, scroll to the payment section
2. Click **Split Payment** instead of Single Payment
3. Enter amounts for each method: Cash ₹200, UPI ₹300, Card ₹0 etc.
4. The total must match or exceed the Grand Total
5. Save the invoice — both methods are recorded

The split is shown on the printed invoice and in the Daily Closing Report.`,
            },
            {
                title: 'Customer Balance Tracker',
                content: `Use the **Balance** button at the top of Quick Billing to see all customers with pending dues.

**What it shows:**
- Every customer who has unpaid invoice balance
- The exact amount they owe (calculated from actual unpaid invoices)
- A quick **Record Payment** field to collect and record cash

**How to record a partial payment:**
1. Open Balance → find the customer
2. Enter the amount they are paying now in the "Amount Paid" field
3. Click **Record Payment**
4. The payment is applied oldest-invoice-first and logged in the Daily Report

**Paid Fully** instantly clears the entire outstanding balance across all their invoices.`,
            },
            {
                title: 'Barcode scanning',
                content: `Edibio supports barcode scanning to instantly add products to the bill.

**Setup:**
1. First assign barcodes to your products in **Inventory → Edit Product**
2. In Quick Billing, click the **Barcode** column cell in any row
3. Scan your barcode with a USB or Bluetooth scanner
4. The product auto-fills: name, rate, HSN, GST

**Manual barcode entry:**
- Type the barcode directly in the barcode column
- Press Enter to trigger the lookup`,
            },
            {
                title: 'Recurring Invoices',
                content: `Set up automatic repeat billing for monthly or subscription customers.

**Steps:**
1. Open Quick Billing and fill in the customer + items
2. Click **Recurring** in the top toolbar
3. Choose frequency: Daily / Weekly / Monthly
4. Set start date and optionally end date
5. Click **Save Recurring Schedule**

The system will auto-generate invoices on the scheduled date. They appear in the billing list tagged as "Recurring".`,
            },
            {
                title: 'Suspending and resuming a bill',
                content: `If a customer is mid-billing and you need to serve another customer quickly:

1. Click **Suspend** at the top right of Quick Billing
2. The bill is saved as a draft with a name (customer name or timestamp)
3. To resume: click **Fetch** → select the suspended bill
4. Continue billing from where you left off

You can have multiple bills suspended at once.`,
            },
        ],
    },
    {
        id: 'inventory',
        icon: '📦',
        color: '#34A853',
        bg: '#E8F5E9',
        title: 'Inventory',
        subtitle: 'Stock tracking & management',
        articles: [
            {
                title: 'Adding products to inventory',
                content: `**Steps:**
1. Go to **Inventory** in the sidebar
2. Click **+ Add Product**
3. Fill in: Name, Category, Unit, Purchase Price, Selling Price, MRP
4. Set **Low Stock Alert Qty** — you'll get a warning when stock falls below this
5. Optionally add Barcode, HSN Code, and GST Rate
6. Click **Save**

**Quick tip:** You can also add products directly from Quick Billing — just type a new product name and it will ask if you want to save it to inventory.`,
            },
            {
                title: 'Stock Movement History',
                content: `Every stock change is automatically logged. To view:

1. Go to **Inventory**
2. Click on any product name
3. The **Stock Movement Timeline** shows:
   - Date & time of each change
   - IN (purchase/return) or OUT (sale) qty
   - Which invoice caused the change
   - Balance after the movement

You can also manually adjust stock by clicking **Adjust Stock** and entering a +/- quantity with a reason.`,
            },
            {
                title: 'Batch & Expiry Tracking',
                content: `For food, pharma, or perishable products you can track batches:

1. Edit any product → enable **Batch Tracking**
2. When adding purchase invoices, enter: Batch No, Mfg Date, Expiry Date, Qty
3. In **Inventory → Expiry Calendar**, you'll see:
   - 🔴 Red: Already expired
   - 🟡 Yellow: Expiring within 30 days
   - 🟢 Green: Safe stock

Expiry badges also appear directly in the inventory list view for quick scanning.`,
            },
            {
                title: 'Purchase Orders (PO)',
                content: `Create purchase orders before stock arrives from a supplier.

**Steps:**
1. Go to **Inventory → Purchase Orders**
2. Click **+ New Purchase Order**
3. Select supplier, add items with expected quantities and rates
4. Set status to **Draft** or **Sent** (supplier notified)
5. When goods arrive, click **Convert to Purchase Invoice** — stock is auto-added

**Status flow:** Draft → Sent → Received`,
            },
            {
                title: 'Low stock alerts',
                content: `Set a **Low Stock Alert Qty** for each product. When stock falls to or below this number, you will see:
- A red badge on the product in the inventory list
- An alert in the Dashboard notifications
- AI suggestions in the Smart Reorder section

To set: Edit Product → set "Low Stock Alert Qty" field.`,
            },
        ],
    },
    {
        id: 'parties',
        icon: '👥',
        color: '#9C27B0',
        bg: '#F3E5F5',
        title: 'Parties (Customers & Suppliers)',
        subtitle: 'Manage your contacts and balances',
        articles: [
            {
                title: 'Adding a customer or supplier',
                content: `1. Go to **Parties** in the sidebar
2. Click **+ Add Party**
3. Select type: Customer or Supplier
4. Fill in Name, Phone, Address, GSTIN (optional)
5. Set **Opening Balance** if they already owe you money
6. Click **Save**

Customers are automatically created when you save a bill with a name + phone. You don't need to pre-add them.`,
            },
            {
                title: 'Recording a balance payment',
                content: `When a customer pays off their outstanding dues:

1. Go to **Parties** → find the customer
2. Click the 💹 (payment) icon
3. Enter amount, payment method (Cash/UPI/Card), and optional note
4. Click **Record Payment**

This reduces their outstanding balance AND logs the entry in the **Daily Closing Report → Balance Repayments** section.

**Or** use the Balance Tracker in Quick Billing (the **Balance** button at the top).`,
            },
            {
                title: 'Sending WhatsApp payment reminders',
                content: `To remind a customer about their due payment:

1. In the **Daily Closing Report**, scroll to **Outstanding Due Payments**
2. Find the customer and click the **WA** button
3. WhatsApp opens with a pre-filled message:
   *"Dear {Name}, your bill #{Invoice} of ₹{Amount} is due. Please pay at your earliest."*

**Or** from the invoice list: find an unpaid invoice → click the WhatsApp icon.

Note: You need the customer's phone number saved for this to work.`,
            },
        ],
    },
    {
        id: 'reports',
        icon: '📊',
        color: '#FF6D00',
        bg: '#FFF3E0',
        title: 'Reports',
        subtitle: 'Daily close, dues, and analytics',
        articles: [
            {
                title: 'Daily Closing Report',
                content: `The Daily Closing Report gives you a full picture of any day's business.

**Go to:** Reports → Daily Closing Report

**What it shows:**
- 📊 KPI Cards: Total Sales, Collected, Repaid Today, Outstanding Due, Purchases, Expenses, Net Cash, GST
- 🧾 Sale Invoices for the day with status (Paid/Partial/Unpaid)
- 💸 Balance Repayments recorded today (payments received on old dues)
- ⚠️ Outstanding Due Payments — all customers with unpaid balances, grouped by phone
- 💸 Close Day button to lock the day as final

**Select a past date** using the date picker at the top to view historical reports.`,
            },
            {
                title: 'Outstanding Due Payments',
                content: `This section in the Daily Close Report shows every customer who still owes you money.

**Key features:**
- Customers are **grouped by phone number** — even if they had different names on different bills, they appear as one row
- Shows: Customer name, Phone, Number of unpaid bills, Oldest due date, Total amount owed
- **WA button**: Opens WhatsApp with a payment reminder
- Updates in real-time as payments are recorded

**How dues are cleared:**
Record payment via: Parties page → 💹 icon, OR Balance Tracker in Quick Billing`,
            },
            {
                title: 'Balance Repayments section',
                content: `This section shows payments recorded **on the selected date** against old outstanding balances.

It only shows entries created via:
- **Parties → Record Payment** (💹 icon)
- **Quick Billing → Balance Tracker → Record Payment**

**If it shows empty:** No payments were recorded on that date via those methods. Payments that only cleared invoice status but didn't go through the balance tracker won't appear here.`,
            },
            {
                title: 'Close Day',
                content: `The **Close Day** button at the bottom of the Daily Report locks the day as final.

- Appears only for **today's** date
- After closing, the day is marked 🔒 Closed
- You can still **Reopen** it if needed
- Useful as an end-of-day checklist confirmation

This does not prevent future edits — it's a visual marker only.`,
            },
        ],
    },
    {
        id: 'expenses',
        icon: '💸',
        color: '#F44336',
        bg: '#FFEBEE',
        title: 'Expenses',
        subtitle: 'Track business costs',
        articles: [
            {
                title: 'Adding an expense',
                content: `1. Go to **Expenses** in the sidebar
2. Click **+ Add Expense**
3. Enter: Description, Amount, Category, Date, Payment Method
4. Click **Save**

Expenses appear in the **Daily Closing Report** under the Expenses section and reduce your **Net Cash** for the day.

**Categories**: Rent, Salary, Utilities, Transport, Supplies, Other (or create custom).`,
            },
            {
                title: 'AI Expense Categorizer',
                content: `When adding an expense, the AI can auto-detect the category from your description.

Example: Type "paid electricity bill ₹2400" → AI suggests **Utilities**.

This uses the on-device AI model. It works offline and never sends your data to a server.`,
            },
        ],
    },
    {
        id: 'settings',
        icon: '⚙️',
        color: '#607D8B',
        bg: '#ECEFF1',
        title: 'Settings & Backup',
        subtitle: 'Configure your business',
        articles: [
            {
                title: 'Auto Cloud Backup',
                content: `Edibio automatically backs up your data to the cloud.

**Configure interval:**
1. Go to **Settings → Auto Backup**
2. Choose: 5 min / 30 min / 1 hour / 6 hours / Daily
3. The backup runs silently in the background

**Manual backup:** Click **Export Backup** to download a JSON file anytime.

**Restore:** Click **Import Backup** and select a previously exported file.`,
            },
            {
                title: 'Invoice templates',
                content: `Customize how your printed invoices look:

1. Go to **Settings → Templates** (or **Templates** in sidebar)
2. Choose a base theme: Classic, Modern, GST, Thermal
3. Customize: Logo, colors, font, which columns to show
4. Live preview updates as you change settings
5. Click **Save Template**

Your template applies to all future printed invoices.`,
            },
            {
                title: 'GST setup',
                content: `To enable GST billing:

1. Go to **Settings → Company**
2. Enter your **GSTIN** number
3. For each product, set the **GST Rate** (0%, 5%, 12%, 18%, 28%)
4. Choose whether GST is **inclusive** (already in price) or **exclusive** (added on top)

GST is auto-calculated on every invoice. The **Daily Close Report** shows total GST collected.`,
            },
            {
                title: 'Multi-counter support',
                content: `If you have multiple billing counters (Counter 1, Counter 2):

1. In Quick Billing, click **Counter 1** at the top
2. Select or rename the counter
3. Each counter's sales are tracked separately
4. Filter by counter in reports

Each counter maintains its own suspended bills.`,
            },
        ],
    },
];

function HelpPageContent() {
    const [query, setQuery] = useState('');
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [openArticle, setOpenArticle] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const sectionParam = searchParams.get('section');
        const articleParam = searchParams.get('article');
        if (sectionParam) {
            setActiveSection(sectionParam);
        }
        if (articleParam) {
            setOpenArticle(articleParam);
        }
    }, [searchParams]);

    const filtered = sections.map(s => ({
        ...s,
        articles: s.articles.filter(a =>
            !query || a.title.toLowerCase().includes(query.toLowerCase()) ||
            a.content.toLowerCase().includes(query.toLowerCase()) ||
            s.title.toLowerCase().includes(query.toLowerCase())
        )
    })).filter(s => s.articles.length > 0);

    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={i} style={{ fontWeight: 800, color: '#1A202C', margin: '12px 0 4px', fontSize: 13 }}>{line.replace(/\*\*/g, '')}</p>;
            }
            if (line.startsWith('- ') || line.match(/^\d+\./)) {
                return <li key={i} style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.7, marginLeft: 4 }}>{line.replace(/^[-\d.]+\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1')}</li>;
            }
            if (line.trim() === '') return <br key={i} />;
            // inline bold
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
                <p key={i} style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.7, margin: '3px 0' }}>
                    {parts.map((p, j) => p.startsWith('**') ? <strong key={j} style={{ color: '#2D3748' }}>{p.replace(/\*\*/g, '')}</strong> : p)}
                </p>
            );
        });
    };

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px 60px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #4285F4, #34A853)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 28 }}>📖</div>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#1A202C', margin: 0 }}>Help Center</h1>
                <p style={{ fontSize: 15, color: '#718096', marginTop: 8 }}>Everything you need to know about Edibio</p>

                {/* Search */}
                <div style={{ position: 'relative', maxWidth: 500, margin: '20px auto 0' }}>
                    <Search size={18} color="#A0AEC0" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                        type="text"
                        placeholder="Search for anything — billing, inventory, dues, GST..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        style={{ width: '100%', padding: '14px 20px 14px 44px', borderRadius: 16, border: '2px solid #E2E8F0', fontSize: 14, outline: 'none', boxSizing: 'border-box', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'border 0.2s' }}
                        onFocus={e => e.target.style.border = '2px solid #4285F4'}
                        onBlur={e => e.target.style.border = '2px solid #E2E8F0'}
                    />
                    {query && (
                        <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: '#E2E8F0', border: 'none', borderRadius: 99, width: 22, height: 22, cursor: 'pointer', fontSize: 12, color: '#4A5568', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                    )}
                </div>
            </div>

            {/* Quick start card */}
            {!query && (
                <div style={{ background: 'linear-gradient(135deg, #4285F4 0%, #34A853 100%)', borderRadius: 20, padding: '24px 28px', marginBottom: 28, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <p style={{ fontWeight: 900, fontSize: 17, margin: 0 }}>🚀 New to Edibio?</p>
                        <p style={{ fontSize: 13, opacity: 0.88, margin: '4px 0 0' }}>Take the interactive guided tour — it covers the essentials in under 2 minutes.</p>
                    </div>
                    <button
                        onClick={() => window.dispatchEvent(new Event('start-edibio-tutorial'))}
                        style={{ padding: '10px 22px', borderRadius: 12, background: 'white', color: '#4285F4', fontWeight: 900, fontSize: 13, border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', whiteSpace: 'nowrap' }}
                    >
                        ▶ Start Interactive Tour
                    </button>
                </div>
            )}

            {/* Sections */}
            {filtered.map(section => (
                <div key={section.id} style={{ marginBottom: 16, background: 'white', borderRadius: 20, border: '1.5px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                    {/* Section header */}
                    <button
                        onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                        style={{ width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                    >
                        <div style={{ width: 48, height: 48, borderRadius: 14, background: section.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                            {section.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 900, fontSize: 15, color: '#1A202C' }}>{section.title}</div>
                            <div style={{ fontSize: 12, color: '#718096', marginTop: 2 }}>{section.subtitle} · {section.articles.length} articles</div>
                        </div>
                        {activeSection === section.id
                            ? <ChevronDown size={18} color="#4A5568" />
                            : <ChevronRight size={18} color="#A0AEC0" />}
                    </button>

                    {/* Articles */}
                    {(activeSection === section.id || query) && (
                        <div style={{ borderTop: '1px solid #F1F5F9' }}>
                            {section.articles.map(article => (
                                <div key={article.title} style={{ borderBottom: '1px solid #F8FAFC' }}>
                                    <button
                                        onClick={() => setOpenArticle(openArticle === article.title ? null : article.title)}
                                        style={{ width: '100%', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12, background: openArticle === article.title ? '#FAFBFF' : 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                    >
                                        <div style={{ width: 8, height: 8, borderRadius: 99, background: section.color, flexShrink: 0 }} />
                                        <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#2D3748' }}>{article.title}</span>
                                        {openArticle === article.title
                                            ? <ChevronDown size={15} color={section.color} />
                                            : <ChevronRight size={15} color="#CBD5E0" />}
                                    </button>
                                    {openArticle === article.title && (
                                        <div style={{ padding: '4px 24px 20px 44px', background: '#FAFBFF', borderTop: '1px solid #EEF2FF' }}>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {renderContent(article.content)}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#A0AEC0' }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                    <p style={{ fontWeight: 700, fontSize: 15 }}>No results for "{query}"</p>
                    <p style={{ fontSize: 13 }}>Try different keywords like "billing", "GST", "stock", "dues"</p>
                </div>
            )}

            {/* Footer */}
            {!query && (
                <div style={{ textAlign: 'center', marginTop: 32, padding: '20px', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                    <p style={{ fontWeight: 700, color: '#4A5568', fontSize: 14, margin: 0 }}>Still stuck? 🤝</p>
                    <p style={{ fontSize: 13, color: '#718096', margin: '6px 0 0' }}>Contact support via WhatsApp or email from the Settings → About page.</p>
                </div>
            )}
        </div>
    );
}

export default function HelpPage() {
    return (
        <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: '#718096', fontFamily: 'sans-serif' }}>Loading Help Center...</div>}>
            <HelpPageContent />
        </Suspense>
    );
}
