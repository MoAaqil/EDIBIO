/**
 * Razorpay server-side helper
 * ────────────────────────────
 * Import this file ONLY inside Next.js API routes / Route Handlers.
 * Never import it in client-side code — it uses Node.js built-ins.
 */

import Razorpay from 'razorpay';
import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayOrderOptions {
  amount: number;          // amount in smallest currency unit (paise for INR)
  currency: string;        // e.g. "INR"
  receipt: string;         // unique receipt id (max 40 chars)
  partial_payment?: boolean;
  notes?: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Singleton instance
// ---------------------------------------------------------------------------

let _razorpayInstance: Razorpay | null = null;

/**
 * Returns a cached Razorpay SDK instance.
 * Reads credentials from environment variables at first call.
 */
function getRazorpayInstance(): Razorpay {
  if (_razorpayInstance) return _razorpayInstance;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error(
      '[Razorpay] Missing environment variables: RAZORPAY_KEY_ID and/or RAZORPAY_KEY_SECRET.'
    );
  }

  _razorpayInstance = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return _razorpayInstance;
}

// ---------------------------------------------------------------------------
// createOrder
// ---------------------------------------------------------------------------

/**
 * Creates a new Razorpay order.
 *
 * @param amount   - Amount in **paise** (smallest INR unit). e.g. ₹499 → 49900
 * @param currency - ISO 4217 currency code. Defaults to "INR".
 * @param receipt  - Unique receipt identifier (max 40 chars).
 * @returns        The Razorpay Order object.
 */
export async function createOrder(
  amount: number,
  currency: string = 'INR',
  receipt: string
): Promise<RazorpayOrder> {
  if (amount <= 0) {
    throw new Error('[Razorpay] Order amount must be a positive integer (in paise).');
  }
  if (!receipt || receipt.length > 40) {
    throw new Error('[Razorpay] Receipt must be a non-empty string with at most 40 characters.');
  }

  const razorpay = getRazorpayInstance();

  const options: RazorpayOrderOptions = {
    amount: Math.round(amount), // ensure integer paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options as Parameters<typeof razorpay.orders.create>[0]);
    return order as unknown as RazorpayOrder;
  } catch (err) {
    console.error('[Razorpay] Failed to create order:', err);
    throw err;
  }
}

// ---------------------------------------------------------------------------
// verifyPayment
// ---------------------------------------------------------------------------

/**
 * Verifies a Razorpay payment signature using HMAC-SHA256.
 *
 * The expected signature is: HMAC_SHA256(orderId + "|" + paymentId, keySecret)
 *
 * @param orderId   - Razorpay order ID returned at order creation (e.g. "order_xxxx")
 * @param paymentId - Razorpay payment ID from the checkout callback (e.g. "pay_xxxx")
 * @param signature - Signature string returned by Razorpay in the checkout callback
 * @returns `true` if the signature is valid, `false` otherwise
 */
export function verifyPayment(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error('[Razorpay] Missing environment variable: RAZORPAY_KEY_SECRET.');
  }

  try {
    const body = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body)
      .digest('hex');

    // Use timingSafeEqual to prevent timing-based attacks
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const receivedBuffer = Buffer.from(signature, 'hex');

    if (expectedBuffer.length !== receivedBuffer.length) return false;

    return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (err) {
    console.error('[Razorpay] Signature verification failed:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Export singleton accessor for advanced use-cases
// ---------------------------------------------------------------------------
export { getRazorpayInstance };
