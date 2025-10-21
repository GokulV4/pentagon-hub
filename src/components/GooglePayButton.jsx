import React, { useState, useEffect } from 'react';
import { CreditCard, Loader, CheckCircle, AlertCircle } from 'lucide-react';

const GooglePayButton = ({ 
  amount, 
  description, 
  memberId, 
  memberName, 
  memberEmail, 
  onPaymentSuccess, 
  onPaymentError,
  disabled = false 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // 'success', 'error', null

  const handleGooglePayClick = async () => {
    if (disabled || isProcessing) return;

    setIsProcessing(true);
    setPaymentStatus(null);

    try {
      // Simulate Google Pay initialization
      const paymentRequest = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }],
        transactionInfo: {
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: amount.toString(),
          currencyCode: 'USD',
          countryCode: 'US'
        },
        merchantInfo: {
          merchantId: '12345678901234567890',
          merchantName: 'Pentagon Roller Skating Hub'
        }
      };

      // Simulate Google Pay button click
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate payment processing
      const paymentResult = await processGooglePayPayment({
        amount,
        description,
        memberId,
        memberName,
        memberEmail
      });

      if (paymentResult.success) {
        setPaymentStatus('success');
        onPaymentSuccess?.(paymentResult.payment);
      } else {
        setPaymentStatus('error');
        onPaymentError?.(paymentResult.error);
      }
    } catch (error) {
      setPaymentStatus('error');
      onPaymentError?.(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const processGooglePayPayment = async (paymentData) => {
    // Simulate API call to your backend
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate 90% success rate
    if (Math.random() > 0.1) {
      return {
        success: true,
        payment: {
          id: Date.now(),
          transactionId: `GP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount: paymentData.amount,
          status: 'completed',
          method: 'Google Pay',
          date: new Date().toISOString()
        }
      };
    } else {
      return {
        success: false,
        error: 'Payment was declined. Please check your payment method.'
      };
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div style={{ width: '100%' }}>
      <button
        onClick={handleGooglePayClick}
        disabled={disabled || isProcessing}
        style={{
          width: '100%',
          background: paymentStatus === 'success' 
            ? '#10b981' 
            : paymentStatus === 'error'
            ? '#ef4444'
            : 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: disabled || isProcessing ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          boxShadow: paymentStatus === 'success' 
            ? '0 4px 12px rgba(16, 185, 129, 0.3)'
            : paymentStatus === 'error'
            ? '0 4px 12px rgba(239, 68, 68, 0.3)'
            : '0 4px 12px rgba(66, 133, 244, 0.3)',
          opacity: disabled ? 0.6 : 1
        }}
        onMouseOver={(e) => {
          if (!disabled && !isProcessing && !paymentStatus) {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 16px rgba(66, 133, 244, 0.4)';
          }
        }}
        onMouseOut={(e) => {
          if (!disabled && !isProcessing && !paymentStatus) {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(66, 133, 244, 0.3)';
          }
        }}
      >
        {isProcessing ? (
          <>
            <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
            Processing Payment...
          </>
        ) : paymentStatus === 'success' ? (
          <>
            <CheckCircle size={20} />
            Payment Successful!
          </>
        ) : paymentStatus === 'error' ? (
          <>
            <AlertCircle size={20} />
            Payment Failed
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Pay {formatAmount(amount)} with Google Pay
          </>
        )}
      </button>

      {paymentStatus === 'success' && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '8px',
          color: '#166534',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          ✅ Payment completed successfully! Your membership is now active.
        </div>
      )}

      {paymentStatus === 'error' && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          ❌ Payment failed. Please try again or contact support.
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GooglePayButton;

