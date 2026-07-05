import type { Invoice } from './types';

export function generateGSTR1(invoices: Invoice[]) {
    const saleInvoices = invoices.filter(i => i.invoiceType === 'sale' && i.isGstBill);

    // B2B: Registered parties (have GSTIN)
    const b2b = saleInvoices.filter(i => i.partyGst).map(i => ({
        ctin: i.partyGst,
        inv: [{
            inum: i.invoiceNumber,
            dt: i.date.split('-').reverse().join('-'), // DD-MM-YYYY
            val: i.grandTotal,
            pos: i.isInterState ? "99" : "33", // Simplified for India (33=TN, 99=Inter)
            rchrg: "N",
            inv_typ: "R",
            itms: i.items.map(it => ({
                num: 1,
                itm_det: {
                    ty: it.hsnCode || "S",
                    hsn_sc: it.hsnCode || "0000",
                    txval: it.taxableAmt,
                    rt: it.gstRate,
                    iamt: it.igst || 0,
                    camt: it.cgst || 0,
                    samt: it.sgst || 0,
                    csamt: it.cess || 0
                }
            }))
        }]
    }));

    // B2CS: Unregistered parties (Consumer Small)
    const b2cs = saleInvoices.filter(i => !i.partyGst).map(i => ({
        sply_ty: i.isInterState ? "INTER" : "INTRA",
        rt: i.items[0]?.gstRate || 0, // Simplified: group by rate in real GSTR-1
        typ: "OE",
        pos: i.isInterState ? "99" : "33",
        txval: i.taxableAmount,
        iamt: i.totalIgst || 0,
        camt: i.totalCgst || 0,
        samt: i.totalSgst || 0,
        csamt: i.totalCess || 0
    }));

    return {
        gstin: "YOUR_GSTIN", // Should be company.gstNumber
        fp: new Date().toISOString().slice(5, 7) + new Date().getFullYear(),
        gt: 0.0,
        cur_gt: 0.0,
        b2b,
        b2cs
    };
}

export function downloadGSTR1(invoices: Invoice[], companyName: string, gstin: string) {
    const data = generateGSTR1(invoices);
    data.gstin = gstin || "GSTIN_REQUIRED";
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GSTR1_${companyName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 7)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}
