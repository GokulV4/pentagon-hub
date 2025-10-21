import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePayment } from '../contexts/PaymentContext';
import GooglePayButton from '../components/GooglePayButton';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Receipt,
  History
} from 'lucide-react';

const Payment = () => {
  const { user } = useAuth();
  const { processPayment, getMemberPayments, isLoading } = usePayment();
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const monthlyFee = 25.00; // Monthly membership fee
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  useEffect(() => {
    if (user) {
      const history = getMemberPayments(user.id);
      setPaymentHistory(history);
      
      // Check if user has paid for current month
      const currentMonthPayment = history.find(payment => {
        const paymentDate = new Date(payment.date);
        const now = new Date();
        return paymentDate.getMonth() === now.getMonth() && 
               paymentDate.getFullYear() === now.getFullYear();
      });
      
      setPaymentStatus(currentMonthPayment ? 'paid' : 'pending');
    }
  }, [user, getMemberPayments]);

  const handlePaymentSuccess = (payment) => {
    setPaymentStatus('paid');
    setPaymentHistory(prev => [payment, ...prev]);
    
    // Show success message
    setTimeout(() => {
      alert('Payment successful! Your membership is now active for this month.');
    }, 1000);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Error is already handled by the GooglePayButton component
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={20} style={{ color: '#10b981' }} />;
      case 'pending':
        return <Clock size={20} style={{ color: '#f59e0b' }} />;
      default:
        return <AlertTriangle size={20} style={{ color: '#ef4444' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return { bg: '#dcfce7', text: '#166534', border: '#bbf7d0' };
      case 'pending':
        return { bg: '#fef3c7', text: '#92400e', border: '#fde68a' };
      default:
        return { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' };
    }
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <AlertTriangle size={48} style={{ color: '#f59e0b', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
            Access Denied
          </h2>
          <p style={{ color: '#6b7280' }}>
            Please log in to access the payment page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      fontFamily: 'Inter, sans-serif', 
      backgroundImage: 'url(/bgmgif.gif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <CreditCard size={28} />
            </div>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '4px'
              }}>
                Monthly Payment
              </h1>
              <p style={{ color: '#6b7280', fontSize: '1rem' }}>
                Manage your Pentagon membership payments
              </p>
            </div>
          </div>

          {/* Payment Status */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            border: `2px solid ${getStatusColor(paymentStatus).border}`,
            background: getStatusColor(paymentStatus).bg,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            {getStatusIcon(paymentStatus)}
            <div>
              <div style={{
                fontWeight: '600',
                color: getStatusColor(paymentStatus).text,
                fontSize: '1.1rem'
              }}>
                {paymentStatus === 'paid' 
                  ? `Payment Complete for ${currentMonth}`
                  : `Payment Pending for ${currentMonth}`
                }
              </div>
              <div style={{
                color: getStatusColor(paymentStatus).text,
                opacity: 0.8,
                fontSize: '0.9rem'
              }}>
                {paymentStatus === 'paid' 
                  ? 'Your membership is active and up to date.'
                  : 'Please complete your payment to maintain active membership.'
                }
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              Payment Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>
                  Member Name
                </div>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>
                  {user.name}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>
                  Email
                </div>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>
                  {user.email}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>
                  Billing Period
                </div>
                <div style={{ fontWeight: '600', color: '#1f2937' }}>
                  {currentMonth}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '4px' }}>
                  Amount Due
                </div>
                <div style={{ 
                  fontWeight: '700', 
                  color: '#1f2937',
                  fontSize: '1.25rem'
                }}>
                  {formatCurrency(monthlyFee)}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          {paymentStatus !== 'paid' && (
            <div style={{ marginBottom: '24px' }}>
              <GooglePayButton
                amount={monthlyFee}
                description={`Monthly membership fee for ${currentMonth}`}
                memberId={user.id}
                memberName={user.name}
                memberEmail={user.email}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                disabled={isLoading}
              />
            </div>
          )}

          {/* Payment History Toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              background: 'rgba(102, 126, 234, 0.1)',
              color: '#667eea',
              padding: '12px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
            }}
          >
            <History size={16} />
            {showHistory ? 'Hide' : 'Show'} Payment History
          </button>
        </div>

        {/* Payment History */}
        {showHistory && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Receipt size={20} />
              Payment History
            </h3>

            {paymentHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#6b7280'
              }}>
                <Receipt size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No payment history found</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paymentHistory.map((payment) => (
                  <div key={payment.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                          {payment.description || `Monthly Fee - ${new Date(payment.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                          {formatDate(payment.date)}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: '#1f2937' }}>
                        {formatCurrency(payment.amount)}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: payment.status === 'completed' ? '#10b981' : '#f59e0b',
                        fontWeight: '600'
                      }}>
                        {payment.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
