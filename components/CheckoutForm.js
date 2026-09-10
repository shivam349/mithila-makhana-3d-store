'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';

export default function CheckoutForm({ onSuccess, onCancel }) {
  const { cart, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrderId, setCompletedOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const totalAmount = getTotalPrice();
  const subtotal = totalAmount;

  // Generate a unique order ID
  const orderId = `MM-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  // Human-readable formatted order date/time
  const orderDateTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // Formatted products summary for email
  const orderedProductsSummary = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} — Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
    )
    .join('\n');

  // Formatted comprehensive email message body
  const fullOrderMessage = `
========================================
NEW MITHILA MAKHANA ORDER NOTIFICATION
========================================

Order ID: ${orderId}
Order Date & Time: ${orderDateTime}

----------------------------------------
CUSTOMER DETAILS
----------------------------------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}${formData.city ? `, ${formData.city}` : ''}${formData.pincode ? ` - ${formData.pincode}` : ''}

----------------------------------------
ORDERED ITEMS
----------------------------------------
${orderedProductsSummary}

----------------------------------------
PAYMENT & TOTAL
----------------------------------------
Subtotal: ₹${subtotal}
Shipping: FREE
Total Amount: ₹${totalAmount}
Payment Mode: Cash on Delivery / Direct Bank Confirmation

========================================
Mithila Makhana Storefront Order Dispatch
========================================
  `.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before checking out.');
      setOrderStatus('error');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setErrorMessage('Please fill in all required fields.');
      setOrderStatus('error');
      return;
    }

    // Phone validation (10 digits)
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      setOrderStatus('error');
      return;
    }

    setLoading(true);
    setOrderStatus(null);
    setErrorMessage('');

    try {
      const formPayload = new FormData(e.target);

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setCompletedOrderId(orderId);
        setOrderStatus('success');
        clearCart();
        if (onSuccess) onSuccess(orderId);
      } else {
        setOrderStatus('error');
        setErrorMessage(data.message || 'Unable to place the order. Please try again.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setOrderStatus('error');
      setErrorMessage('Unable to place the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderStatus === 'success') {
    return (
      <div className="py-8 px-4 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-serif font-bold text-earth-900">
            Order Placed Successfully!
          </h3>
          <p className="text-emerald-700 font-medium text-sm">
            Order placed successfully. We have received your order.
          </p>
        </div>
        <div className="bg-makhana-50 border border-makhana-200 rounded-xl p-4 text-left space-y-2 text-sm text-earth-800">
          <div className="flex justify-between border-b border-makhana-200/60 pb-2">
            <span className="text-earth-600">Order ID:</span>
            <span className="font-mono font-bold text-earth-900">{completedOrderId}</span>
          </div>
          <div className="flex justify-between border-b border-makhana-200/60 pb-2">
            <span className="text-earth-600">Customer:</span>
            <span className="font-semibold">{formData.name}</span>
          </div>
          <div className="flex justify-between border-b border-makhana-200/60 pb-2">
            <span className="text-earth-600">Phone:</span>
            <span>{formData.phone}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-base text-earth-900">
            <span>Total Payable:</span>
            <span className="text-makhana-700">₹{totalAmount}</span>
          </div>
        </div>
        <p className="text-xs text-earth-500 leading-relaxed">
          Our team will contact you shortly to confirm your delivery details. Thank you for supporting authentic Mithila harvest!
        </p>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 bg-makhana-600 hover:bg-makhana-700 text-white rounded-xl font-medium transition-all shadow-md"
          >
            Continue Shopping
          </button>
        )}
      </div>
    );
  }

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    '415c9f2b-dffb-4cb5-9ed0-eb9b5e6da2a7';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden Web3Forms API Fields */}
      <input type="hidden" name="access_key" value={accessKey} />
      <input
        type="hidden"
        name="subject"
        value={`New Mithila Makhana Order #${orderId} (₹${totalAmount})`}
      />
      <input type="hidden" name="from_name" value="Mithila Makhana Store" />
      <input type="hidden" name="recipient" value="shivamgarg1515@gmail.com" />
      <input type="hidden" name="to_email" value="shivamgarg1515@gmail.com" />
      <input type="hidden" name="order_id" value={orderId} />
      <input type="hidden" name="order_date_time" value={orderDateTime} />
      <input type="hidden" name="ordered_products" value={orderedProductsSummary} />
      <input type="hidden" name="subtotal" value={`₹${subtotal}`} />
      <input type="hidden" name="total_amount" value={`₹${totalAmount}`} />
      <input type="hidden" name="message" value={fullOrderMessage} />
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

      {orderStatus === 'error' && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
          <span>⚠️</span>
          <span>{errorMessage || 'Unable to place the order. Please try again.'}</span>
        </div>
      )}

      {/* Customer Name */}
      <div>
        <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g. Ramesh Kumar"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
        />
      </div>

      {/* Contact Grid: Phone & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="10-digit mobile"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
          />
        </div>
      </div>

      {/* Delivery Address */}
      <div>
        <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
          Delivery Address <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          rows={3}
          required
          placeholder="House/Flat No., Street, Area, Landmark"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400 resize-none"
        />
      </div>

      {/* City & Pincode */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Darbhanga / Delhi"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-earth-700 uppercase tracking-wider mb-1">
            PIN Code
          </label>
          <input
            type="text"
            name="pincode"
            placeholder="e.g. 846004"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
          />
        </div>
      </div>

      {/* Order Summary Pill */}
      <div className="bg-makhana-50/70 border border-makhana-200/80 rounded-xl p-3.5 text-sm space-y-1.5">
        <div className="flex justify-between text-earth-600 text-xs">
          <span>Items ({cart.reduce((t, i) => t + i.quantity, 0)} items):</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-earth-600 text-xs">
          <span>Shipping:</span>
          <span className="text-emerald-700 font-semibold">FREE (All India)</span>
        </div>
        <div className="flex justify-between text-earth-900 font-bold text-base pt-1 border-t border-makhana-200/60">
          <span>Total:</span>
          <span className="text-makhana-700">₹{totalAmount}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="pt-2 flex flex-col gap-2">
        <button
          type="submit"
          disabled={loading || cart.length === 0}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-makhana-600 to-makhana-700 hover:from-makhana-700 hover:to-makhana-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99] text-sm flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Placing order...</span>
            </>
          ) : (
            <>
              <span>Place Order (₹{totalAmount})</span>
              <span>→</span>
            </>
          )}
        </button>

        {onCancel && (
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="w-full py-2.5 text-xs font-semibold text-earth-600 hover:text-earth-900 transition-colors"
          >
            ← Back to Cart
          </button>
        )}
      </div>

      <p className="text-[11px] text-center text-earth-500 pt-1">
        🔒 100% Secure Checkout · Farm Fresh Guarantee · Cash on Delivery available
      </p>
    </form>
  );
}
