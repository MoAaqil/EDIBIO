/**
 * Invoice Number Generator
 * Format: PREFIX-MM-TYPE-D-SEQNO
 * Example: AEV-02-MN-1-0000001
 * - AEV = first 3 letters of company name (user-configured)
 * - 02  = month (2 digits)
 * - MN  = invoice type code (MN=Manual, SL=Sale, PR=Purchase, ES=Estimate, etc.)
 * - 1   = day of month
 * - 0000001 = 7-digit sequential number
 */

export type InvoiceTypeCode = 'MN' | 'SL' | 'PR' | 'ES' | 'PF' | 'DC' | 'CN' | 'DN' | 'RT';

const TYPE_CODES: Record<string, InvoiceTypeCode> = {
    sale: 'SL',
    purchase: 'PR',
    estimate: 'ES',
    proforma: 'PF',
    delivery_challan: 'DC',
    credit_note: 'CN',
    debit_note: 'DN',
    sale_return: 'RT',
    purchase_return: 'RT',
    manual: 'MN',
};

export function generateInvoiceNumber(
    companyPrefix: string,      // e.g. "AEVON" → "AEV"
    invoiceType: string,         // e.g. "sale"
    sequenceNumber: number,      // 1-based running counter
    date?: Date
): string {
    const d = date || new Date();
    const prefix = companyPrefix.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3).padEnd(3, 'X');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate());
    const typeCode = TYPE_CODES[invoiceType] || 'MN';
    const seq = String(sequenceNumber).padStart(7, '0');
    return `${prefix}-${month}${typeCode}${day}-${seq}`;
}

// Parse a custom prefix setting
// e.g. user types "SHA" or "SHARMA" in settings, we take first 3
export function extractPrefix(companyName: string, customPrefix?: string): string {
    if (customPrefix && customPrefix.trim().length >= 2) {
        return customPrefix.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3).padEnd(3, 'X');
    }
    return companyName.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3).padEnd(3, 'X');
}

// Human readable label for type code
export const TYPE_CODE_LABELS: Record<InvoiceTypeCode, string> = {
    MN: 'Manual',
    SL: 'Sale',
    PR: 'Purchase',
    ES: 'Estimate',
    PF: 'Proforma',
    DC: 'Delivery Challan',
    CN: 'Credit Note',
    DN: 'Debit Note',
    RT: 'Return',
};
