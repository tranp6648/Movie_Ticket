import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButtonComponent = ({ amount, onSuccess, onError }) => {
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    // Make a request to get the user's account balance
    // Replace the following line with your actual API request
    const fetchUserBalance = async () => {
      try {
        // Make a request to get the user's balance from your backend
        const response = await fetch('/api/getUserBalance');
        const data = await response.json();
        setUserBalance(data.balance);
      } catch (error) {
        console.error('Error fetching user balance:', error);
      }
    };

    fetchUserBalance();
  }, []);

  useEffect(() => {
    // Check if the user's balance is less than or equal to the specified amount
    if (userBalance !== null && userBalance <= amount) {
      onError('Insufficient funds in your account.');
    }
  }, [userBalance, amount]);

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
