'use client';

import { useCart } from '@/lib/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
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

  // Generate unique Order ID
  const orderId = `MM-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

  // Formatted date and time
  const orderDateTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  // Products summary for email
  const orderedProductsSummary = cart
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} — Qty: ${item.quantity} × ₹${item.price} = ₹${item.price * item.quantity}`
    )
    .join('\n');

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

  const handleCheckout = async (e) => {
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

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        setCompletedOrderId(orderId);
        setOrderStatus('success');
        clearCart();
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

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    '415c9f2b-dffb-4cb5-9ed0-eb9b5e6da2a7';

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div className="mb-6">
          <Link
            href="/"
            className="text-earth-600 hover:text-makhana-700 text-sm font-semibold inline-flex items-center gap-2 transition-colors"
          >
            ← Back to Store
          </Link>
        </div>

        <div className="mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-makhana-700">
            Checkout
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-earth-900 mt-1">
            Your Shopping Bag
          </h1>
        </div>

        {orderStatus === 'success' ? (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-earth-100 p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-earth-900">
                Order Placed Successfully!
              </h2>
              <p className="text-emerald-700 font-semibold text-base">
                Order placed successfully. We have received your order.
              </p>
            </div>

            <div className="bg-makhana-50 border border-makhana-200 rounded-xl p-5 text-left space-y-3 text-sm text-earth-800">
              <div className="flex justify-between border-b border-makhana-200/60 pb-2">
                <span className="text-earth-600">Order ID:</span>
                <span className="font-mono font-bold text-earth-900">{completedOrderId}</span>
              </div>
              <div className="flex justify-between border-b border-makhana-200/60 pb-2">
                <span className="text-earth-600">Customer Name:</span>
                <span className="font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-makhana-200/60 pb-2">
                <span className="text-earth-600">Contact Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-base text-earth-900">
                <span>Total Amount:</span>
                <span className="text-makhana-700 font-bold">₹{totalAmount}</span>
              </div>
            </div>

            <p className="text-sm text-earth-600">
              An order notification has been dispatched to our fulfillment team. We will contact you to confirm packing and dispatch details.
            </p>

            <Link
              href="/"
              className="inline-block px-8 py-3.5 bg-makhana-600 hover:bg-makhana-700 text-white rounded-xl font-medium shadow-md transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items Column (7 cols) */}
            <div className="lg:col-span-7">
              {cart.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-makhana-50 rounded-full flex items-center justify-center mx-auto text-3xl">
                    🌿
                  </div>
                  <h3 className="text-xl font-serif font-bold text-earth-900">
                    Your bag is currently empty
                  </h3>
                  <p className="text-earth-600 text-sm max-w-sm mx-auto">
                    Select authentic roasted Mithila makhana from our catalog and get farm-fresh delivery across India.
                  </p>
                  <Link
                    href="/"
                    className="inline-block mt-2 px-6 py-2.5 bg-makhana-600 hover:bg-makhana-700 text-white text-sm font-medium rounded-xl shadow transition-all"
                  >
                    Browse Makhana
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-6 space-y-6">
                  <h2 className="text-lg font-serif font-bold text-earth-900 border-b border-earth-100 pb-3">
                    Items in Bag ({cart.reduce((t, i) => t + i.quantity, 0)})
                  </h2>

                  <div className="space-y-4 divide-y divide-earth-100">
                    {cart.map((item) => {
                      const itemId = item._id || item.id;
                      return (
                        <div key={itemId} className="pt-4 first:pt-0 flex gap-4 items-center">
                          <img
                            src={
                              item.image ||
                              item.imageFallback ||
                              '/images/products/classic-makhana.webp'
                            }
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl bg-makhana-50 border border-makhana-100 flex-shrink-0"
                            onError={(e) => {
                              e.target.src =
                                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect fill="%23FFF8F0" width="80" height="80"/%3E%3Ctext x="50%" y="50%" font-family="sans-serif" font-size="12" fill="%23C67C2E" text-anchor="middle" dominant-baseline="middle"%3EMakhana%3C/text%3E%3C/svg%3E';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base text-earth-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-earth-500 mt-0.5">
                              ₹{item.price} per pack
                            </p>

                            <div className="flex items-center gap-3 mt-3">
                              <div className="flex items-center border border-earth-200 rounded-lg bg-white">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(itemId, item.quantity - 1)}
                                  className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-sm font-bold"
                                  aria-label="Decrease quantity"
                                >
                                  −
                                </button>
                                <span className="w-8 text-center text-xs font-semibold text-earth-900">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(itemId, item.quantity + 1)}
                                  className="w-7 h-7 flex items-center justify-center text-earth-600 hover:bg-earth-100 transition-colors text-sm font-bold"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              <span className="text-sm font-bold text-earth-900 ml-auto">
                                ₹{item.price * item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() => removeFromCart(itemId)}
                                className="text-earth-400 hover:text-red-600 text-xs font-medium ml-2 p-1"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-earth-100 pt-4 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs text-earth-500 hover:text-red-600 transition-colors"
                    >
                      Clear Bag
                    </button>
                    <div className="text-right">
                      <span className="text-xs text-earth-500">Subtotal: </span>
                      <span className="text-lg font-bold text-earth-900">₹{subtotal}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fast Order Form Column (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-sm border border-earth-100 p-6 sm:p-7 space-y-5 sticky top-28">
                <div>
                  <h2 className="text-xl font-serif font-bold text-earth-900">
                    Delivery & Checkout
                  </h2>
                  <p className="text-xs text-earth-600 mt-1">
                    Enter your delivery address to place your order directly.
                  </p>
                </div>

                {cart.length > 0 ? (
                  <form onSubmit={handleCheckout} className="space-y-4">
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
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: 'none' }}
                    />

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
                        className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
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
                          className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
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
                          className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
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
                        className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400 resize-none"
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
                          placeholder="e.g. Darbhanga"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
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
                          className="w-full px-3.5 py-2.5 text-sm bg-earth-50/50 border border-earth-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-makhana-500 transition-all placeholder:text-earth-400"
                        />
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div className="bg-makhana-50/70 border border-makhana-200/80 rounded-xl p-4 space-y-2 text-sm">
                      <div className="flex justify-between text-earth-600">
                        <span>Items Subtotal:</span>
                        <span className="font-medium text-earth-900">₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-earth-600">
                        <span>All-India Shipping:</span>
                        <span className="text-emerald-700 font-semibold">FREE</span>
                      </div>
                      <div className="flex justify-between text-earth-900 font-bold text-lg pt-2 border-t border-makhana-200/60">
                        <span>Total Payable:</span>
                        <span className="text-makhana-700">₹{totalAmount}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || cart.length === 0}
                      className="w-full py-4 px-6 bg-gradient-to-r from-makhana-600 to-makhana-700 hover:from-makhana-700 hover:to-makhana-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.99] text-base flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
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
                        <span>Place Order · ₹{totalAmount}</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <p className="text-sm text-earth-500 text-center py-4">
                    Add products to your shopping bag to proceed with checkout.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
