import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButtonComponent = ({ amount, onSuccess, onError }) => {


  const [formData, setFormData] = useState({
    Email: 'ads',
    // ... other form fields ...
  });
   const handleChange = (event) => {
    // Update the Email field in FormData
    setFormData({ ...formData, Email: event.target.value });
  };


  return (
    <PayPalScriptProvider options={{ 'client-id': 'AW0TVjvf0CnmXAgcA8R_4WvR188yiYKzv1vHy7DnyyqTMnPa9051afLMhGxzR026mAd6jqo9hFyJAJFE' }}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: 'USD', // Replace with your desired currency code
                },
              },
            ],
            payer: {
              email_address: FormData.Email, // Include the Email prop in the order data
            },
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            onSuccess(details);
          });
        }}
        onError={(error) => {
          onError(error);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButtonComponent;
