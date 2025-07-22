# PayPal Integration Guide (Developer Only)

## Overview
This guide is for implementing PayPal payments for the Eunoia pricing plans. This information should NOT be visible to users.

## Pricing Structure
- **Connect Plan**: $19.99/month
- **Synergy Plan**: $49.99/month  
- **Enterprise Plan**: Custom pricing (contact sales)
- **Basic Plan**: Free (limited to 5 min/day calls, 2 messages total)

## Implementation Steps

### 1. PayPal Developer Setup
1. Create account at `developer.paypal.com`
2. Create a new app in your PayPal developer dashboard
3. Get your Client ID and Client Secret
4. Note your Webhook URL for payment confirmations

### 2. Install PayPal SDK
```bash
npm install @paypal/react-paypal-js
```

### 3. Environment Variables
Add to your `.env` file:
```
PAYPAL_CLIENT_ID=your_client_id_here
PAYPAL_CLIENT_SECRET=your_client_secret_here
PAYPAL_MODE=sandbox  # Use 'live' for production
```

### 4. PayPal Component Implementation
```jsx
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckout = ({ planName, amount }) => {
  const initialOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount, // "19.99" or "49.99"
                },
                description: `Eunoia ${planName} Plan Subscription`,
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            // Handle successful payment
            console.log("Payment completed:", details);
            
            // Update user subscription in your database
            updateUserSubscription(details.payer.email_address, planName);
            
            // Redirect to success page
            window.location.href = "/payment-success";
          });
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          alert("Payment failed. Please try again.");
        }}
        onCancel={() => {
          console.log("Payment cancelled by user");
        }}
      />
    </PayPalScriptProvider>
  );
};
```

### 5. Integration Points

Replace the current pricing button onClick handlers with:

```jsx
// For Connect Plan ($19.99)
onClick={() => {
  // Redirect to PayPal checkout component or modal
  setShowPayPal(true);
  setSelectedPlan({ name: "Connect", amount: "19.99" });
}}

// For Synergy Plan ($49.99)  
onClick={() => {
  setShowPayPal(true);
  setSelectedPlan({ name: "Synergy", amount: "49.99" });
}}
```

### 6. Backend Webhook Handler
Set up a webhook endpoint to handle PayPal payment confirmations:

```javascript
// /api/paypal-webhook
app.post('/api/paypal-webhook', (req, res) => {
  const { event_type, resource } = req.body;
  
  if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
    // Update user subscription in database
    const payerEmail = resource.payer.email_address;
    const amount = resource.amount.value;
    
    // Determine plan based on amount
    const planName = amount === "19.99" ? "Connect" : "Synergy";
    
    // Update user record
    updateUserSubscription(payerEmail, planName);
  }
  
  res.status(200).send('OK');
});
```

### 7. Subscription Management
- Store subscription details in your database
- Handle subscription renewals
- Implement subscription cancellation
- Track payment history

### 8. Testing
- Use PayPal Sandbox for testing
- Test with sandbox buyer accounts
- Verify webhook functionality
- Test payment failures and cancellations

### 9. Production Deployment
- Switch to live PayPal credentials
- Update webhook URLs to production
- Enable live payment processing
- Monitor payment transactions

## Current Button Behavior
The pricing buttons now show user-friendly messages:
- **Basic**: Welcome message about free trial limits
- **Connect/Synergy**: Payment confirmation dialog
- **Enterprise**: Contact sales message

## Security Notes
- Never expose PayPal credentials on frontend
- Validate all payments on backend
- Use HTTPS for all payment pages
- Implement proper error handling
- Log all payment attempts for auditing

## Additional Features to Consider
- Proration for plan upgrades/downgrades
- Annual billing discounts
- Failed payment retry logic
- Subscription pause/resume functionality
- Refund processing
