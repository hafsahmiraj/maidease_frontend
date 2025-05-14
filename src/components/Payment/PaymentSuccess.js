import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = params.get('session_id');
      if (!sessionId) return;
      try {
        const res = await fetch('http://localhost:5000/api/maids/hire/stripe/confirm-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (res.ok) {
          // If backend returns maid_hire_id, redirect to preview, else bookings
          if (data.maid_hire_id) {
            navigate(`/hire-preview/${data.maid_hire_id}`);
          } else {
            navigate('/bookings');
          }
        } else {
          alert(data.message || 'Payment not confirmed');
        }
      } catch {
        alert('Payment confirmation failed');
      }
    };
    confirmPayment();
    // eslint-disable-next-line
  }, [params, navigate]);

  return <div>Processing payment, please wait...</div>;
}