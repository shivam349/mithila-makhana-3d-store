# Email Notification & Order System

This document details the Web3Forms email integration for processing and dispatching customer orders.

---

## 1. Overview

Rather than managing heavy SMTP servers (Gmail, SendGrid, Resend), order dispatches utilize a serverless webhook through **Web3Forms**:
- **API Endpoint:** `https://api.web3forms.com/submit`
- **Merchant Notification Recipient:** `shivamgarg1515@gmail.com`
- **Trigger:** Dispatched strictly when the customer submits the final checkout form (`CheckoutForm.js`).

---

## 2. Order Form Payload Structure

When the customer submits their order, the client bundles the following fields into `FormData`:

```javascript
const formData = new FormData();
formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY);
formData.append("subject", `New Order #${orderId} - Mithila Makhana`);
formData.append("from_name", "Mithila Makhana Storefront");
formData.append("Order ID", orderId);
formData.append("Customer Name", customerName);
formData.append("Customer Email", customerEmail);
formData.append("Customer Phone", customerPhone);
formData.append("Delivery Address", deliveryAddress);
formData.append("Ordered Products", itemsList);
formData.append("Total Amount", `₹${totalAmount}`);
```

---

## 3. Guarantees & Anti-Spam Safety

1. **No Accidental Triggers:** Clicking "Add to Cart" or modifying drawer quantities never fires an email webhook.
2. **Duplicate Prevention:** The submission button disables immediately upon submission (`submitting` state) with a loading indicator (`Placing order...`).
3. **Graceful Fallback:** If the network request fails, user receives a clean retry message without losing cart contents.
